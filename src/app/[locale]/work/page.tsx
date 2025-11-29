"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProjectModal } from "@/components/work/ProjectModal";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiGreensock,
  SiReact,
  SiFigma,
  SiGoogleanalytics,
  SiTypescript,
  SiChartdotjs,
  SiVercel,
  SiAuth0,
} from "react-icons/si";
import { useTranslations } from "next-intl";

export default function WorkPage() {
  const t = useTranslations("WorkPage");
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get("project");

  const handleOpenModal = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("project", id);
    router.push(`?${params.toString()}`);
  };

  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("project");
    router.push(`?${params.toString()}`);
  };

  const caseStudies = [
    {
      id: "cafe-aurora",
      title: "Café Aurora",
      tags: [
        t("projects.cafe_aurora.tag1"),
        t("projects.cafe_aurora.tag2"),
        t("projects.cafe_aurora.tag3"),
      ],
      context: t("projects.cafe_aurora.context"),
      challenge: t("projects.cafe_aurora.challenge"),
      approach: t("projects.cafe_aurora.approach"),
      stack: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Tailwind", icon: SiTailwindcss },
        { name: "GSAP", icon: SiGreensock },
      ],
      image: "/images/cafe-aurora.jpg",
      imageAlt: "Café Aurora mobile interface mockup",
    },
    {
      id: "strongfit",
      title: "StrongFit",
      tags: [
        t("projects.strongfit.tag1"),
        t("projects.strongfit.tag2"),
        t("projects.strongfit.tag3"),
      ],
      context: t("projects.strongfit.context"),
      challenge: t("projects.strongfit.challenge"),
      approach: t("projects.strongfit.approach"),
      stack: [
        { name: "React", icon: SiReact },
        { name: "Figma", icon: SiFigma },
        { name: "Analytics", icon: SiGoogleanalytics },
      ],
      image: "/images/strongfit.jpg",
      imageAlt: "StrongFit hero section desktop mockup",
    },
    {
      id: "fintrack",
      title: "FinTrack",
      tags: [
        t("projects.fintrack.tag1"),
        t("projects.fintrack.tag2"),
        t("projects.fintrack.tag3"),
      ],
      context: t("projects.fintrack.context"),
      challenge: t("projects.fintrack.challenge"),
      approach: t("projects.fintrack.approach"),
      stack: [
        { name: "TypeScript", icon: SiTypescript },
        { name: "React", icon: SiReact },
        { name: "Chart.js", icon: SiChartdotjs },
      ],
      image: "/images/fintrack.jpg",
      imageAlt: "FinTrack dark mode dashboard mockup",
    },
    {
      id: "vaultra",
      title: "Vaultra",
      tags: [
        t("projects.vaultra.tag1"),
        t("projects.vaultra.tag2"),
        t("projects.vaultra.tag3"),
      ],
      context: t("projects.vaultra.context"),
      challenge: t("projects.vaultra.challenge"),
      approach: t("projects.vaultra.approach"),
      stack: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Vercel", icon: SiVercel },
        { name: "Auth0", icon: SiAuth0 },
      ],
      image: "/images/vaultra.jpg",
      imageAlt: "Vaultra cybersecurity interface concept",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {caseStudies.map((project, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className={`${isReversed ? "lg:order-2" : ""} relative`}>
                  <div className="aspect-[4/3] rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden relative group">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>

                {/* Content */}
                <div className={`${isReversed ? "lg:order-1" : ""} space-y-8`}>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs border border-white/20 rounded-full px-3 py-1 text-neutral-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    {project.title}
                  </h2>

                  {/* Details */}
                  <div className="space-y-6 border-l-2 border-neutral-800 pl-6">
                    <div>
                      <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-wider mb-2">
                        {t("labels.context")}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">
                        {project.context}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-wider mb-2">
                        {t("labels.challenge")}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-wider mb-2">
                        {t("labels.approach")}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">
                        {project.approach}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-800">
                      <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-wider mb-3">
                        {t("labels.stack")}
                      </h3>
                      <div className="flex gap-3">
                        {project.stack.map((tech: any) => {
                          const Icon = tech.icon;
                          return (
                            <div key={tech.name} className="group relative">
                              <Icon className="w-6 h-6 text-neutral-400 hover:text-white transition-colors cursor-pointer" />
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-neutral-700 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {tech.name}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleOpenModal(project.id)}
                      className="flex items-center gap-2 text-white hover:text-neutral-300 transition-colors group pt-4">
                      {t("see_full_case_study")}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Methodology Footer / CTA */}
      <section className="py-24 px-6 border-t border-neutral-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t("cta_title")}
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-lg text-white hover:text-neutral-300 transition-colors group">
            {t("cta_button")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <ProjectModal projectId={projectId} onClose={handleCloseModal} />
    </main>
  );
}
