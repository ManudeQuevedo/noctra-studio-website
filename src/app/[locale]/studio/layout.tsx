import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noctra Command Center",
  description: "Restricted Access",
};

export default function StudioLayout({
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
