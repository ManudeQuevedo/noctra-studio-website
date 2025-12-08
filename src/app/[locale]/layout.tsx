import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Header } from "@/components/header";
import { FooterWrapper } from "@/components/FooterWrapper";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { BackgroundManager } from "@/components/backgrounds/BackgroundManager";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/JsonLd";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { SmoothScroll } from "@/components/SmoothScroll";
import Script from "next/script";
import { Cursor } from "@/components/ui/cursor";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { IntroProvider } from "@/context/IntroContext";
import { IntroLoader } from "@/components/ui/IntroLoader";

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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noctra-studio.vercel.app"),
  title: "Noctra Studio | Digital Architecture & Web Development",
  description:
    "Clarity in the digital night. Modern web development and digital architecture studio.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      es: "/es",
    },
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const fontClasses = `${satoshi.variable} ${geistSans.variable} ${geistMono.variable} antialiased selection:bg-white selection:text-black`;

  return (
    <>
      <Script id="apply-attributes" strategy="beforeInteractive">
        {`
          document.documentElement.lang = '${locale}';
          document.body.className = '${fontClasses}';
        `}
      </Script>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Cursor />
        <SmoothScroll />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange>
          <IntroProvider>
            <IntroLoader />
            <BackgroundManager />
            <Header />
            {children}
            <FooterWrapper />
            <ScrollToTop />
            <OrganizationSchema />
            <WebsiteSchema />
            <SpeedInsights />
            <Analytics />
            <ChatWidget />
          </IntroProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </>
  );
}
