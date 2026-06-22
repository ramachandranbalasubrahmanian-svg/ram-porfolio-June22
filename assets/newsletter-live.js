/**
 * Fetches live newsletter subscriber count and updates marked elements.
 * Source: /api/newsletter-subscribers (Vercel) with fallback to /data/newsletter-stats.json
 */
(function () {
  "use strict";

  var FALLBACK = { subscribers: 1731, formatted: "1,731+" };

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
    showLiveBadges();
    document.documentElement.setAttribute("data-newsletter-loaded", "true");
    document.documentElement.setAttribute(
      "data-newsletter-source",
      stats.source || "config"
    );
  }

  function fetchStats() {
    var endpoints = ["/api/newsletter-subscribers", "/data/newsletter-stats.json"];

    function tryNext(i) {
      if (i >= endpoints.length) {
        applyStats(FALLBACK);
        return;
      }

      fetch(endpoints[i] + (i === 0 ? "?t=" + Date.now() : ""), {
        credentials: "same-origin",
        cache: "no-store",
      })
        .then(function (res) {
          if (!res.ok) throw new Error("fetch failed");
          return res.json();
        })
        .then(function (data) {
          if (!data || typeof data.subscribers !== "number") throw new Error("invalid");
          applyStats({
            subscribers: data.subscribers,
            formatted: data.formatted || formatCount(data.subscribers),
            source: data.source || (i === 0 ? "api" : "config"),
          });
        })
        .catch(function () {
          tryNext(i + 1);
        });
    }

    tryNext(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchStats);
  } else {
    fetchStats();
  }
})();
