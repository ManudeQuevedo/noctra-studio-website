import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Cursor } from "@/components/ui/cursor";

export const metadata: Metadata = {
  title: "Noctra Studio | Coming Soon",
  description:
    "Digital products are never finished. We offer Continuous Engineering retainers to ensure your infrastructure scales, secures, and evolves with your business goals.",
  icons: {
    icon: [
      { url: "/favicon-dark.svg", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-light.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange>
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
