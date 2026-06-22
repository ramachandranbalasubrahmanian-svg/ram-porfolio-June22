/**
 * Redirect legacy frozen deployment hostnames to current production.
 * (Old *.vercel.app deployment URLs cannot be updated in place on Vercel.)
 */
const LEGACY_HOSTS = new Set([
  'ram-portfolio-hfbnu0chx.vercel.app',
]);

const CURRENT_ORIGIN = 'https://ram-portfolio-amber.vercel.app';

export default function middleware(request) {
  const host = request.headers.get('host') || '';
  if (!LEGACY_HOSTS.has(host)) {
    return;
  }

  const incoming = new URL(request.url);
  const target = new URL(incoming.pathname + incoming.search, CURRENT_ORIGIN);
  return Response.redirect(target.toString(), 308);
}

export const config = {
  matcher: '/:path*',
};
