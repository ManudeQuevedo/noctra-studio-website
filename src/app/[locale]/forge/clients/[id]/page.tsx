import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ClientDetailClient } from "./ClientDetailClient";

export default async function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // 1. Fetch main contract
  const { data: contract, error: contractError } = await supabase
    .from("contracts")
    .select(
      `
      *,
      proposal:proposals(*)
    `,
    )
    .eq("id", params.id)
    .single();

  if (contractError || !contract) {
    notFound();
  }

  // 2. Fetch project (linked via client email)
  const { data: project } = await supabase
    .from("projects")
    .select("*, profiles!inner(email)")
    .eq("profiles.email", contract.client_email)
    .single();

  // 3. Prepare data for the client component
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ClientDetailClient contract={contract} project={project} />
    </div>
  );
}
