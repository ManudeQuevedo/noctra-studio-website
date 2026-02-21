import { getWorkspace } from "@/lib/workspace";
import { redirect } from "next/navigation";
import ForgeLayoutClient from "./ForgeLayoutClient";

export default async function ForgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let ctx = null;

  try {
    ctx = await getWorkspace();
  } catch (error) {
    console.error("[ForgeLayout] getWorkspace error:", error);
  }

  console.log(
    "[ForgeLayout] ctx:",
    ctx ? `workspace=${ctx.workspaceId}` : "NULL",
  );

  if (!ctx) {
    console.log(
      "[ForgeLayout] rendering without workspace ctx (security bypass enabled for debug)",
    );
  }

  return (
    <ForgeLayoutClient workspace={ctx?.workspace ?? null}>
      {children}
    </ForgeLayoutClient>
  );
}
