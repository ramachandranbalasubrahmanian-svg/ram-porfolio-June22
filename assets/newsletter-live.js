/**
 * Fetches live newsletter subscriber count and updates marked elements.
 * Source: /api/newsletter-subscribers (Vercel) with fallback to /data/newsletter-stats.json
 */
(function () {
  "use strict";

  var FALLBACK = { subscribers: 1700, formatted: "1,700+" };

  function formatCount(n) {
    return n.toLocaleString("en-US") + "+";
  }

  function render(el, formatted) {
    var mode = el.getAttribute("data-newsletter-format") || "short";

    switch (mode) {
      case "chip":
        el.textContent = "Newsletter \u00b7 " + formatted + " subscribers";
        break;
      case "card-label":
        el.textContent = "Newsletter \u00b7 " + formatted;
        break;
      case "subscribers":
        el.textContent = formatted + " subscribers";
        break;
      case "paren":
        el.textContent = "(" + formatted + ")";
        break;
      case "footer":
        el.textContent = "Newsletter (" + formatted + ")";
        break;
      case "prose":
        el.textContent = formatted + " subscribers";
        break;
      default:
        el.textContent = formatted;
    }
  }

  function showLiveBadges() {
    document.querySelectorAll("[data-newsletter-live]").forEach(function (badge) {
      badge.hidden = false;
      badge.setAttribute("aria-hidden", "false");
    });
  }

  function applyStats(stats) {
    var formatted = stats.formatted || formatCount(stats.subscribers);
    document.querySelectorAll("[data-newsletter-count]").forEach(function (el) {
      render(el, formatted);
    });
    document.documentElement.setAttribute("data-newsletter-loaded", "true");
    document.documentElement.setAttribute(
      "data-newsletter-source",
      stats.source || "config"
    );
  }

  function fetchStats() {
    // Static display: show a fixed "1,700+" and never reveal a live badge.
    // (Live LinkedIn fetch intentionally disabled — owner-set figure.)
    applyStats(FALLBACK);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchStats);
  } else {
    fetchStats();
  }
})();
