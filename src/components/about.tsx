import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("About");

  return (
    <section
      id="about"
      className="w-full bg-neutral-950 py-32 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="container max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              {t("title")}
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
