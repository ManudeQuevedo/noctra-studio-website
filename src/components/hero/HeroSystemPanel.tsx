"use client";

import { useId } from "react";
import { motion as m } from "framer-motion";
import { useTranslations } from "next-intl";

type LayerConfig = {
  labelKey: string;
  titleKey: string;
  subtitleKey: string;
  y: number;
  delay: number;
};

type PulseConfig = {
  start: number;
  end: number;
  radius: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
};

const layers: LayerConfig[] = [
  {
    labelKey: "hero.system_layer_01_label",
    titleKey: "hero.system_layer_01_title",
    subtitleKey: "hero.system_layer_01_subtitle",
    y: 10,
    delay: 0.3,
  },
  {
    labelKey: "hero.system_layer_02_label",
    titleKey: "hero.system_layer_02_title",
    subtitleKey: "hero.system_layer_02_subtitle",
    y: 126,
    delay: 0.45,
  },
  {
    labelKey: "hero.system_layer_03_label",
    titleKey: "hero.system_layer_03_title",
    subtitleKey: "hero.system_layer_03_subtitle",
    y: 398,
    delay: 0.6,
  },
  {
    labelKey: "hero.system_layer_04_label",
    titleKey: "hero.system_layer_04_title",
    subtitleKey: "hero.system_layer_04_subtitle",
    y: 514,
    delay: 0.75,
  },
];

const resultPulses: PulseConfig[] = [
  { start: 110, end: 252, radius: 2.5, color: "#10B981", opacity: 1, duration: 3.2, delay: 0.25 },
  { start: 226, end: 252, radius: 2.5, color: "#10B981", opacity: 1, duration: 2.8, delay: 1.05 },
  { start: 398, end: 372, radius: 2.5, color: "#10B981", opacity: 1, duration: 3, delay: 0.7 },
  { start: 514, end: 372, radius: 2.5, color: "#10B981", opacity: 1, duration: 3.35, delay: 1.35 },
];

const signalPulses: PulseConfig[] = [
  { start: 252, end: 110, radius: 1.5, color: "#F0EDE6", opacity: 0.35, duration: 2.9, delay: 0.9 },
  { start: 252, end: 226, radius: 1.5, color: "#F0EDE6", opacity: 0.35, duration: 3.25, delay: 0.35 },
  { start: 372, end: 398, radius: 1.5, color: "#F0EDE6", opacity: 0.35, duration: 3.1, delay: 1.2 },
  { start: 372, end: 514, radius: 1.5, color: "#F0EDE6", opacity: 0.35, duration: 2.95, delay: 0.55 },
];

function LayerBlock({
  y,
  delay,
  label,
  title,
  subtitle,
}: {
  y: number;
  delay: number;
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <m.g
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}>
      <rect
        x="24"
        y={y}
        width="412"
        height="100"
        rx="16"
        fill="#0A0B13"
        stroke="#10B981"
        strokeOpacity="0.35"
        strokeWidth="0.5"
      />
      <text
        x="44"
        y={y + 32}
        fill="#10B981"
        fontSize="12"
        fontWeight="500"
        letterSpacing="2.5">
        {label}
      </text>
      <line
        x1="44"
        y1={y + 44}
        x2="84"
        y2={y + 44}
        stroke="#10B981"
        strokeWidth="0.5"
      />
      <text
        x="44"
        y={y + 68}
        fill="#F0EDE6"
        fontSize="20"
        fontWeight="500">
        {title}
      </text>
      <text
        x="44"
        y={y + 88}
        fill="#888780"
        fontSize="14"
        fontWeight="400">
        {subtitle}
      </text>
    </m.g>
  );
}

function Pulse({ start, end, radius, color, opacity, duration, delay }: PulseConfig) {
  return (
    <m.circle
      cx="230"
      cy={start}
      r={radius}
      fill={color}
      opacity={opacity}
      animate={{ cy: [start, end] }}
      transition={{
        duration,
        ease: "linear",
        delay,
        repeat: Infinity,
        repeatType: "loop",
      }}
    />
  );
}

export function HeroSystemPanel() {
  const t = useTranslations("HomePage");
  const gradientId = useId().replace(/:/g, "");
  const titleId = `${gradientId}-title`;
  const descId = `${gradientId}-desc`;

  const svgTitle = t("hero.visual_title");
  const svgDescription = [
    t("hero.system_core_kicker"),
    t("hero.system_layer_01_label"),
    t("hero.system_layer_02_label"),
    t("hero.system_layer_03_label"),
    t("hero.system_layer_04_label"),
  ].join(". ");

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.14 }}
      className="relative mx-auto w-full max-w-[380px] lg:ml-auto lg:mr-0 lg:max-w-[420px]">
      <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-neutral-950/95 via-neutral-950/85 to-emerald-950/20 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-8">
        <div className="mb-8">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.24em]"
            style={{ color: "#10B981" }}>
            {t("hero.visual_label")}
          </p>
          <p
            className="mt-1 max-w-sm text-lg font-semibold tracking-tight md:text-xl"
            style={{ color: "#F0EDE6" }}>
            {t("hero.visual_title")}
          </p>
        </div>

        <svg
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          viewBox="0 0 460 680"
          width="100%"
          height="auto"
          preserveAspectRatio="xMidYMid meet"
          className="block w-full overflow-visible">
          <title id={titleId}>{svgTitle}</title>
          <desc id={descId}>{svgDescription}</desc>

          <defs>
            <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
              <stop offset="45%" stopColor="#10B981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="230" cy="312" r="95" fill={`url(#${gradientId})`} />

          <g>
            <line
              x1="230"
              y1="110"
              x2="230"
              y2="252"
              stroke="#10B981"
              strokeWidth="0.6"
              strokeOpacity="0.35"
              strokeDasharray="2 4"
            />
            <line
              x1="230"
              y1="372"
              x2="230"
              y2="514"
              stroke="#10B981"
              strokeWidth="0.6"
              strokeOpacity="0.35"
              strokeDasharray="2 4"
            />
          </g>

          {layers.map((layer) => (
            <LayerBlock
              key={layer.labelKey}
              y={layer.y}
              delay={layer.delay}
              label={t(layer.labelKey)}
              title={t(layer.titleKey)}
              subtitle={t(layer.subtitleKey)}
            />
          ))}

          <g>
            <m.circle
              cx="230"
              cy="312"
              r="60"
              fill="none"
              stroke="#10B981"
              strokeWidth="0.8"
              opacity="0.3"
              animate={{ r: [60, 85], opacity: [0.35, 0] }}
              transition={{
                duration: 3,
                ease: "easeOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
            <circle
              cx="230"
              cy="312"
              r="60"
              fill="#07080F"
              stroke="#10B981"
              strokeWidth="1.5"
            />
            <text
              x="230"
              y="290"
              textAnchor="middle"
              fill="#10B981"
              fontSize="10"
              fontWeight="500"
              letterSpacing="2">
              {t("hero.system_core_kicker")}
            </text>
            <line
              x1="195"
              y1="298"
              x2="265"
              y2="298"
              stroke="#10B981"
              strokeWidth="0.5"
            />
            <text
              x="230"
              y="318"
              textAnchor="middle"
              fill="#F0EDE6"
              fontSize="14"
              fontWeight="500">
              {t("hero.system_core_line_1")}
            </text>
            <text
              x="230"
              y="336"
              textAnchor="middle"
              fill="#F0EDE6"
              fontSize="14"
              fontWeight="500">
              {t("hero.system_core_line_2")}
            </text>
          </g>

          <g>
            {resultPulses.map((pulse) => (
              <Pulse key={`${pulse.start}-${pulse.end}-${pulse.delay}`} {...pulse} />
            ))}
            {signalPulses.map((pulse) => (
              <Pulse key={`${pulse.start}-${pulse.end}-${pulse.delay}`} {...pulse} />
            ))}
          </g>

          <m.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}>
            <circle cx="88" cy="648" r="1.5" fill="#F0EDE6" opacity="0.35" />
            <text x="104" y="652" fill="#888780" fontSize="12">
              {t("hero.system_legend_out")}
            </text>

            <circle cx="265" cy="648" r="2.5" fill="#10B981" />
            <text x="281" y="652" fill="#888780" fontSize="12">
              {t("hero.system_legend_in")}
            </text>
          </m.g>
        </svg>
      </div>
    </m.div>
  );
}
