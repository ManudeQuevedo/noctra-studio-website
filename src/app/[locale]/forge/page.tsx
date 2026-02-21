import { createClient } from "@/utils/supabase/server";
import DashboardClient from "./DashboardClient";
import { getRevenueForecast } from "@/app/actions/metrics";

export default async function ForgeIndexPage() {
  const supabase = await createClient();

  // Fetch all basic objects to power the dashboard metrics
  // Using Promise.all for parallel fetching
  const [
    { data: leads },
    { data: proposals },
    { data: contracts },
    { data: projects },
  ] = await Promise.all([
    supabase.from("contact_submissions").select("*"),
    supabase.from("proposals").select("*"),
    supabase.from("contracts").select("*"),
    supabase.from("projects").select("*"),
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
