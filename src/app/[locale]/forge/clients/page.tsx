import { createClient } from "@/utils/supabase/server";
import { ClientsClient } from "./ClientsClient";

export default async function ForgeClientsPage() {
  const supabase = await createClient();

  // Fetch signed contracts and attempt to join with projects
  // Since we don't have a direct FK in contracts to projects (projects has client_id -> profile.id)
  // we'll need to be clever or fetch separately.
  // Actually, we can fetch projects that have a client_email match or something similar.
  // For now, let's fetch signed contracts and then fetch projects for those client emails.

  const { data: contracts, error: contractsError } = await supabase
    .from("contracts")
    .select(
      `
      id,
      client_name,
      client_company,
      client_email,
      service_type,
      contract_number,
      total_price,
      client_signed_at
    `,
    )
    .eq("signed_by_client", true)
    .eq("status", "signed")
    .order("client_signed_at", { ascending: false });

  if (contractsError) {
    console.error("Error fetching contracts for clients view:", contractsError);
  }

  // Fetch all projects to map them by client email (approximate link)
  const { data: projects } = await supabase
    .from("projects")
    .select("client_id, name, status, profiles!inner(email)");

  // Map projects to contracts by email
  const clientsWithProjects = (contracts || []).map((contract) => {
    const project = projects?.find(
      (p) => (p.profiles as any).email === contract.client_email,
    );
    return {
      ...contract,
      project: project
        ? {
            status: project.status,
            name: project.name,
          }
        : undefined,
    };
  });

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ClientsClient initialClients={clientsWithProjects} />
    </div>
  );
}
