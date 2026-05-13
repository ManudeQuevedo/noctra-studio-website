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
      </head>
      <body
        suppressHydrationWarning
        className="selection:bg-white selection:text-black">
        {children}
        <Script
          src="https://cdn.noctra.studio/tracker.js"
          data-site-id="47dbb728b34b4ea5b801daa6105a5946"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
