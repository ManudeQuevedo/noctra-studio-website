import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Noctra Studio",
  description: "Project status and deliverables.",
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      {children}
    </div>
  );
}
