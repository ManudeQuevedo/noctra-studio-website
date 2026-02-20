import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ForgeLeadsClient from "./ForgeLeadsClient";

export const dynamic = "force-dynamic";

export default async function ForgeLeadsPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/forge/login");
  }

  const { data: leads, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch leads:", error);
  }

  return <ForgeLeadsClient initialLeads={leads || []} />;
}
