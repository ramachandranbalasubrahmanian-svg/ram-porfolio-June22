/* Theme v3 motion layer: scroll reveal, number count-up, cursor-tracked card light,
   scroll progress, nav state, preview palette switcher. Everything is additive and
   degrades to the static page if JS is unavailable or reduced-motion is set. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* palette (preview toolbar persists choice) */
  var bar = document.getElementById("v3-toolbar");
  if (bar) { try { var q = new URLSearchParams(location.search).get("palette"); var saved = q || localStorage.getItem("v3-palette"); if (saved) root.setAttribute("data-palette", saved); } catch (e) {} }
  if (bar) {
    var sync = function () {
      var cur = root.getAttribute("data-palette") || "midnight";
      bar.querySelectorAll("button[data-palette]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.palette === cur)); });
    };
    bar.querySelectorAll("button[data-palette]").forEach(function (b) {
      b.addEventListener("click", function () {
        root.setAttribute("data-palette", b.dataset.palette);
        try { localStorage.setItem("v3-palette", b.dataset.palette); } catch (e) {}
        sync();
      });
    });
    sync();
  }

  /* scroll progress + nav */
  var progress = document.getElementById("scroll-progress");
  if (progress) progress.removeAttribute("hidden");
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - innerHeight;
      root.style.setProperty("--v3-progress", max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
      root.toggleAttribute("data-scrolled", scrollY > 24);
      ticking = false;
    });
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* cursor-tracked light on cards */
  var cards = document.querySelectorAll(".bento-card,.exec-pillar,.pillar-card,.asset-card,.cs-kpi,.sabbatical-card,.faq-item,.contact-panel,.tl-card,.deep-dive-card,.ai-proof-block,.ai-proof-flagship,.hero-card,.sri-card,.prac-banner,.cred-grid-card");
  cards.forEach(function (c) { c.classList.add("v3-spot"); });
  if (!reduced && matchMedia("(hover: hover)").matches) {
    document.addEventListener("pointermove", function (e) {
      var c = e.target.closest && e.target.closest(".v3-spot");
      if (!c) return;
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", (e.clientX - r.left) + "px");
      c.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  if (reduced || !("IntersectionObserver" in window)) return;

  /* scroll reveal: section headings + cards, staggered within their parent */
  var targets = document.querySelectorAll(".section .sl,.section .h-section,.section > .wrap > p,.v3-spot,.model-step,.spot-badge,.insight-card,.tl-entry,.sabbatical-metric,.metric");
  var groups = new Map();
  targets.forEach(function (el) {
    if (el.closest("#hero")) return;
    el.classList.add("v3-rv");
    var p = el.parentElement; var i = groups.get(p) || 0; groups.set(p, i + 1);
    el.style.setProperty("--v3-i", i % 8); el.setAttribute("data-v3-i", i);
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  document.querySelectorAll(".v3-rv").forEach(function (el) { io.observe(el); });

  /* count-up for metric figures: keeps prefix/suffix ("$2M+", "232M+", "<4h", "2,400+", "95%") */
  var nums = document.querySelectorAll(".hero-kpi strong,.metric-num,.cs-kpi strong,.bento-metric strong,.sabbatical-metric strong,.spot-badge .num");
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return; cio.unobserve(en.target);
      var el = en.target, text = el.textContent.trim();
      var m = text.match(/^([^\d]*)(\d[\d,]*)(\.\d+)?(.*)$/); if (!m) return;
      var target = parseFloat(m[2].replace(/,/g, "") + (m[3] || "")); if (!isFinite(target) || target === 0) return;
      var decimals = m[3] ? m[3].length - 1 : 0, useComma = m[2].indexOf(",") >= 0;
      var t0 = performance.now(), dur = 1100 + Math.min(700, target);
      function fmt(v) { var s = v.toFixed(decimals); return useComma ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : s; }
      function step(now) {
        var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        el.textContent = m[1] + fmt(target * e) + m[4];
        if (p < 1) requestAnimationFrame(step); else el.textContent = text;
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  nums.forEach(function (el) { cio.observe(el); });
})();
