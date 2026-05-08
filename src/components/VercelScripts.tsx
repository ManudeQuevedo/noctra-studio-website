"use client";

import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getStoredConsent } from "@/lib/cookie-utils";

/**
 * VercelScripts Component
 * Conditionally renders Analytics (Vercel & Google) and Speed Insights based on user consent.
 */
export function VercelScripts() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const handleConsentUpdate = (event: any) => {
      if (event.detail?.analytics) {
        setHasConsent(true);
      } else {
        setHasConsent(false);
      }
    };

    const timer = setTimeout(() => {
      // Check initial consent
      const consent = getStoredConsent();
      if (consent?.analytics) {
        setHasConsent(true);
      }

      // Listen for consent updates
      window.addEventListener("cookieConsentUpdated", handleConsentUpdate);
    }, 3000); // Defer by 3 seconds for TBT reduction

    return () => {
      clearTimeout(timer);
      window.removeEventListener("cookieConsentUpdated", handleConsentUpdate);
    };
  }, []);

  if (!hasConsent) return null;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      <SpeedInsights />
      <Analytics />
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
}
