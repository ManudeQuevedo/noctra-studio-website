import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "./utils/supabase/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
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
       
       // 3. Admin Access Control (Strict Check)
       if (request.nextUrl.pathname.startsWith('/studio')) {
         const ADMIN_EMAILS = ['hello@noctra.studio', 'contact@manudequevedo.com'];
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
