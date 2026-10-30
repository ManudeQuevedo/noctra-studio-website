import type { ReactNode } from "react";
import Script from "next/script";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://cdn.resend.com"
          crossOrigin="anonymous"
        />
        <style
          id="owlight-intro-visibility-gate"
          dangerouslySetInnerHTML={{
            __html:
              "#owlight-feedback-widget-host{display:none!important;visibility:hidden!important;}",
          }}
        />
        {/* Without JS, framer-motion's SSR initial state (opacity:0) would leave
            content invisible. Ignored entirely when JS is enabled. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '#main-content [style*="opacity:0"],#main-content [style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}',
            }}
          />
        </noscript>
      </head>
      <body
        suppressHydrationWarning
        className="selection:bg-white selection:text-black">
        {children}
        <Script id="disable-owlight-intro" strategy="beforeInteractive">
          {`
            try {
              window.localStorage.setItem('owlight_intro_dismissed', '1');
            } catch (_) {}
          `}
        </Script>
        <Script
          src="https://cdn.noctra.studio/tracker.js"
          data-site-id="47dbb728b34b4ea5b801daa6105a5946"
          strategy="beforeInteractive"
        />
        <Script
          src="https://owlight-widget.vercel.app/widget-feedback.umd.js"
          data-theme="dark"
          data-position="left"
          data-lang="en"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
