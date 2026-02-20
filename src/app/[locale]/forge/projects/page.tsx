import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ForgeProjectsClient from "./ForgeProjectsClient";
import type { Project } from "@/lib/projects";

// Ensure this page is not statically cached
export const dynamic = "force-dynamic";

export default async function ForgeProjectsPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/forge/login");
  }

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch projects:", error);
  }

  return (
    <ForgeProjectsClient initialProjects={(projects as Project[]) || []} />
  );
}
