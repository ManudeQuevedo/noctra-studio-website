import { createClient } from "@/utils/supabase/server";
import { ClientsClient } from "./ClientsClient";
import { getWorkspace } from "@/lib/workspace";
import { redirect } from "next/navigation";

export default async function ForgeClientsPage() {
  const supabase = await createClient();
  const ctx = await getWorkspace();
  if (!ctx) redirect("/forge/login");

  // Source 1: Projects (primary source)
  const { data: projectClients, error: projectsError } = await supabase
    .from("projects")
    .select(
      `
      id,
      name,
      status,
      service_type,
      created_at,
      client_name,
      client_email,
      client_company,
      lead_id,
      contract_id
    `,
    )
    .eq("workspace_id", ctx.workspaceId)
    .not("status", "eq", "cancelled")
    .order("created_at", { ascending: false });

  if (projectsError) {
    console.error("Error fetching projects for clients view:", projectsError);
  }

  // Source 2: Signed contracts without projects yet
  const { data: contractClients, error: contractsError } = await supabase
    .from("contracts")
    .select(
      `
      id,
      contract_number,
      client_name,
      client_email,
      client_company,
      service_type,
      total_price,
      client_signed_at,
      created_at
    `,
    )
    .eq("workspace_id", ctx.workspaceId)
    .eq("signed_by_client", true)
    .eq("status", "signed")
    .is("project_id", null) // Avoid duplicates if project was already created
    .order("created_at", { ascending: false });

  if (contractsError) {
    console.error("Error fetching contracts for clients view:", contractsError);
  }

  // Merge and deduplicate by email
  const mergedClients = new Map();

  // Add project-based clients first (priority)
  (projectClients || []).forEach((project) => {
    const email = project.client_email || `temp-${project.id}`;
    mergedClients.set(email, {
      id: project.id,
      client_name: project.client_name || project.name,
      client_company: project.client_company,
      service_type: project.service_type,
      contract_number: "N/A", // fallback
      total_price: 0, // will be updated if contract found
      client_signed_at: project.created_at,
      project: {
        id: project.id,
        status: project.status,
        name: project.name,
      },
      has_metadata: !!project.client_email,
      is_from_project: true,
    });
  });

  // Add contract-based clients if not already in list or to enrich
  (contractClients || []).forEach((contract) => {
    const email = contract.client_email;
    if (mergedClients.has(email)) {
      // Enrich existing project client with contract data
      const existing = mergedClients.get(email);
      mergedClients.set(email, {
        ...existing,
        contract_id: contract.id,
        contract_number: contract.contract_number,
        total_price: contract.total_price,
        client_signed_at:
          contract.client_signed_at || existing.client_signed_at,
      });
    } else {
      // New client from contract only
      mergedClients.set(email, {
        id: contract.id,
        client_name: contract.client_name,
        client_company: contract.client_company,
        service_type: contract.service_type,
        contract_number: contract.contract_number,
        total_price: contract.total_price,
        client_signed_at: contract.client_signed_at,
        has_metadata: true,
        is_from_contract_only: true,
      });
    }
  });

  const finalClients = Array.from(mergedClients.values());

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ClientsClient initialClients={finalClients} />
    </div>
  );
}
