import { createClient } from "@/utils/supabase/server";

type WorkspaceRole = string | null;

export async function getWorkspaceAccess(workspaceId: string): Promise<{
  supabase: Awaited<ReturnType<typeof createClient>>;
  userId: string | null;
  role: WorkspaceRole;
  hasAccess: boolean;
  isPrivileged: boolean;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      supabase,
      userId: null,
      role: null,
      hasAccess: false,
      isPrivileged: false,
    };
  }

  const { data: membership } = await supabase
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (membership?.role) {
    return {
      supabase,
      userId: user.id,
      role: membership.role,
      hasAccess: true,
      isPrivileged: ["owner", "admin"].includes(membership.role),
    };
  }

  const { data: ownedWorkspace } = await supabase
    .from("workspaces")
    .select("id")
    .eq("id", workspaceId)
    .eq("owner_id", user.id)
    .maybeSingle();

  const isOwner = Boolean(ownedWorkspace);

  return {
    supabase,
    userId: user.id,
    role: isOwner ? "owner" : null,
    hasAccess: isOwner,
    isPrivileged: isOwner,
  };
}
