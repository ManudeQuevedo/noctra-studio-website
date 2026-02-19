import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "./utils/supabase/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sanity Studio must be served from the root /studio route without any
  // locale redirect. Skip intl + auth entirely for /studio paths.
  // Locale-prefixed variants (e.g. /es/studio) redirect to /studio.
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
  // We wrap this in a try-catch to ensure it never blocks the site if Supabase is down/misconfigured
  let user = null;
  try {
    const { response: finalResponse, user: supabaseUser } = await updateSession(request, response);
    // Update the response to be the one from Supabase (which includes set-cookie)
    // But we must be careful not to lose the intl headers. 
    // updateSession usually returns a new response with cookies.
    // For safety in this "Safe Mode", we will prioritize the intl response if supabase fails, 
    // but if it succeeds, we use the finalResponse.
    if (finalResponse) {
       // We need to return this response, but we also need to do the admin check.
       // So we store the user and the response.
       user = supabaseUser;
       // 4. Add Security Headers
       const isDevelopment = process.env.NODE_ENV === 'development';

       // Content Security Policy
       // This protects against XSS, clickjacking, and other code injection attacks
       const cspDirectives = [
         // Default: Only allow resources from same origin
         "default-src 'self'",

         // Scripts: Allow self, inline scripts (needed for Next.js), and trusted CDNs
         isDevelopment
           ? "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live" // Dev mode needs eval
           : "script-src 'self' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com",

         // Styles: Allow self and inline styles (needed for Tailwind, Framer Motion)
         "style-src 'self' 'unsafe-inline'",

         // Images: Allow self, data URIs, and external image sources
         "img-src 'self' data: blob: https://images.unsplash.com https://placehold.co https://*.supabase.co https://cdn.sanity.io",

         // Fonts: Allow self and data URIs
         "font-src 'self' data:",

         // Connect: API endpoints and external services
         "connect-src 'self' https://*.supabase.co https://www.googleapis.com https://safebrowsing.googleapis.com https://http-observatory.security.mozilla.org https://vercel.live https://*.sentry.io https://o172531.ingest.us.sentry.io https://*.sanity.io https://api.sanity.io https://cdn.sanity.io",

         // Frame: Only allow same origin (prevents clickjacking)
         "frame-src 'self'",

         // Objects: Block all object/embed/applet tags
         "object-src 'none'",

         // Base URI: Restrict base tag to same origin
         "base-uri 'self'",

         // Form actions: Only allow forms to submit to same origin
         "form-action 'self'",

         // Frame ancestors: Only allow embedding on same origin (backup to X-Frame-Options)
         "frame-ancestors 'self'",

         // Upgrade insecure requests (HTTP -> HTTPS)
         "upgrade-insecure-requests",

         // Block all mixed content
         "block-all-mixed-content",
       ];

       const csp = cspDirectives.join('; ');

       const securityHeaders = {
         // Content Security Policy - Primary XSS defense
         'Content-Security-Policy': csp,

         // Permissions Policy - Control browser features
         'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',

         // DNS Prefetch Control - Allow DNS prefetching for performance
         'X-DNS-Prefetch-Control': 'on',

         // HSTS - Force HTTPS for 2 years
         'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',

         // X-Frame-Options - Prevent clickjacking (legacy, CSP is primary)
         'X-Frame-Options': 'SAMEORIGIN',

         // X-Content-Type-Options - Prevent MIME sniffing
         'X-Content-Type-Options': 'nosniff',

         // X-XSS-Protection - Legacy XSS protection for older browsers
         'X-XSS-Protection': '1; mode=block',

         // Referrer Policy - Control referrer information
         'Referrer-Policy': 'strict-origin-when-cross-origin',
       };

       Object.entries(securityHeaders).forEach(([key, value]) => {
         finalResponse.headers.set(key, value);
       });

       return finalResponse;
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // Fallback to just the intl response if Supabase fails
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next`, `/_vercel`, or `/monitoring`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|monitoring|.*\\..*).*)"],
};
