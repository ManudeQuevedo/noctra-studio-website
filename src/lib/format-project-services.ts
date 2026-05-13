/** Canonical values stored in DB (see migration / Studio). Display short labels on cards. */
const SERVICE_DISPLAY_SHORT: Record<string, string> = {
  Branding: "Branding",
  "Web Development": "Web",
  SEO: "SEO",
  "Social Media": "Social",
  Automation: "Automation",
  CRO: "CRO",
};

export function formatServicesDeliveredLine(
  services: string[] | null | undefined,
): string | null {
  if (!services?.length) return null;
  return services
    .map((s) => SERVICE_DISPLAY_SHORT[s] ?? s)
    .filter(Boolean)
    .join(" · ");
}
