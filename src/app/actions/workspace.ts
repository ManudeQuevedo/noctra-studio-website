"use server";

import { createClient } from "@/utils/supabase/server";
import { getWorkspace } from "@/lib/workspace";
import { revalidatePath } from "next/cache";

export async function updateWorkspaceAction(data: {
  name: string;
  logo_url: string;
  email: string;
  website_url: string;
  primary_color: string;
}) {
  const supabase = await createClient();
  const ctx = await getWorkspace();

  if (!ctx) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("workspaces")
    .update({
      name: data.name,
      logo_url: data.logo_url || null,
      email: data.email || null,
      website_url: data.website_url || null,
      primary_color: data.primary_color,
    })
    .eq("id", ctx.workspaceId);

  if (error) throw error;

  revalidatePath("/forge");
  revalidatePath("/forge/settings");
  return { success: true };
}

export async function updateWorkspaceConfigAction(data: {
  serviceTypes: string[];
  pipelineStages: string[];
}) {
  const supabase = await createClient();
  const ctx = await getWorkspace();

  if (!ctx) throw new Error("Unauthorized");

  // Note: This logic assumes workspace_config table has a workspace_id unique constraint
  // or that we're updating by workspace_id.
  const { error } = await supabase
    .from("workspace_config")
    .update({
      service_types: data.serviceTypes,
      pipeline_stages: data.pipelineStages,
      updated_at: new Date().toISOString()
    })
    .eq("workspace_id", ctx.workspaceId);

  if (error) throw error;

  revalidatePath("/forge");
  revalidatePath("/forge/settings");
  return { success: true };
}
