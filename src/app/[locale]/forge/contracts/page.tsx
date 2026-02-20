import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ContractsClient from "./ContractsClient";

export const dynamic = "force-dynamic";

export default async function ContractsPage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/forge/login");
  }

  const { data: contracts, error } = await supabase
    .from("contracts")
    .select(
      `
      *,
      proposal:proposals(proposal_number)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contracts:", error);
  }

  return <ContractsClient initialContracts={contracts || []} />;
}
