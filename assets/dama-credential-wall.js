/**
 * CDMP Credential Wall — score rings and badge mini-bars animate on scroll.
 */
(function () {
  'use strict';

  function animateMiniBars(root) {
    root.querySelectorAll('.badge-mini-fill[data-w]').forEach(function (bar) {
      setTimeout(function () {
        bar.style.width = bar.getAttribute('data-w') + '%';
      }, 200);
    });
  }

  function animateRings(root) {
    root.querySelectorAll('.score-fill[data-pct]').forEach(function (circle) {
      var pct = parseFloat(circle.getAttribute('data-pct'), 10);
      var circ = 226;
      setTimeout(function () {
        circle.style.strokeDashoffset = String(circ - (circ * pct / 100));
      }, 300);
    });
  }

  var root = document.getElementById('dama');
  if (!root) return;

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateMiniBars(entry.target);
        animateRings(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    io.observe(root);
    return;
  }

  animateMiniBars(root);
  animateRings(root);
})();
