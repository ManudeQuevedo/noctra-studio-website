import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { FooterWrapper } from "@/components/FooterWrapper";

const ScrollToTop = dynamic(() =>
  import("@/components/ui/ScrollToTop").then((mod) => mod.ScrollToTop),
);
const WhatsAppFloatingButton = dynamic(() =>
  import("@/components/ui/WhatsAppFloatingButton").then(
    (mod) => mod.WhatsAppFloatingButton,
  ),
);
const Cursor = dynamic(() =>
  import("@/components/ui/cursor").then((mod) => mod.Cursor),
);
const CookieBanner = dynamic(() =>
  import("@/components/cookie-consent/CookieBanner").then(
    (mod) => mod.CookieBanner,
  ),
);
const CookieSettingsButton = dynamic(() =>
  import("@/components/cookie-consent/CookieSettingsButton").then(
    (mod) => mod.CookieSettingsButton,
  ),
);
const QuizModal = dynamic(() =>
  import("@/components/quiz/QuizModal").then((mod) => mod.QuizModal),
);

import { BackgroundManager } from "@/components/backgrounds/BackgroundManager";
import {
  OrganizationSchema,
  WebsiteSchema,
  LocalBusinessSchema,
} from "@/components/seo/JsonLd";
import { VercelScripts } from "@/components/VercelScripts";
import { SmoothScroll } from "@/components/SmoothScroll";
import Script from "next/script";
import { IntroProvider } from "@/context/IntroContext";
import { IntroLoader } from "@/components/ui/IntroLoader";
import { QuizProvider } from "@/components/quiz/QuizContext";

// Satoshi - Brand primary font
const satoshi = localFont({
  src: [
    {
      path: "../../fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.noctra.studio"),
  title: "Noctra Studio | Digital Architecture & Web Development",
  description:
    "Strategic web development studio in Querétaro, Mexico. Websites that generate measurable ROI for businesses.",
  openGraph: {
    title: "Noctra Studio | Strategic Web Development",
    description:
      "Websites that generate measurable ROI for businesses in Mexico and abroad.",
    siteName: "Noctra Studio",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Noctra Studio — Strategic Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noctra Studio | Strategic Web Development",
    description:
      "Websites that generate measurable ROI for businesses in Mexico and abroad.",
    images: ["/twitter-image.jpg"],
  },
  icons: [
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/favicon-dark.svg",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/favicon-light.svg",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const fontClasses = `${satoshi.variable} antialiased selection:bg-white selection:text-black`;

  return (
    <>
      <head>
        <link
          rel="preload"
          href="/fonts/Satoshi-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.resend.com"
          crossOrigin="anonymous"
        />
      </head>
      <Script id="apply-attributes" strategy="beforeInteractive">
        {`
          document.documentElement.lang = '${locale}';
          document.body.className = '${fontClasses}';
        `}
      </Script>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[120] rounded-full bg-white px-4 py-2 text-sm font-bold text-black focus:not-sr-only">
          Skip to content
        </a>
        <Cursor />
        <SmoothScroll />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange>
          <IntroProvider>
            <QuizProvider>
              <IntroLoader />
              <BackgroundManager />
              <Header />
              <div id="main-content" tabIndex={-1}>
                {children}
              </div>
              <FooterWrapper />
              <ScrollToTop />
              <WhatsAppFloatingButton />
              <OrganizationSchema />
              <WebsiteSchema />
              <LocalBusinessSchema />
              <CookieBanner />
              <CookieSettingsButton />
              <QuizModal />
              <VercelScripts />
            </QuizProvider>
          </IntroProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </>
  );
}
