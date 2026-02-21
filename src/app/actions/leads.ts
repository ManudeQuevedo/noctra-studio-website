"use server";

import { createClient } from "@/utils/supabase/server";
import { calculateLeadScore } from "@/lib/scoring";

export async function recalculateLeadScoreAction(leadId: string) {
  const supabase = await createClient();

  const { data: lead, error: fetchError } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("id", leadId)
    .single();

  if (fetchError || !lead) {
    throw new Error("Lead not found");
  }

  const { score, breakdown } = calculateLeadScore(lead);

  const { error: updateError } = await supabase
    .from("contact_submissions")
    .update({
      lead_score: score,
      lead_score_breakdown: breakdown,
      updated_at: new Date().toISOString()
    })
    .eq("id", leadId);

  if (updateError) throw updateError;

  return { score, breakdown };
}

export async function updateLeadStatusWithScoring(leadId: string, status: string, lostReasonText?: string) {
  const supabase = await createClient();

  try {
    const updates: any = { 
      pipeline_status: status,
      updated_at: new Date().toISOString()
    };
    
    if (status === "cerrado") updates.closed_at = new Date().toISOString();
    if (status === "perdido" && lostReasonText) updates.lost_reason = lostReasonText;
    
    // If moving out of 'nuevo' for the first time, record contacted_at
    if (status !== 'nuevo') {
      const { data: currentLead } = await supabase.from('contact_submissions').select('pipeline_status, contacted_at').eq('id', leadId).single();
      if (currentLead && currentLead.pipeline_status === 'nuevo' && !currentLead.contacted_at) {
          updates.contacted_at = new Date().toISOString();
      }
    }

    // Update status
    const { error: statusError } = await supabase
      .from("contact_submissions")
      .update(updates)
      .eq("id", leadId);

    if (statusError) throw statusError;

    // Recalculate score after status update
    const { data: updatedLead } = await supabase
      .from("contact_submissions")
      .select("*")
      .eq("id", leadId)
      .single();

    if (updatedLead) {
      const { score, breakdown } = calculateLeadScore(updatedLead);
      await supabase
        .from("contact_submissions")
        .update({
          lead_score: score,
          lead_score_breakdown: breakdown
        })
        .eq("id", leadId);
    }

    return { success: true };
  } catch (err: any) {
    console.error("Error in updateLeadStatusWithScoring:", err);
    return { success: false, error: err.message || String(err) };
  }
}
