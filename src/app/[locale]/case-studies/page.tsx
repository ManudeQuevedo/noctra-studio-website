import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { AuditCTA } from "@/components/case-studies/AuditCTA";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CaseStudies" });

  return {
    title: `${t("hero.title")} | Noctra Studio`,
    description: t("hero.subtitle"),
  };
}

interface Project {
  name: string;
  concept: string;
  challenge: string;
  solution: string;
  tech_stack: string[];
  image: string;
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CaseStudies" });

  const projects: Project[] = [
    {
      name: t("projects.cafe_aurora.name"),
      concept: t("projects.cafe_aurora.concept"),
      challenge: t("projects.cafe_aurora.challenge"),
      solution: t("projects.cafe_aurora.solution"),
      tech_stack: JSON.parse(
        JSON.stringify(t.raw("projects.cafe_aurora.tech_stack"))
      ),
      image: "/images/cafe-aurora.jpg",
    },
    {
      name: t("projects.strongfit.name"),
      concept: t("projects.strongfit.concept"),
      challenge: t("projects.strongfit.challenge"),
      solution: t("projects.strongfit.solution"),
      tech_stack: JSON.parse(
        JSON.stringify(t.raw("projects.strongfit.tech_stack"))
      ),
      image: "/images/strongfit.jpg",
    },
    {
      name: t("projects.fintrack.name"),
      concept: t("projects.fintrack.concept"),
      challenge: t("projects.fintrack.challenge"),
      solution: t("projects.fintrack.solution"),
      tech_stack: JSON.parse(
        JSON.stringify(t.raw("projects.fintrack.tech_stack"))
      ),
      image: "/images/fintrack.jpg",
    },
  ];

  return (
    <main className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-32">
        {projects.map((project, index) => (
          <CaseStudyCard
            key={project.name}
            name={project.name}
            concept={project.concept}
            challenge={project.challenge}
            solution={project.solution}
            techStack={project.tech_stack}
            imagePath={project.image}
            index={index}
            challengeLabel={t("labels.challenge")}
            solutionLabel={t("labels.solution")}
            techStackLabel={t("labels.tech_stack")}
          />
        ))}
      </section>

      {/* Audit CTA */}
      <AuditCTA
        headline={t("cta.headline")}
        subtext={t("cta.subtext")}
        buttonText={t("cta.button")}
      />
    </main>
  );
}
