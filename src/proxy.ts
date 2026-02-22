import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "./utils/supabase/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sanity Studio must be served from the root /studio route without any
  // locale redirect. Skip intl + auth entirely for /studio paths.
  if (pathname.startsWith('/studio')) {
    return NextResponse.next();
  }
  const localeStudioMatch = pathname.match(/^\/[a-z]{2}(\/studio.*)/);
  if (localeStudioMatch) {
    return NextResponse.redirect(new URL(localeStudioMatch[1], request.url));
  }

  // 1. Run next-intl middleware to handle locale redirection/rewrites
  const response = intlMiddleware(request);

  // 2. Run Supabase middleware to refresh session
  let finalResponse = response;
  let user = null;
  try {
    const result = await updateSession(request, response);
    finalResponse = result.response;
    user = result.user;
    const aal = (result as any).aal;

    // Handle Forge Route Protection
    const isForgeRoute = pathname.includes('/forge');
    const isLoginPage = pathname.endsWith('/forge/login');

    if (isForgeRoute && !isLoginPage) {
      if (!user) {
        const loginUrl = request.nextUrl.clone();
        if (pathname.startsWith('/en/') || pathname.startsWith('/es/')) {
          const locale = pathname.split('/')[1];
          loginUrl.pathname = `/${locale}/forge/login`;
        } else {
          loginUrl.pathname = '/forge/login';
        }
        return NextResponse.redirect(loginUrl);
      }

      // MFA check
      if (aal?.nextLevel === 'aal2' && aal?.currentLevel !== 'aal2') {
        const loginUrl = request.nextUrl.clone();
        if (pathname.startsWith('/en/') || pathname.startsWith('/es/')) {
          const locale = pathname.split('/')[1];
          loginUrl.pathname = `/${locale}/forge/login`;
        } else {
          loginUrl.pathname = '/forge/login';
        }
        return NextResponse.redirect(loginUrl);
      }
    }

    // Redirect authenticated users away from login page
    if (isLoginPage && user && !(aal?.nextLevel === 'aal2' && aal?.currentLevel !== 'aal2')) {
      const adminUrl = request.nextUrl.clone();
      if (pathname.startsWith('/en/') || pathname.startsWith('/es/')) {
        const locale = pathname.split('/')[1];
        adminUrl.pathname = `/${locale}/forge/projects`;
      } else {
        adminUrl.pathname = '/forge/projects';
      }
      return NextResponse.redirect(adminUrl);
    }
  } catch (error) {
    console.error("Proxy error:", error);
  }

  // 4. Add Security Headers
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Content Security Policy
  const cspDirectives = [
    "default-src 'self'",
    isDevelopment
      ? "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live"
      : "script-src 'self' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://images.unsplash.com https://placehold.co https://*.supabase.co https://cdn.sanity.io",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://www.googleapis.com https://safebrowsing.googleapis.com https://http-observatory.security.mozilla.org https://vercel.live https://*.sentry.io https://o172531.ingest.us.sentry.io https://*.sanity.io https://api.sanity.io https://cdn.sanity.io",
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
    finalResponse.headers.set(key, value);
  });

  return finalResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|monitoring|.*\\..*).*)"],
};
