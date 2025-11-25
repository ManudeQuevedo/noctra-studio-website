"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface AuditCTAProps {
  headline: string;
  subtext: string;
  buttonText: string;
}

export function AuditCTA({ headline, subtext, buttonText }: AuditCTAProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12 overflow-hidden">
        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Text */}
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              {headline}
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
              {subtext}
            </p>
            <Link
              href="/contact?interest=audit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors">
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Icon */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-zinc-800/50 border border-zinc-700 flex items-center justify-center">
              <Activity className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
