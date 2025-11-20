import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("PrivacyPage");

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
              {t("sections.intro.title")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t("sections.intro.content")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("sections.collection.title")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              {t("sections.collection.content")}
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
              <li>
                <strong>{t("sections.collection.list.identity")}</strong>
              </li>
              <li>
                <strong>{t("sections.collection.list.contact")}</strong>
              </li>
              <li>
                <strong>{t("sections.collection.list.project")}</strong>
              </li>
              <li>
                <strong>{t("sections.collection.list.technical")}</strong>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("sections.purpose.title")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              {t("sections.purpose.content")}
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
              <li>{t("sections.purpose.list.service")}</li>
              <li>{t("sections.purpose.list.communication")}</li>
              <li>{t("sections.purpose.list.improvement")}</li>
              <li>{t("sections.purpose.list.legal")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("sections.rights.title")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              {t("sections.rights.content")}
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
              <li>
                <strong>{t("sections.rights.list.access")}</strong>
              </li>
              <li>
                <strong>{t("sections.rights.list.rectification")}</strong>
              </li>
              <li>
                <strong>{t("sections.rights.list.cancellation")}</strong>
              </li>
              <li>
                <strong>{t("sections.rights.list.opposition")}</strong>
              </li>
            </ul>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mt-4">
              {t("sections.rights.contact_text")}{" "}
              <a
                href="mailto:hello@noctra.studio"
                className="text-neutral-900 dark:text-white font-medium hover:underline">
                hello@noctra.studio
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("sections.cookies.title")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t("sections.cookies.content")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("sections.changes.title")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t("sections.changes.content")}
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
