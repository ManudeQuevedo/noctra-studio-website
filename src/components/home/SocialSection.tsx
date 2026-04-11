"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Bot, CalendarRange, PenLine, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

import Image from "next/image";

const pipelineIcons = [CalendarRange, PenLine, Bot, Share2];

export function SocialSection() {
  const t = useTranslations("HomePage.social");
  const points = t.raw("points") as string[];
  const pipeline = t.raw("pipeline") as string[];

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="social"
        className="relative overflow-hidden border-t border-white/5 bg-black px-6 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <m.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">
                  {t("tagline")}
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  {t("title")}
                </h2>
                <p className="text-lg leading-relaxed text-neutral-300 md:text-xl">
                  {t("copy")}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-medium text-neutral-200"
                  >
                    {point}
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 w-full rounded-full border-white/10 bg-white/[0.03] px-8 text-base font-semibold text-white hover:border-white/30 hover:bg-white/[0.06] sm:w-auto"
              >
                <Link
                  href={{
                    pathname: "/contact",
                    query: { tipo: "social", origen: "home-social" },
                  }}
                >
                  {t("cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-[2.5rem] bg-emerald-500/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-neutral-950 to-neutral-900 shadow-[0_40px_120px_rgba(0,0,0,0.42)] transition-transform duration-500 group-hover:scale-[1.01]">
                <Image
                  src="/images/products/noctra-social.png"
                  alt="Noctra Social Interface"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
                
                <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Float Overlay Indicator */}
              <div className="pointer-events-none absolute -bottom-6 -left-6 hidden md:block">
                <div className="rounded-3xl border border-white/10 bg-neutral-950/90 p-5 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                      <Bot className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                        Status
                      </p>
                      <p className="text-sm font-semibold text-white">
                        AI Assist Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
