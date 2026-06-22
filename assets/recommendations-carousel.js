/**
 * Full-text LinkedIn recommendations carousel (panel only).
 * Data: /data/recommendations.json
 */
(function () {
  'use strict';

  var root = document.getElementById('rec-carousel');
  if (!root) return;

  var AUTO_MS = 8000;
  var index = 0;
  var list = [];
  var timer = null;
  var paused = false;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PHOTO_VERSION = '2';

  function initials(name) {
    return name
      .split(' ')
      .map(function (part) { return part[0] || ''; })
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  function avatarSources(rec) {
    return ['/assets/recommendations/' + rec.id + '.jpg?v=' + PHOTO_VERSION];
  }

  function createAvatar(rec, className, eager) {
    var wrap = document.createElement('span');
    wrap.className = 'rec-carousel-avatar ' + (className || '');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.textContent = initials(rec.name);

    var sources = avatarSources(rec);
    var sourceIndex = 0;

    function showInitials() {
      wrap.textContent = initials(rec.name);
      wrap.setAttribute('aria-hidden', 'true');
    }

    function tryNext() {
      if (sourceIndex >= sources.length) {
        showInitials();
        return;
      }
      var img = document.createElement('img');
      img.alt = rec.name + ', recommender';
      img.decoding = 'async';
      img.loading = eager ? 'eager' : 'lazy';
      img.onload = function () {
        wrap.textContent = '';
        wrap.removeAttribute('aria-hidden');
        wrap.appendChild(img);
      };
      img.onerror = function () {
        sourceIndex += 1;
        tryNext();
      };
      img.src = sources[sourceIndex];
      sourceIndex += 1;
    }

    tryNext();
    return wrap;
  }

  function esc(text) {
    var el = document.createElement('span');
    el.textContent = text;
    return el.innerHTML;
  }

  function personFooter(rec) {
    return (
      '<div class="rec-carousel-person">' +
        '<span class="rec-carousel-avatar rec-carousel-avatar-lg" data-id="' + esc(rec.id) + '" data-name="' + esc(rec.name) + '">' + esc(initials(rec.name)) + '</span>' +
        '<div class="rec-carousel-person-details">' +
          '<p class="rec-carousel-person-name">' + esc(rec.name) + '</p>' +
          '<p class="rec-carousel-person-role">' + esc(rec.role) + '</p>' +
          '<p class="rec-carousel-person-rel">' + esc(rec.relationship) + (rec.workContext ? ' · ' + esc(rec.workContext) : '') + '</p>' +
        '</div>' +
      '</div>'
    );
  }

  function go(next) {
    if (!list.length) return;
    index = (next + list.length) % list.length;
    render();
    resetTimer();
  }

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = null;
    if (reduced || paused || list.length < 2) return;
    timer = setInterval(function () {
      go(index + 1);
    }, AUTO_MS);
  }

  function render() {
    var rec = list[index];
    if (!rec) return;

    root.innerHTML =
      '<article class="rec-carousel-panel" id="rec-carousel-panel" aria-label="Recommendation ' + (index + 1) + ' of ' + list.length + '">' +
        '<div class="rec-carousel-toolbar">' +
          '<p class="rec-carousel-counter">Full recommendation · ' + (index + 1) + ' of ' + list.length + '</p>' +
          '<div class="rec-carousel-nav">' +
            '<button type="button" class="rec-carousel-nav-btn" data-dir="-1" aria-label="Previous recommendation">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>' +
            '</button>' +
            '<button type="button" class="rec-carousel-nav-btn" data-dir="1" aria-label="Next recommendation">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<div class="rec-carousel-body">' +
          '<p class="rec-carousel-mark" aria-hidden="true">"</p>' +
          '<blockquote class="rec-carousel-quote">' + esc(rec.text) + '</blockquote>' +
        '</div>' +
        '<footer class="rec-carousel-footer">' +
          personFooter(rec) +
          '<a class="rec-carousel-link" href="' + esc(rec.linkedinUrl) + '" target="_blank" rel="noopener noreferrer">' +
            'LinkedIn profile' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' +
          '</a>' +
        '</footer>' +
      '</article>';

    root.querySelectorAll('.rec-carousel-nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        go(index + parseInt(btn.getAttribute('data-dir'), 10));
      });
    });

    var mainAvatar = root.querySelector('.rec-carousel-avatar-lg');
    if (mainAvatar && mainAvatar.parentNode) {
      var mainNode = createAvatar(rec, 'rec-carousel-avatar-lg', true);
      mainAvatar.parentNode.replaceChild(mainNode, mainAvatar);
    }
  }

  root.addEventListener('mouseenter', function () {
    paused = true;
    if (timer) clearInterval(timer);
  });

  root.addEventListener('mouseleave', function () {
    paused = false;
    resetTimer();
  });

  fetch('/data/recommendations.json', { cache: 'no-store' })
    .then(function (res) {
      if (!res.ok) throw new Error('Failed to load recommendations');
      return res.json();
    })
    .then(function (data) {
      list = data;
      var kenIndex = list.findIndex(function (r) { return r.id === 'ken-bouley'; });
      index = kenIndex >= 0 ? kenIndex : 0;
      render();
      resetTimer();
    })
    .catch(function () {
      root.innerHTML = '<p class="rec-carousel-fallback">Could not load recommendations. Run <code>npm run serve:local</code> or open via <code>http://127.0.0.1:8888</code> — not <code>file://</code>.</p>';
    });
})();
