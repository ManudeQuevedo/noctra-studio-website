export type LeadScoreBreakdown = {
  serviceIntent: number;
  messageQuality: number;
  dataCompleteness: number;
  sourceCta: number;
  responseTime: number;
};

export type LeadScoreResult = {
  score: number;
  label: "HOT" | "WARM" | "COOL" | "COLD";
  color: string;
  breakdown: LeadScoreBreakdown;
};

export function calculateLeadScore(lead: any): LeadScoreResult {
  const breakdown: LeadScoreBreakdown = {
    serviceIntent: 0,
    messageQuality: 0,
    dataCompleteness: 0,
    sourceCta: 0,
    responseTime: 0,
  };

  // 1. SERVICE INTENT (30 points max)
  const serviceScores: Record<string, number> = {
    custom_system: 30,
    ecommerce: 25,
    web_presence: 20,
    discovery_call: 15,
    general: 10,
  };
  breakdown.serviceIntent = serviceScores[lead.service_interest] || serviceScores[lead.intent] || 0;

  // 2. MESSAGE QUALITY (20 points max)
  const message = lead.message || lead.details || "";
  const msgLen = message.length;
  if (msgLen > 200) breakdown.messageQuality = 20;
  else if (msgLen >= 100) breakdown.messageQuality = 10;
  else if (msgLen >= 50) breakdown.messageQuality = 5;

  // 3. CONTACT COMPLETENESS (20 points max)
  if (lead.phone) breakdown.dataCompleteness += 10;
  if (lead.company_name) breakdown.dataCompleteness += 10;

  // 4. SOURCE CTA (15 points max)
  const highIntentCTAs = ["Iniciar proyecto", "Agendar llamada", "Start Project", "Book a Call"];
  const mediumIntentCTAs = ["Saber más", "Learn More", "Precios", "Pricing", "Cotizar"];
  
  const cta = lead.source_cta || lead.cta || "";
  if (highIntentCTAs.some(t => cta.includes(t))) breakdown.sourceCta = 15;
  else if (mediumIntentCTAs.some(t => cta.includes(t))) breakdown.sourceCta = 10;
  else breakdown.sourceCta = 5;

  // 5. RESPONSE TIME BONUS (15 points max)
  // Logic: Recalculate when pipeline_status changes from 'nuevo'
  // If the lead is no longer 'nuevo', we calculate based on how long it took to move it
  if (lead.pipeline_status !== 'nuevo' && lead.created_at) {
    // If we have a specific 'contacted_at', use it. 
    // Otherwise fallback to updated_at or current time if it just changed.
    const start = new Date(lead.created_at).getTime();
    const end = new Date(lead.contacted_at || lead.updated_at || new Date()).getTime();
    const diffHours = (end - start) / (1000 * 60 * 60);

    if (diffHours <= 1) breakdown.responseTime = 15;
    else if (diffHours <= 24) breakdown.responseTime = 10;
    else if (diffHours <= 48) breakdown.responseTime = 5;
  }

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

  let label: "HOT" | "WARM" | "COOL" | "COLD" = "COLD";
  let color = "bg-neutral-500";

  if (total >= 80) {
    label = "HOT";
    color = "bg-emerald-500";
  } else if (total >= 60) {
    label = "WARM";
    color = "bg-yellow-500";
  } else if (total >= 40) {
    label = "COOL";
    color = "bg-orange-500";
  }

  return {
    score: total,
    label,
    color,
    breakdown,
  };
}
