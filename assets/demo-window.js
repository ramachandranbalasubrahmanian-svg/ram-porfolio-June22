/**
 * In-page app window — opens a live demo URL inside an iframe modal.
 *
 * Usage: any element with
 *   data-app-window="https://app-url"        (required: iframe src)
 *   data-app-title="Golden Record RAG"        (optional: header label)
 *   data-app-host="golden-records-demo..."     (optional: shown as URL line)
 * On click, the app opens in an overlay. Provides an "Open in new tab"
 * fallback in case a route blocks framing (X-Frame-Options / CSP).
 */
(function () {
  "use strict";

  var overlay, frame, loadingEl, titleEl, hostEl, newTabEl;
  var lastFocused = null;
  var loadTimer = null;

  function build() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "appwin-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Live demo window");
    overlay.innerHTML =
      '<div class="appwin">' +
        '<div class="appwin-bar">' +
          '<div class="appwin-dots" aria-hidden="true"><i></i><i></i><i></i></div>' +
          '<div class="appwin-title">' +
            '<strong data-win-title>Live demo</strong>' +
            '<span data-win-host></span>' +
          '</div>' +
          '<div class="appwin-actions">' +
            '<a class="appwin-btn appwin-btn-primary" data-win-newtab target="_blank" rel="noopener">' +
              '↗ <span class="appwin-btn-label">Open in new tab</span></a>' +
            '<button type="button" class="appwin-btn appwin-close" data-win-close aria-label="Close demo window">✕</button>' +
          '</div>' +
        '</div>' +
        '<div class="appwin-body">' +
          '<div class="appwin-loading" data-win-loading>' +
            '<div class="appwin-spinner" aria-hidden="true"></div>' +
            '<p>Loading the live app…</p>' +
            '<p class="appwin-hint">If it stays blank, the app may block embedding — ' +
              '<a data-win-hintlink target="_blank" rel="noopener">open it in a new tab ↗</a>.</p>' +
          '</div>' +
          '<iframe class="appwin-frame" data-win-frame title="Live demo application" ' +
            'allow="clipboard-write; fullscreen" referrerpolicy="strict-origin-when-cross-origin"></iframe>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    frame = overlay.querySelector("[data-win-frame]");
    loadingEl = overlay.querySelector("[data-win-loading]");
    titleEl = overlay.querySelector("[data-win-title]");
    hostEl = overlay.querySelector("[data-win-host]");
    newTabEl = overlay.querySelector("[data-win-newtab]");

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    overlay.querySelector("[data-win-close]").addEventListener("click", close);
    frame.addEventListener("load", function () {
      if (frame.src) { clearTimeout(loadTimer); loadingEl.hidden = true; }
    });
    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "Tab") trapFocus(e);
    });
  }

  function trapFocus(e) {
    var f = overlay.querySelectorAll("a[href], button:not([disabled]), iframe");
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function open(url, title, host) {
    build();
    lastFocused = document.activeElement;
    titleEl.textContent = title || "Live demo";
    hostEl.textContent = host || url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    newTabEl.href = url;
    overlay.querySelector("[data-win-hintlink]").href = url;
    loadingEl.hidden = false;
    frame.src = url;
    document.body.classList.add("appwin-locked");
    overlay.classList.add("open");
    // best-effort: if it never fires load within 9s, keep the fallback hint visible
    clearTimeout(loadTimer);
    loadTimer = setTimeout(function () { loadingEl.hidden = false; }, 9000);
    requestAnimationFrame(function () { overlay.querySelector("[data-win-close]").focus(); });
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.classList.remove("appwin-locked");
    clearTimeout(loadTimer);
    // release the iframe so the app stops running in the background
    setTimeout(function () { if (!overlay.classList.contains("open")) frame.src = "about:blank"; }, 260);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-app-window]");
    if (!trigger) return;
    e.preventDefault();
    open(
      trigger.getAttribute("data-app-window"),
      trigger.getAttribute("data-app-title"),
      trigger.getAttribute("data-app-host")
    );
  });

  window.AppWindow = { open: open, close: close };
})();
