import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "./utils/supabase/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // 1. Run next-intl middleware to handle locale redirection/rewrites
  const response = intlMiddleware(request);

  // 2. Run Supabase middleware to refresh session, passing the intl response
  // This ensures cookies are set on the correct response object
  const { response: finalResponse, user } = await updateSession(request, response);

  // 3. Admin Access Control
  const ADMIN_EMAILS = ['hello@noctra.studio', 'contact@manudequevedo.com'];
  if (request.nextUrl.pathname.startsWith('/studio')) {
    if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // 4. Add Security Headers
  const securityHeaders = {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    finalResponse.headers.set(key, value);
  });

  return finalResponse;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next`, `/_vercel`, or `/monitoring`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|monitoring|.*\\..*).*)"],
};
