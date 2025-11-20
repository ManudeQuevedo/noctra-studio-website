import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Cursor } from "@/components/ui/cursor";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackgroundManager } from "@/components/backgrounds/BackgroundManager";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noctra Studio",
  description: "Clarity in the digital night.",
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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <BackgroundManager />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange>
            <Cursor />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <OrganizationSchema />
            <WebsiteSchema />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
