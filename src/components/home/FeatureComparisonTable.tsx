"use client";

import { useTranslations } from "next-intl";
import { Check, MoveRight } from "lucide-react";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { Link } from "@/i18n/routing";

interface ComparisonColumn {
  id: string;
  name: string;
  subtitle: string;
  highlighted?: boolean;
}

interface ComparisonRow {
  criteria: string;
  values: string[];
}

function ComparisonCard({ col, rows, recommendedBadge, t }: any) {
  const isNoctra = col.highlighted;
  return (
    <div
      className={cn(
        "flex-shrink-0 w-full flex flex-col bg-[#161616] rounded-[24px] border h-full",
        isNoctra
          ? "border-emerald-500/50 shadow-2xl shadow-emerald-500/10 relative"
          : "border-neutral-800",
      )}>
      {isNoctra && (
        <div className="absolute -top-3 left-6 px-3 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full z-10">
          {recommendedBadge}
        </div>
      )}
      <div
        className={cn(
          "p-6 border-b border-neutral-800",
          isNoctra ? "pt-8" : "pt-6",
        )}>
        <h3
          className={cn(
            "text-xl font-black uppercase tracking-tight",
            isNoctra ? "text-emerald-400" : "text-white",
          )}>
          {col.name}
        </h3>
        <p className="text-sm text-neutral-300 font-medium mt-1">
          {col.subtitle}
        </p>
      </div>
      <div className="p-6 flex flex-col gap-4 flex-grow">
        {rows.map((row: any, idx: number) => {
          const val = row.values[col.index];
          const isCheckmark = val.startsWith("✓");
          const displayVal = isCheckmark ? val.slice(2).trim() : val;

          return (
            <div key={row.criteria} className="flex justify-between items-start gap-4">
              <span className="text-xs text-neutral-300 leading-snug w-2/5">
                {row.criteria}
              </span>
              <div className="w-3/5 flex flex-col text-right">
                {isNoctra ? (
                  <span className="text-sm font-medium text-emerald-400 text-left">
                    <Check className="w-4 h-4 text-emerald-500 inline-block mr-1.5 -mt-0.5" />
                    {displayVal}
                  </span>
                ) : (
                  <span className="text-sm font-medium text-white text-right">
                    {displayVal}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {isNoctra && (
        <div className="p-6 pt-0 mt-auto">
          <Link
            href="/contact"
            className="w-full py-3.5 bg-emerald-500 text-black text-sm font-black uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
            {t("mobile_cta")} <MoveRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

function MobileTableSlider({ columns, rows, recommendedBadge, t }: any) {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const [activeTabletIdx, setActiveTabletIdx] = useState(0);
  const tabletTrackRef = useRef<HTMLDivElement>(null);

  const mobileColumns = [
    { ...columns[3], index: 3 }, // Noctra
    { ...columns[0], index: 0 }, // Wix
    { ...columns[1], index: 1 }, // Webflow
    { ...columns[2], index: 2 }, // Agency
  ];

  const handleMobileScroll = () => {
    if (!mobileTrackRef.current) return;
    const scrollLeft = mobileTrackRef.current.scrollLeft;
    const cardWidth = mobileTrackRef.current.clientWidth;
    setActiveMobileIdx(Math.round(scrollLeft / cardWidth));
  };

  const scrollMobileTo = (idx: number) => {
    if (!mobileTrackRef.current) return;
    const cardWidth = mobileTrackRef.current.clientWidth;
    mobileTrackRef.current.scrollTo({
      left: cardWidth * idx,
      behavior: "smooth",
    });
  };

  const handleTabletScroll = () => {
    if (!tabletTrackRef.current) return;
    const scrollLeft = tabletTrackRef.current.scrollLeft;
    const cardWidth = tabletTrackRef.current.clientWidth;
    setActiveTabletIdx(Math.round(scrollLeft / cardWidth));
  };

  const scrollTabletTo = (idx: number) => {
    if (!tabletTrackRef.current) return;
    const cardWidth = tabletTrackRef.current.clientWidth;
    tabletTrackRef.current.scrollTo({
      left: cardWidth * idx,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full lg:hidden flex flex-col pt-4">
      {/* Header */}
      <div className="text-center mb-8 px-6">
        <h3 className="text-3xl font-black text-white">{t("mobile_title")}</h3>
        <p className="text-neutral-400 text-sm flex items-center justify-center gap-2 mt-2">
          {t("mobile_subtitle")}{" "}
          <MoveRight className="w-4 h-4 text-neutral-300" />
        </p>
      </div>

      {/* MOBILE VIEW (< 768px) */}
      <div className="w-full md:hidden relative">
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 px-6 pb-2 w-full items-stretch">
          {mobileColumns.map((col, idx) => (
            <div
              key={col.id}
              className="snap-center w-full flex-shrink-0 flex"
              style={{ width: "calc(100vw - 48px)" }}>
              <ComparisonCard
                col={col}
                rows={rows}
                recommendedBadge={recommendedBadge}
                t={t}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {mobileColumns.map((col, idx) => (
            <button
              key={col.id}
              onClick={() => scrollMobileTo(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === activeMobileIdx
                  ? "w-6 bg-emerald-500"
                  : "w-1.5 bg-neutral-700",
              )}
            />
          ))}
        </div>
      </div>

      {/* TABLET VIEW (768px - 1023px) */}
      <div className="hidden md:flex flex-row w-full gap-6 px-6 relative items-stretch">
        {/* Fixed Noctra Card */}
        <div className="w-1/2 flex-shrink-0 flex">
          <ComparisonCard
            col={mobileColumns[0]}
            rows={rows}
            recommendedBadge={recommendedBadge}
            t={t}
          />
        </div>
        {/* Scrollable Competitors */}
        <div className="w-1/2 flex-shrink-0 flex flex-col relative overflow-hidden">
          <div
            ref={tabletTrackRef}
            onScroll={handleTabletScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-2 w-full h-full flex-grow items-stretch">
            {mobileColumns.slice(1).map((col) => (
              <div
                key={col.id}
                className="snap-center w-full flex-shrink-0 flex h-full">
                <ComparisonCard
                  col={col}
                  rows={rows}
                  recommendedBadge={recommendedBadge}
                  t={t}
                />
              </div>
            ))}
          </div>
          {/* Dots for Tablet */}
          <div className="flex justify-center gap-2 mt-6 mb-2">
            {mobileColumns.slice(1).map((col, idx) => (
              <button
                key={col.id}
                onClick={() => scrollTabletTo(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  idx === activeTabletIdx
                    ? "w-6 bg-emerald-500"
                    : "w-1.5 bg-neutral-700",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureComparisonTable() {
  const t = useTranslations("Pricing.feature_comparison");

  const columns = t.raw("columns") as ComparisonColumn[];
  const rows = t.raw("rows") as ComparisonRow[];
  const recommendedBadge = t("recommended_badge");

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="hidden lg:block w-full overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/20 backdrop-blur-sm shadow-2xl">
        {/* Table label */}
        <div className="px-6 pt-6 pb-4 border-b border-neutral-800/60">
          <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest">
            {/* Compare options at a glance */}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table
            className="w-full text-left border-collapse"
            style={{ minWidth: "640px" }}>
            {/* Column Headers */}
            <thead>
              <tr className="border-b border-neutral-800">
                {/* Criteria label column */}
                <th className="p-5 w-[180px] bg-neutral-950/40" />
                {columns.map((col) => (
                  <th
                    key={col.id}
                    className={cn(
                      "p-5 text-center border-l border-neutral-800/50",
                      col.highlighted
                        ? "bg-emerald-950/40"
                        : "bg-neutral-950/30",
                    )}>
                    {col.highlighted && (
                      <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest">
                        {recommendedBadge}
                      </span>
                    )}
                    <div
                      className={cn(
                        "text-sm font-black uppercase tracking-tight leading-tight",
                        col.highlighted ? "text-emerald-400" : "text-white",
                      )}>
                      {col.name}
                    </div>
                    <div className="text-[11px] text-neutral-300 mt-1 font-medium">
                      {col.subtitle}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr
                  key={row.criteria}
                  className={cn(
                    "border-b border-neutral-800/40 hover:bg-white/[0.015] transition-colors",
                    rowIdx === rows.length - 1 && "border-0",
                    rowIdx % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]",
                  )}>
                  {/* Criteria name */}
                  <td className="p-5 text-sm font-semibold text-neutral-300 bg-neutral-950/20">
                    {row.criteria}
                  </td>

                  {/* Cell values */}
                  {row.values.map((val, valIdx) => {
                    const isNoctra = columns[valIdx]?.highlighted;
                    const isCheckmark = val.startsWith("✓");
                    const displayVal = isCheckmark ? val.slice(2) : val;

                    return (
                      <td
                        key={columns[valIdx]?.id ?? valIdx}
                        className={cn(
                          "p-5 text-center border-l border-neutral-800/50",
                          isNoctra ? "bg-emerald-950/20" : "",
                        )}>
                        {isNoctra ? (
                          <div className="flex flex-col items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-emerald-400" />
                            </div>
                            <span className="text-xs font-semibold text-emerald-300 leading-snug max-w-[140px]">
                              {displayVal}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-neutral-400 leading-snug block max-w-[140px] mx-auto">
                            {val}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </m.div>

      {/* Mobile/Tablet Slider */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="block lg:hidden w-full">
        <MobileTableSlider
          columns={columns}
          rows={rows}
          recommendedBadge={recommendedBadge}
          t={t}
        />
      </m.div>
    </LazyMotion>
  );
}
