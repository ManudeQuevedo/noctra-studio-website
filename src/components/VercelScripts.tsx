"use client";

import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { getStoredConsent } from "@/lib/cookie-utils";

/**
 * VercelScripts Component
 * Conditionally renders Vercel Analytics and Speed Insights based on user consent.
 */
export function VercelScripts() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check initial consent
    const consent = getStoredConsent();
    if (consent?.analytics) {
      setHasConsent(true);
    }

    // Listen for consent updates
    const handleConsentUpdate = (event: any) => {
      if (event.detail?.analytics) {
        setHasConsent(true);
      } else {
        setHasConsent(false);
      }
    };

    window.addEventListener("cookieConsentUpdated", handleConsentUpdate);
    return () => {
      window.removeEventListener("cookieConsentUpdated", handleConsentUpdate);
    };
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
