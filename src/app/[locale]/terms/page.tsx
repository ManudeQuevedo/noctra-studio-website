import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("TermsPage");

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">
          {t("title")}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-12">
          {t("last_updated", { date: new Date().toLocaleDateString() })}
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("sections.acceptance.title")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t("sections.acceptance.content")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("sections.services.title")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t("sections.services.content")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("sections.ip.title")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t("sections.ip.content")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("sections.obligations.title")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t("sections.obligations.content")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("sections.liability.title")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t("sections.liability.content")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("sections.governing.title")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t("sections.governing.content")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("sections.contact.title")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t("sections.contact.content")}
              <br />
              <a
                href="mailto:hello@noctra.studio"
                className="text-neutral-900 dark:text-white font-medium hover:underline mt-2 inline-block">
                hello@noctra.studio
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
