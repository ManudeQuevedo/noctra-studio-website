"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import NextImage from "next/image";
import { ArrowRight, Check, DollarSign } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Static images map
const SERVICE_IMAGES = {
  web_dev: "/images/architecture.jpg",
  ecommerce: "/images/identity.jpg",
  ai: "/images/ai.jpg",
  seo: "/images/seo.jpg",
};

const ServiceSideNav = ({ 
  activeSection, 
  services,
  scrollToService 
}: { 
  activeSection: string; 
  services: any[];
  scrollToService: (id: string) => void;
}) => {
  return (
    <div className="hidden lg:block fixed left-12 top-1/2 -translate-y-1/2 z-40 w-64">
      <div className="flex flex-col gap-6">
        {services.map((service, index) => {
          const isActive = activeSection === service.id;
          return (
            <button
              key={service.id}
              onClick={() => scrollToService(service.id)}
              className="group flex items-center gap-4 text-left transition-all duration-300">
              <div className="relative flex items-center justify-center">
                <div 
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-500",
                    isActive ? "bg-emerald-500 scale-150 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-neutral-800 group-hover:bg-neutral-600"
                  )} 
                />
                {isActive && (
                  <motion.div 
                    layoutId="active-dot"
                    className="absolute inset-0 w-3 h-3 -left-0.75 -top-0.75 border border-emerald-500/30 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  "text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300",
                  isActive ? "text-emerald-500" : "text-neutral-600"
                )}>
                  0{index + 1}
                </span>
                <span className={cn(
                  "text-xs font-bold transition-all duration-300",
                  isActive ? "text-white translate-x-1" : "text-neutral-500 group-hover:text-neutral-300"
                )}>
                  {service.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const PricingCallout = ({ serviceKey }: { serviceKey: string }) => {
  const t = useTranslations("ServicesPage");
  
  // Custom Pricing exists only for web_dev, ecommerce, and ai
  if (!t.raw(`${serviceKey}.pricing_label`)) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group">
      <div>
        <div className="flex items-center gap-2 text-emerald-500 mb-1">
          <DollarSign className="w-4 h-4" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest">{t(`${serviceKey}.title`)}</span>
        </div>
        <p className="text-xl font-bold text-white">
          {t(`${serviceKey}.pricing_label`)}
        </p>
      </div>
      <Link
        href={"/#pricing" as any}
        className="flex items-center gap-2 text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors">
        {t("pricing_callout_link")}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

const ServiceSection = ({
  service,
  index,
  image,
}: {
  service: { id: string; key: string; path: string };
  index: number;
  image: string;
}) => {
  const t = useTranslations("ServicesPage");

  return (
    <section id={service.id} className="w-full max-w-7xl mx-auto px-6 md:px-8 scroll-mt-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        {/* Left Column - Sticky Title & Visual Reveal */}
        <div className="md:col-span-5 relative">
          <div className="md:sticky md:top-40 h-fit z-10 flex flex-col">
            {/* Title - Order 1 on Mobile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative z-10 order-1 md:order-none">
              <span className="text-xs font-mono text-neutral-400 mb-6 block tracking-widest uppercase">
                0{index + 1} — Phase
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight leading-tight">
                {t(`${service.key}.title`)}
              </h2>
            </motion.div>

            {/* Phase Anchor Image - Order 2 on Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full overflow-hidden border border-neutral-800 mt-6 mb-6 md:mt-12 md:mb-0 order-2 md:order-none rounded-2xl aspect-[4/5] md:aspect-auto">
              <NextImage
                src={image}
                alt={t(`${service.key}.title`)}
                width={800}
                height={1000}
                className="object-cover grayscale contrast-125 w-full h-full brightness-75 group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay Label */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl">
                  {t(`${service.key}.image_label`)}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Process Steps */}
        <div className="md:col-span-7 pt-8 md:pt-0 md:border-l md:border-neutral-800 md:pl-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="flex flex-col gap-6 group/list">
              {/* Problem & Solution */}
              <div className="mb-16 space-y-6">
                <div className="p-8 bg-white/[0.02] border border-white/[0.05] rounded-3xl relative overflow-hidden group/box">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500/20" />
                  <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-3">
                    The Problem
                  </h4>
                  <p className="text-xl text-neutral-300 font-medium leading-relaxed">
                    {t(`${service.key}.problem`)}
                  </p>
                </div>
                <div className="p-8 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-3xl relative overflow-hidden group/box">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/40" />
                  <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3">
                    The Solution
                  </h4>
                  <p className="text-xl text-white font-medium leading-relaxed">
                    {t(`${service.key}.solution`)}
                  </p>
                </div>
              </div>

              {/* Process Steps */}
              <div className="space-y-4 mb-16">
                <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-8 flex items-center gap-4">
                  <span>How we build it</span>
                  <div className="h-px flex-1 bg-neutral-800" />
                </h4>
                {[0, 1, 2, 3].map((stepIndex) => (
                  <div
                    key={stepIndex}
                    className="relative flex items-center gap-6 group/item transition-all duration-500 hover:bg-white/[0.02] -mx-4 px-4 py-4 rounded-2xl cursor-default">
                    <span className="font-mono text-xs text-neutral-600 transition-colors group-hover/item:text-emerald-500">
                      0{stepIndex + 1}
                    </span>
                    <p className="text-xl md:text-2xl font-bold text-neutral-400 group-hover/item:text-white transition-colors">
                      {t(`${service.key}.process.${stepIndex}`)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description & Deliverables */}
              <div className="space-y-12">
                <div>
                  <p className="text-xl text-neutral-400 leading-relaxed mb-8 font-medium">
                    {t(`${service.key}.focus`)}
                  </p>
                  <div className="bg-neutral-900/50 border-l-2 border-emerald-500 p-6 rounded-r-2xl">
                    <p className="text-base text-white italic font-medium leading-relaxed">
                      "{t(`${service.key}.why`)}"
                    </p>
                  </div>
                </div>

                <div className="pt-12 border-t border-neutral-800">
                  <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-8">
                    Business Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-emerald-500" />
                          </div>
                          <span className="text-base font-bold text-white leading-tight">
                            {t(`${service.key}.deliverables.${i}`)}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-500 leading-relaxed pl-8">
                          {t(`${service.key}.deliverables_subtext.${i}`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <PricingCallout serviceKey={service.key} />

                {/* Bottom Links */}
                <div className="flex flex-wrap items-center gap-8 pt-8">
                  <Link
                    href={{
                      pathname: "/contact",
                      query: { interest: service.id },
                    }}
                    className="group flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-white transition-colors">
                    {t(`${service.key}.cta`)}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/work"
                    className="group flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-white transition-colors">
                    See examples
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function ServicesClient() {
  const t = useTranslations("ServicesPage");
  const [activeSection, setActiveSection] = useState("web_dev");

  const services = [
    { id: "digital-architecture", key: "web_dev", label: "Professional Websites", path: "/services/professional-websites" as const },
    { id: "visual-identity", key: "ecommerce", label: "Online Stores", path: "/services/ecommerce" as const },
    { id: "intelligent-systems", key: "ai", label: "Custom Systems", path: "/services/custom-systems" as const },
    { id: "growth", key: "seo", label: "Optimization", path: "/services/optimization" as const },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -40% 0px" }
    );

    services.forEach((service) => {
      const el = document.getElementById(service.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToService = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-transparent pt-48 pb-0 relative z-0 selection:bg-emerald-500/30">
      <ServiceSideNav 
        activeSection={activeSection} 
        services={services} 
        scrollToService={scrollToService} 
      />

      {/* Mobile Quick Jump Bar */}
      <div className="block lg:hidden sticky top-28 z-40 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 mb-8">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-2 px-4 py-3 min-w-max">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => scrollToService(service.id)}
                className={cn(
                  "px-4 py-2 text-xs font-bold uppercase tracking-widest border rounded-full transition-all",
                  activeSection === service.id
                    ? "bg-emerald-500 text-black border-emerald-500"
                    : "bg-transparent text-neutral-500 border-neutral-800"
                )}>
                {service.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed font-medium">
            {t("subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Services Sections */}
      <div className="flex flex-col gap-48 md:gap-64 mb-32">
        <ServiceSection
          service={services[0]}
          index={0}
          image={SERVICE_IMAGES.web_dev}
        />
        
        <ServiceSection
          service={services[1]}
          index={1}
          image={SERVICE_IMAGES.ecommerce}
        />

        {/* Metrics Break */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 bg-neutral-950 py-32 border-y border-neutral-800">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">
                  STANDARD 01
                </span>
                <div className="text-3xl md:text-5xl font-black tracking-tight text-white">
                  {t("metrics.lighthouse")}
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">
                  STANDARD 02
                </span>
                <div className="text-3xl md:text-5xl font-black tracking-tight text-white">
                  {t("metrics.latency")}
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">
                  STANDARD 03
                </span>
                <div className="text-3xl md:text-5xl font-black tracking-tight text-white">
                  {t("metrics.uptime")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ServiceSection
          service={services[2]}
          index={2}
          image={SERVICE_IMAGES.ai}
        />
        
        <ServiceSection
          service={services[3]}
          index={3}
          image={SERVICE_IMAGES.seo}
        />
      </div>

      {/* Bottom Divider */}
      <div className="w-full border-t border-neutral-800" />
    </main>
  );
}
