import { createClient } from "@/utils/supabase/server";
import DashboardClient from "./DashboardClient";
import { getRevenueForecast } from "@/app/actions/metrics";
import { getWorkspace } from "@/lib/workspace";
import { redirect } from "next/navigation";

export default async function ForgeIndexPage() {
  const supabase = await createClient();
  const ctx = await getWorkspace();

  if (!ctx) redirect("/forge/login");

  // Fetch all basic objects to power the dashboard metrics
  // Using Promise.all for parallel fetching
  const [
    { data: leads },
    { data: proposals },
    { data: contracts },
    { data: projects },
  ] = await Promise.all([
    supabase
      .from("contact_submissions")
      .select("*")
      .eq("workspace_id", ctx.workspaceId),
    supabase.from("proposals").select("*").eq("workspace_id", ctx.workspaceId),
    supabase.from("contracts").select("*").eq("workspace_id", ctx.workspaceId),
    supabase.from("projects").select("*").eq("workspace_id", ctx.workspaceId),
  ]);

  const forecast = await getRevenueForecast();

  return (
    <DashboardClient
      leads={leads || []}
      proposals={proposals || []}
      contracts={contracts || []}
      projects={projects || []}
      forecast={forecast}
    />
  );
}
