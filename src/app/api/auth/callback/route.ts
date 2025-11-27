import { createServerClient } from "@supabase/ssr";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/en/studio";

  // Create a mutable array to hold cookies that need to be set
  const cookiesToSet: { name: string; value: string; options: any }[] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            cookiesToSet.push(cookie);
          });
        },
      },
    }
  );

  const redirectTo = (url: string) => {
    const response = NextResponse.redirect(url);
    cookiesToSet.forEach(({ name, value, options }) =>
      response.cookies.set(name, value, options)
    );
    return response;
  };

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocal = process.env.NODE_ENV === "development";
      if (isLocal) {
        return redirectTo(`${request.nextUrl.origin}${next}`);
      } else if (forwardedHost) {
        return redirectTo(`https://${forwardedHost}${next}`);
      } else {
        return redirectTo(`${request.nextUrl.origin}${next}`);
      }
    } else {
      console.error("Supabase VerifyOtp Error:", error);
    }
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocal = process.env.NODE_ENV === "development";
      if (isLocal) {
        return redirectTo(`${request.nextUrl.origin}${next}`);
      } else if (forwardedHost) {
        return redirectTo(`https://${forwardedHost}${next}`);
      } else {
        return redirectTo(`${request.nextUrl.origin}${next}`);
      }
    } else {
      console.error("Supabase ExchangeCode Error:", error);
    }
  }

  // Return the user to an error page with some instructions
  return NextResponse.redirect(`${request.nextUrl.origin}/en/auth/auth-code-error`);
}
