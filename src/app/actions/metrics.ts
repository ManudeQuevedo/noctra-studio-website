"use server";

import { createClient } from "@/utils/supabase/server";
import { startOfMonth, endOfMonth, subMonths, format, isWithinInterval } from "date-fns";

export type ForecastItem = {
  id: string;
  clientName: string;
  type: string;
  amount: number;
  probability: number;
  contribution: number;
  status: string;
};

export type RevenueForecast = {
  month: string;
  total: number;
  confirmed: number;
  probable: number;
  possible: number;
  items: ForecastItem[];
};

export async function getRevenueForecast(monthDate: Date = new Date()): Promise<RevenueForecast> {
  const supabase = await createClient();
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);

  // 1. Confirmed Revenue (100%): Signed contracts this month
  const { data: signedContracts } = await supabase
    .from("contracts")
    .select("id, client_name, total_price, client_signed_at")
    .eq("client_signed", true)
    .gte("client_signed_at", start.toISOString())
    .lte("client_signed_at", end.toISOString());

  const confirmedItems: ForecastItem[] = (signedContracts || []).map(c => ({
    id: c.id,
    clientName: c.client_name,
    type: "Contrato firmado",
    amount: c.total_price,
    probability: 100,
    contribution: c.total_price,
    status: "signed"
  }));

  const confirmedTotal = confirmedItems.reduce((acc, i) => acc + i.contribution, 0);

  // 2. Probable (60%): Proposals viewed
  const { data: viewedProposals } = await supabase
    .from("proposals")
    .select("id, total, status, lead_id, contact_submissions(name)")
    .eq("status", "viewed");

  const probableItems: ForecastItem[] = (viewedProposals || []).map((p: any) => ({
    id: p.id,
    clientName: p.contact_submissions?.name || "Cliente desconocido",
    type: "Propuesta vista",
    amount: p.total,
    probability: 60,
    contribution: p.total * 0.6,
    status: "viewed"
  }));

  const probableTotal = probableItems.reduce((acc, i) => acc + i.contribution, 0);

  // 3. Possible (25%): Proposals sent (not viewed) + Leads in 'propuesta_enviada'
  // Strategy: Get proposals with status 'sent'
  const { data: sentProposals } = await supabase
    .from("proposals")
    .select("id, total, status, lead_id, contact_submissions(name)")
    .eq("status", "sent");

  // Get leads in 'propuesta_enviada' that DON'T have a proposal records yet
  // We'll filter them by checking if the request_id is in any of the above
  const proposalLeadIds = new Set([
    ...(viewedProposals || []).map((p: any) => p.lead_id),
    ...(sentProposals || []).map((p: any) => p.lead_id)
  ]);

  const { data: leadsInStage } = await supabase
    .from("contact_submissions")
    .select("id, name, estimated_value")
    .eq("pipeline_status", "propuesta_enviada");

  const possibleItems: ForecastItem[] = [
    ...(sentProposals || []).map((p: any) => ({
      id: p.id,
      clientName: p.contact_submissions?.name || "Cliente desconocido",
      type: "Propuesta enviada",
      amount: p.total,
      probability: 25,
      contribution: p.total * 0.25,
      status: "sent"
    })),
    ...(leadsInStage || [])
      .filter(l => !proposalLeadIds.has(l.id))
      .map(l => ({
        id: l.id,
        clientName: l.name,
        type: "Lead en propuesta",
        amount: l.estimated_value || 0,
        probability: 25,
        contribution: (l.estimated_value || 0) * 0.25,
        status: "lead"
      }))
  ];

  const possibleTotal = possibleItems.reduce((acc, i) => acc + i.contribution, 0);

  return {
    month: format(monthDate, "MMMM yyyy"),
    total: confirmedTotal + probableTotal + possibleTotal,
    confirmed: confirmedTotal,
    probable: probableTotal,
    possible: possibleTotal,
    items: [...confirmedItems, ...probableItems, ...possibleItems]
  };
}

export async function getRevenueTrend() {
  const supabase = await createClient();
  const months = Array.from({ length: 6 }).map((_, i) => subMonths(new Date(), 5 - i));

  const trend = await Promise.all(months.map(async (m) => {
    const start = startOfMonth(m);
    const end = endOfMonth(m);
    const isCurrentOrFuture = m >= startOfMonth(new Date());

    if (isCurrentOrFuture) {
      const forecast = await getRevenueForecast(m);
      return {
        label: format(m, "MMM"),
        amount: forecast.total,
        isForecast: true
      };
    } else {
      // Historical: Only confirmed revenue
      const { data: signedInRange } = await supabase
        .from("contracts")
        .select("total_price")
        .eq("client_signed", true)
        .gte("client_signed_at", start.toISOString())
        .lte("client_signed_at", end.toISOString());

      const total = (signedInRange || []).reduce((acc, c) => acc + c.total_price, 0);
      return {
        label: format(m, "MMM"),
        amount: total,
        isForecast: false
      };
    }
  }));

  return trend;
}
