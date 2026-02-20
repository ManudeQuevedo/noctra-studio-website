"use client";

import {
  LazyMotion,
  m,
  domAnimation,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { MouseEvent, useEffect } from "react";
import NextImage from "next/image";

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <m.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}>
    {children}
  </m.div>
);

/**
 * BrandAnatomy
 * Purpose: Deconstructs the Noctra brand identity (Etymology, Symbology, Output).
 * Key Features:
 * - Interactive spotlight effect on hover
 * - Mobile auto-scan animation
 * - Deep dive into the brand's meaning
 */
export function BrandAnatomy() {
  const t = useTranslations("AboutPage.brand_anatomy");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const centerX = 400;
    const centerY = 300;
    const radius = 150;

    const isMobileDevice = () =>
      window.innerWidth < 768 || "ontouchstart" in window;

    let animation: ReturnType<typeof animate> | null = null;

    const startOrStop = () => {
      if (isMobileDevice()) {
        if (!animation) {
          animation = animate(0, Math.PI * 2, {
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            onUpdate: (angle) => {
              mouseX.set(centerX + Math.cos(angle) * radius);
              mouseY.set(centerY + Math.sin(angle) * radius);
            },
          });
        }
      } else {
        if (animation) {
          animation.stop();
          animation = null;
        }
      }
    };

    startOrStop();
    window.addEventListener("resize", startOrStop);
    return () => {
      window.removeEventListener("resize", startOrStop);
      if (animation) animation.stop();
    };
  }, [mouseX, mouseY]);

  // Create radial gradient that follows mouse
  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.15),
      transparent 80%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const isTouch = window.innerWidth < 768 || "ontouchstart" in window;
    if (!isTouch) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  }

  return (
    <LazyMotion features={domAnimation}>
    <section
      className="w-full bg-black py-24 border-y border-zinc-800 relative overflow-hidden"
      onMouseMove={handleMouseMove}>
      {/* Technical Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* MASSIVE WATERMARK LOGO - Base Layer (Always Faint) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <NextImage
          src="/noctra-studio-icon-light-theme.svg"
          alt=""
          width={600}
          height={600}
          className="w-[600px] h-[600px] opacity-5"
        />
      </div>

      {/* Spotlight Effect Layer - Illuminates Logo on Hover */}
      <m.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
        style={{
          background,
        }}>
        <NextImage
          src="/noctra-studio-icon-light-theme.svg"
          alt=""
          width={600}
          height={600}
          className="w-[600px] h-[600px] opacity-40"
          style={{ mixBlendMode: "lighten" }}
        />
      </m.div>

      {/* Content Layer */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <FadeIn>
          <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-16 text-center drop-shadow-md">
            {t("section_label")}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {/* Column 1: Etymology */}
          <FadeIn delay={0.1}>
            <div className="md:border-r border-dashed border-zinc-800 md:pr-8">
              <div className="mb-4 text-xs font-mono text-zinc-500 uppercase tracking-widest drop-shadow-md">
                {t("etymology.label")}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                {t("etymology.headline")}
              </h3>
              <p className="text-base text-zinc-400 leading-relaxed drop-shadow-md">
                {t("etymology.body")}
              </p>
            </div>
          </FadeIn>

          {/* Column 2: Symbology */}
          <FadeIn delay={0.2}>
            <div className="md:border-x border-dashed border-zinc-800 md:px-8">
              <div className="mb-4 text-xs font-mono text-zinc-500 uppercase tracking-widest drop-shadow-md">
                {t("symbology.label")}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                {t("symbology.headline")}
              </h3>
              <p className="text-base text-zinc-400 leading-relaxed drop-shadow-md">
                {t("symbology.body")}
              </p>
            </div>
          </FadeIn>

          {/* Column 3: Output */}
          <FadeIn delay={0.3}>
            <div className="md:pl-8">
              <div className="mb-4 text-xs font-mono text-zinc-500 uppercase tracking-widest drop-shadow-md">
                {t("output.label")}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                {t("output.headline")}
              </h3>
              <p className="text-base text-zinc-400 leading-relaxed drop-shadow-md">
                {t("output.body")}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
    </LazyMotion>
  );
}
