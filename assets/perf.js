/**
 * Portfolio load metrics � dev/diagnostic only.
 * Panel + console: localhost OR explicit ?perf=1
 * Production & preview: hidden unless you add ?perf=1
 */
(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var isLocal =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '0.0.0.0';
  var metricsEnabled =
    params.get('perf') === '1' ||
    params.get('perf') === 'true' ||
    (isLocal && params.get('perf') !== '0');

  if (!metricsEnabled) return;

  function fmtMs(ms) {
    if (ms == null || isNaN(ms)) return '�';
    return ms < 1000 ? Math.round(ms) + ' ms' : (ms / 1000).toFixed(2) + ' s';
  }

  function fmtKb(bytes) {
    if (!bytes) return '0 KB';
    return bytes < 1024 * 1024
      ? (bytes / 1024).toFixed(1) + ' KB'
      : (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  function grade(ms, good, mid) {
    if (ms == null || isNaN(ms)) return '�';
    if (ms <= good) return 'Good';
    if (ms <= mid) return 'OK';
    return 'Slow';
  }

  function buildReport() {
    var nav = performance.getEntriesByType('navigation')[0];
    var paints = performance.getEntriesByType('paint');
    var fcp = paints.find(function (p) { return p.name === 'first-contentful-paint'; });
    var resources = performance.getEntriesByType('resource');

    var byType = { document: 0, stylesheet: 0, script: 0, font: 0, image: 0, other: 0 };
    var transfer = 0;
    var items = [];

    resources.forEach(function (r) {
      var size = r.transferSize || r.encodedBodySize || 0;
      transfer += size;
      var type = 'other';
      if (r.initiatorType === 'css' || (r.name && r.name.indexOf('.css') > -1)) type = 'stylesheet';
      else if (r.initiatorType === 'script' || (r.name && r.name.indexOf('.js') > -1)) type = 'script';
      else if (r.initiatorType === 'img' || /\.(webp|png|jpg|jpeg|gif|svg)(\?|$)/i.test(r.name)) type = 'image';
      else if (/\.(woff2?|ttf|otf)(\?|$)/i.test(r.name)) type = 'font';
      byType[type] = (byType[type] || 0) + size;

      var path = r.name.replace(window.location.origin, '');
      if (path.length > 72) path = '�' + path.slice(-69);
      items.push({ file: path, type: type, size: size, ms: r.duration });
    });

    items.sort(function (a, b) { return b.size - a.size; });

    var htmlSize = nav ? nav.transferSize || 0 : 0;

    return {
      url: window.location.href,
      timing: {
        ttfb: nav ? nav.responseStart - nav.requestStart : null,
        domInteractive: nav ? nav.domInteractive - nav.startTime : null,
        domContentLoaded: nav ? nav.domContentLoadedEventEnd - nav.startTime : null,
        loadComplete: nav ? nav.loadEventEnd - nav.startTime : null,
        fcp: fcp ? fcp.startTime : null
      },
      sizes: {
        html: htmlSize,
        resources: transfer,
        total: htmlSize + transfer,
        byType: byType
      },
      topResources: items.slice(0, 12),
      grades: {
        ttfb: grade(nav ? nav.responseStart - nav.requestStart : null, 200, 600),
        fcp: grade(fcp ? fcp.startTime : null, 1800, 3000),
        load: grade(nav ? nav.loadEventEnd - nav.startTime : null, 2500, 4000)
      }
    };
  }

  function renderPanel(report) {
    var el = document.createElement('aside');
    el.id = 'perf-panel';
    el.setAttribute('aria-label', 'Page load metrics');
    el.innerHTML =
      '<button type="button" id="perf-panel-close" aria-label="Close metrics">�</button>' +
      '<p class="perf-panel-kicker">Dev only � Load metrics</p>' +
      '<p class="perf-panel-title">Portfolio performance</p>' +
      '<dl class="perf-panel-grid">' +
      '<div><dt>TTFB</dt><dd>' + fmtMs(report.timing.ttfb) + ' <em>' + report.grades.ttfb + '</em></dd></div>' +
      '<div><dt>First paint</dt><dd>' + fmtMs(report.timing.fcp) + ' <em>' + report.grades.fcp + '</em></dd></div>' +
      '<div><dt>DOM ready</dt><dd>' + fmtMs(report.timing.domContentLoaded) + '</dd></div>' +
      '<div><dt>Full load</dt><dd>' + fmtMs(report.timing.loadComplete) + ' <em>' + report.grades.load + '</em></dd></div>' +
      '<div><dt>Total transfer</dt><dd>' + fmtKb(report.sizes.total) + '</dd></div>' +
      '<div><dt>HTML</dt><dd>' + fmtKb(report.sizes.html) + '</dd></div>' +
      '<div><dt>CSS</dt><dd>' + fmtKb(report.sizes.byType.stylesheet) + '</dd></div>' +
      '<div><dt>Fonts</dt><dd>' + fmtKb(report.sizes.byType.font) + '</dd></div>' +
      '<div><dt>JS</dt><dd>' + fmtKb(report.sizes.byType.script) + '</dd></div>' +
      '<div><dt>Images</dt><dd>' + fmtKb(report.sizes.byType.image) + '</dd></div>' +
      '</dl>' +
      '<p class="perf-panel-note">Not shown on production. Use <code>?perf=1</code> to debug � <code>?perf=0</code> on localhost to hide.</p>';
    document.body.appendChild(el);
    document.getElementById('perf-panel-close').addEventListener('click', function () {
      el.remove();
    });
  }

  function logReport(report) {
    console.group('[ram-bala.com] Load metrics (dev)');
    console.log('URL:', report.url);
    console.table({
      'TTFB': fmtMs(report.timing.ttfb) + ' � ' + report.grades.ttfb,
      'First Contentful Paint': fmtMs(report.timing.fcp) + ' � ' + report.grades.fcp,
      'DOM Content Loaded': fmtMs(report.timing.domContentLoaded),
      'Window load': fmtMs(report.timing.loadComplete) + ' � ' + report.grades.load
    });
    console.log('Transfer size:', fmtKb(report.sizes.total));
    console.table(report.sizes.byType);
    console.groupEnd();
  }

  function run() {
    var report = buildReport();
    logReport(report);
    renderPanel(report);
  }

  if (document.readyState === 'complete') {
    setTimeout(run, 0);
  } else {
    window.addEventListener('load', function () { setTimeout(run, 100); });
  }
})();
