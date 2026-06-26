/**
 * Portfolio motion — executive-fast profile.
 * Instant content, minimal scroll work, no parallax or counter animations.
 */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var execFast = document.body.classList.contains('exec-fast');
  var scrollScheduled = false;
  var scrollHandlers = [];
  var lastScrollY = -1;

  function onScrollFrame() {
    scrollScheduled = false;
    var y = window.scrollY;
    if (y === lastScrollY) return;
    lastScrollY = y;
    scrollHandlers.forEach(function (fn) { fn(y); });
  }

  function onScroll(fn) {
    scrollHandlers.push(fn);
    if (scrollHandlers.length === 1) {
      window.addEventListener('scroll', function () {
        if (!scrollScheduled) {
          scrollScheduled = true;
          requestAnimationFrame(onScrollFrame);
        }
      }, { passive: true });
    }
  }

  function revealAll() {
    document.querySelectorAll('.rv, .rv-stagger').forEach(function (el) {
      el.classList.add('vis');
    });
  }

  function initReveals() {
    if (reduced || execFast) {
      revealAll();
      return;
    }

    revealAll();
    document.querySelectorAll('#hero .rv, #hero .rv-stagger').forEach(function (el) {
      el.classList.add('vis');
    });
  }

  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    nav.classList.add('solid');

    var execBar = document.getElementById('exec-bar');
    var sectionJump = document.getElementById('section-jump');
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    var jumpLinks = document.querySelectorAll('.jump-link[href^="#"]');
    var allLinks = Array.prototype.slice.call(navLinks).concat(Array.prototype.slice.call(jumpLinks));
    var sections = [];
    var tops = [];
    var seen = {};

    allLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      if (!id || seen[id]) return;
      var sec = document.getElementById(id);
      if (sec) {
        seen[id] = true;
        sections.push({ id: id, el: sec });
      }
    });

    function measure() {
      tops = sections.map(function (s) {
        return { id: s.id, top: s.el.offsetTop };
      });
    }

    measure();
    window.addEventListener('resize', measure, { passive: true });

    var jumpVisible = false;
    var barVisible = false;
    var activeId = '';

    onScroll(function (y) {
      if (sectionJump) {
        var showJump = y > window.innerHeight * 0.35;
        if (showJump !== jumpVisible) {
          jumpVisible = showJump;
          sectionJump.classList.toggle('visible', showJump);
        }
      }

      if (execBar) {
        var showBar = y > window.innerHeight * 0.55;
        if (showBar !== barVisible) {
          barVisible = showBar;
          execBar.classList.toggle('visible', showBar);
          execBar.setAttribute('aria-hidden', showBar ? 'false' : 'true');
          execBar.toggleAttribute('inert', !showBar);
          document.body.classList.toggle('exec-bar-on', showBar);
        }
      }

      var current = '';
      for (var i = tops.length - 1; i >= 0; i--) {
        if (y >= tops[i].top - 140) {
          current = tops[i].id;
          break;
        }
      }
      if (current !== activeId) {
        activeId = current;
        allLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
      }
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var offset = document.getElementById('section-jump') ? 108 : 72;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'auto' });
        if (window.closeMobileMenu) window.closeMobileMenu();
      });
    });
  }

  function initMobileMenu() {
    var ham = document.getElementById('ham');
    var mob = document.getElementById('mob-menu');
    if (!ham || !mob) return;

    ham.addEventListener('click', function () {
      var open = mob.classList.toggle('open');
      ham.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    window.closeMobileMenu = function () {
      mob.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
    };
  }

  function initRegionToggle() {
    var copy = document.getElementById('region-copy');
    var buttons = document.querySelectorAll('.region-btn');
    if (!copy || !buttons.length) return;

    var messages = {
      gcc: 'Director-level data governance & DataOps for global-bank GCC captives, DIFC/ADGM banks and UAE/KSA fintechs — and senior leadership within the function at regional banks. PDPL and NDMO build on the GDPR and DMBOK foundation I have run in production. Bengaluru-based, relocating, immediate joiner.',
      europe: 'GDPR run in regulated production on real EU customer data — the actual EU regulation, not a proxy — plus an EU-AI-Act-ready control plane and three live governed-AI demos. Targeting English-first global-bank EU hubs, scaled fintechs and consultancies (Netherlands, Ireland, Germany) at Lead / Principal / Senior Manager, Director as in-region progression. Visa-ready: EU Blue Card / NL Highly Skilled Migrant / Ireland Critical Skills / Germany Opportunity Card.',
      apac: 'Open to Director and Head-of-function data governance leadership across APAC — India, Singapore, Australia, and remote-first enterprises — governance, data quality, DataOps, and AI controls.',
      global: 'Director / Head — Data Governance, Data Quality & DataOps, with hands-on AI governance. Regulated BFSI. Immediately available, globally mobile.'
    };

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var region = btn.dataset.region;
        if (!region || !messages[region]) return;
        buttons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        copy.textContent = messages[region];
      });
    });
  }

  function initLazyVideo() {
    var videos = document.querySelectorAll('.proof-video[data-src]');
    if (!videos.length) return;

    function attachVideo(video) {
      if (video.dataset.loaded) return;
      video.dataset.loaded = '1';
      video.src = video.dataset.src;
      video.removeAttribute('data-src');
      video.addEventListener('click', function () {
        if (video.paused) video.play(); else video.pause();
      });
    }

    if (!('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          attachVideo(e.target);
          io.unobserve(e.target);
        });
      },
      { rootMargin: '80px' }
    );

    videos.forEach(function (v) { io.observe(v); });
  }

  function initDeferred() {
    initRegionToggle();
    initLazyVideo();
    if ('requestIdleCallback' in window) {
      requestIdleCallback(function () {
        var link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = 'assets/Ram-Bala-Executive-Summary.pdf?v=3';
        document.head.appendChild(link);
      }, { timeout: 5000 });
    }
  }

  function init() {
    initReveals();
    initNav();
    initSmoothScroll();
    initMobileMenu();

    if ('requestIdleCallback' in window) {
      requestIdleCallback(initDeferred, { timeout: 2000 });
    } else {
      setTimeout(initDeferred, 1);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
