import { getWorkspace } from "@/lib/workspace";
import { redirect } from "next/navigation";
import ForgeLayoutClient from "./ForgeLayoutClient";

export default async function ForgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await getWorkspace();

  // Note: We don't redirect here if it's the login page,
  // but getWorkspace returns null if no user is found,
  // and the client layout handles the isLoginPage check.
  // HOWEVER, for security, if someone tries to access a non-login forge page
  // without a workspace membership, we should redirect.

  return (
    <ForgeLayoutClient workspace={ctx?.workspace}>{children}</ForgeLayoutClient>
  );
}
