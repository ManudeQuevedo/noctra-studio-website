import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Inicializar middleware de next-intl
const intlMiddleware = createIntlMiddleware(routing);

export async function updateSupabaseSession(request: NextRequest, response: NextResponse) {
  return await updateSession(request, response);
}

export async function updateSession(request: NextRequest, response: NextResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user, supabase };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas que solo necesitan auth de Supabase (sin intl)
  const isAuthRoute =
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login");

  if (isAuthRoute) {
    const response = NextResponse.next({ request: { headers: request.headers } });
    await updateSupabaseSession(request, response);
    return response;
  }

  // Para el resto: primero intl (detecta idioma del navegador)
  const intlResponse = intlMiddleware(request);

  // Luego Supabase (refresca sesión si es necesario)
  const { response } = await updateSupabaseSession(request, intlResponse);

  return response;
}

export const config = {
  matcher: [
    // Rutas de next-intl: todas excepto archivos estáticos y _next
    "/((?!_next/static|_next/image|favicon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};