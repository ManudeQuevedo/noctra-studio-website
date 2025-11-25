import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
