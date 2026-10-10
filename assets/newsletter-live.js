/**
 * Renders the newsletter subscriber count into marked elements.
 * Static owner-set figure (see FALLBACK / data/newsletter-stats.json); the
 * former live-fetch API was retired with the move to Cloudflare Pages.
 */
(function () {
  "use strict";

  var FALLBACK = { subscribers: 3000, formatted: "3,000+" };

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
    // Static display: show a fixed "3,000+" and never reveal a live badge.
    // (Live LinkedIn fetch intentionally disabled — owner-set figure.)
    applyStats(FALLBACK);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchStats);
  } else {
    fetchStats();
  }
})();
