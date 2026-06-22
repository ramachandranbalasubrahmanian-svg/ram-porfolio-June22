(function () {
  "use strict";

  var config = window.RAM_ANALYTICS_CONFIG || {};
  var ga4Id = config.ga4Id || "";
  var clarityId = config.clarityId || "";
  var prodDomains = config.prodDomains || [];
  var site = config.site || "portfolio";

  function isProd() {
    if (!prodDomains.length) return true;
    return prodDomains.indexOf(window.location.hostname) !== -1;
  }

  function noopGtag() {}

  if (!isProd()) {
    console.log("[Analytics] Dev/preview — tracking disabled (" + site + ")");
    window.gtag = noopGtag;
    window.trackEvent = function () {};
    return;
  }

  if (!ga4Id) {
    console.warn("[Analytics] Set ga4Id in assets/analytics-config.js");
    window.gtag = noopGtag;
    window.trackEvent = function () {};
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  var gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga4Id);
  document.head.appendChild(gaScript);

  gtag("js", new Date());
  gtag("config", ga4Id, {
    send_page_view: true,
    anonymize_ip: true,
    cookie_flags: "SameSite=None;Secure",
  });

  if (clarityId) {
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityId);
  }

  window.trackEvent = function (name, params) {
    if (!name) return;
    gtag("event", name, Object.assign({ site: site }, params || {}));
  };

  document.addEventListener(
    "click",
    function (e) {
      var el = e.target.closest("[data-analytics-event]");
      if (!el) return;
      window.trackEvent(el.getAttribute("data-analytics-event"), {
        event_label: el.getAttribute("data-analytics-label") || el.textContent.trim().slice(0, 80),
        link_url: el.getAttribute("href") || undefined,
      });
    },
    true
  );

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href*="calendly.com"]').forEach(function (el) {
      if (!el.getAttribute("data-analytics-event")) {
        el.setAttribute("data-analytics-event", "book_call_click");
      }
    });
    document.querySelectorAll('a[download], a[href*="resume.pdf"]').forEach(function (el) {
      if (!el.getAttribute("data-analytics-event")) {
        el.setAttribute("data-analytics-event", "resume_download");
      }
    });
    document.querySelectorAll('a[href*="medigovern-insight.lovable.app"]').forEach(function (el) {
      if (!el.getAttribute("data-analytics-event")) {
        el.setAttribute("data-analytics-event", "demo_click");
        el.setAttribute("data-analytics-label", "MediGovern RAG");
      }
    });
    document.querySelectorAll('a[href*="pipeline-pulse-79.lovable.app"]').forEach(function (el) {
      if (!el.getAttribute("data-analytics-event")) {
        el.setAttribute("data-analytics-event", "demo_click");
        el.setAttribute("data-analytics-label", "Pipeline Pulse");
      }
    });
    document.querySelectorAll('a[href*="linkedin.com/newsletters"]').forEach(function (el) {
      if (!el.getAttribute("data-analytics-event")) {
        el.setAttribute("data-analytics-event", "newsletter_click");
      }
    });
    document.querySelectorAll("[data-email-direct]").forEach(function (el) {
      if (!el.getAttribute("data-analytics-event")) {
        el.setAttribute("data-analytics-event", "email_click");
      }
    });
  });

  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function () {
      window.trackEvent("contact_form_submit");
    });
  }

  console.log("[Analytics] GA4" + (clarityId ? " + Clarity" : "") + " loaded (" + site + ")");
})();
