import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Sanity Studio must be served from the root /studio route without any
  // locale redirect. Skip intl entirely for /studio paths.
  if (pathname.startsWith('/studio')) {
    return NextResponse.next();
  }
  const localeStudioMatch = pathname.match(/^\/[a-z]{2}(\/studio.*)/);
  if (localeStudioMatch) {
    return NextResponse.redirect(new URL(localeStudioMatch[1], request.url));
  }

  // 1. Run next-intl middleware to handle locale redirection/rewrites
  const response = intlMiddleware(request);

  // 2. Add Security Headers
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Content Security Policy
  const cspDirectives = [
    "default-src 'self'",
    isDevelopment
      ? "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://cdn.noctra.studio https://owlight-widget.vercel.app https://www.googletagmanager.com https://plausible.io"
      : "script-src 'self' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com https://cdn.noctra.studio https://owlight-widget.vercel.app https://www.googletagmanager.com https://plausible.io",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://images.unsplash.com https://placehold.co https://*.supabase.co https://cdn.sanity.io",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://www.googleapis.com https://safebrowsing.googleapis.com https://http-observatory.security.mozilla.org https://vercel.live https://*.sentry.io https://o172531.ingest.us.sentry.io https://*.sanity.io https://api.sanity.io https://cdn.sanity.io https://cdn.noctra.studio https://owlight.io https://www.owlight.io https://plausible.io",
    "worker-src 'self' blob:",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
    "block-all-mixed-content",
  ];

  const csp = cspDirectives.join('; ');

  const securityHeaders = {
    'Content-Security-Policy': csp,
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|monitoring|.*\\..*).*)"],
};
