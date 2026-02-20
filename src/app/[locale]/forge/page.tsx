import { redirect } from "next/navigation";

export default async function ForgeIndexPage() {
  redirect("/forge/pipeline");
}
