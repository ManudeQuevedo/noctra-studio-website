"use client";

/**
 * Cookie Consent Utils
 * Handles persistence, expiration, DNT signals, and script injection.
 */

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: string;
}

export const CONSENT_KEY = 'noctra_cookie_consent';
export const CONSENT_VERSION = '1.0';
export const CONSENT_DURATION = 365 * 24 * 60 * 60 * 1000; // 365 days

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: any;
    _fbq: any;
  }
}

/**
 * Checks if the user has enabled "Do Not Track" in their browser.
 */
export function shouldRespectDNT(): boolean {
  if (typeof navigator === 'undefined') return false;
  // @ts-ignore - DNT is not in standard navigator types
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  return dnt === '1' || dnt === 'yes';
}

/**
 * Gets the stored consent from localStorage.
 */
export function getStoredConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Checks if the consent is expired or from an older version.
 */
export function isConsentExpired(consent: CookieConsent): boolean {
  const now = Date.now();
  const age = now - consent.timestamp;
  return age > CONSENT_DURATION || consent.version !== CONSENT_VERSION;
}

/**
 * Saves consent to localStorage and dispatches a global event.
 */
export function saveConsent(consent: Omit<CookieConsent, 'timestamp' | 'version'>) {
  const fullConsent: CookieConsent = {
    ...consent,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };
  
  localStorage.setItem(CONSENT_KEY, JSON.stringify(fullConsent));
  
  // Dispatch custom event for real-time reactivity in the app
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { 
      detail: fullConsent 
    }));
    
    // Trigger script loading/blocking
    manageScripts(fullConsent);
  }
}

/**
 * Manages the loading or blocking of scripts based on consent.
 */
export function manageScripts(consent: CookieConsent) {
  if (typeof window === 'undefined') return;

  // Respect DNT - if on, don't load tracking scripts regardless of consent
  if (shouldRespectDNT()) {
    console.log('Noctra: Respecting Do Not Track signal.');
    return;
  }

  // Analytics
  if (consent.analytics) {
    loadGoogleAnalytics();
    loadPlausible();
  }

  // Marketing
  if (consent.marketing) {
    loadFacebookPixel();
  }
}

// --- Script Loaders ---

function loadGoogleAnalytics() {
  const GA_ID = 'G-PY2G1X6V9D'; // Example ID, replace with real one
  if (document.querySelector('[data-ga-loaded]')) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.setAttribute('data-ga-loaded', 'true');
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments as any);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

function loadPlausible() {
  if (document.querySelector('[data-plausible-loaded]')) return;

  const script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-domain', 'noctra.studio');
  script.src = 'https://plausible.io/js/script.js';
  script.setAttribute('data-plausible-loaded', 'true');
  document.head.appendChild(script);
}

function loadFacebookPixel() {
  const FB_PIXEL_ID = 'XXXXXXXXXX'; // Replace with real one
  if (document.querySelector('[data-fb-loaded]')) return;

  // @ts-ignore
  !(function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    if (s && s.parentNode) s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');
  
  const fbScript = document.querySelector('script[src*="fbevents.js"]');
  if (fbScript) fbScript.setAttribute('data-fb-loaded', 'true');
}
