import { createClient } from "@/utils/supabase/server";
import PipelineClient from "./PipelineClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PipelinePage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/forge/login");
  }

  // Fetch leads with all pipeline metadata
  const { data: leads, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching leads:", error);
    return (
      <div className="p-10 text-red-500 font-mono text-[10px] uppercase tracking-widest bg-black min-h-screen">
        Error loading pipeline: {error.message}
      </div>
    );
  }

  return <PipelineClient initialLeads={leads || []} />;
}
