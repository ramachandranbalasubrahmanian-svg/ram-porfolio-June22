/**
 * www.ram-bala.com on Cloudflare Workers (static assets, free plan).
 * The only logic: send the bare apex to the canonical www host (301, path and
 * query kept). Everything else is answered straight from the `dist/` assets
 * (with `_headers` applied and `404.html` for unknown paths).
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "ram-bala.com") {
      url.hostname = "www.ram-bala.com";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
