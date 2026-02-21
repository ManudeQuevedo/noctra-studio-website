import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const getWorkspace = cache(async () => {
  
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: membership } = await supabase
    .from("workspace_members")
    .select(
      `
      workspace_id,
      role,
      workspaces (
        id,
        slug,
        name,
        logo_url,
        primary_color,
        email,
        currency,
        country
      )
    `,
    )
    .eq("user_id", user.id)
    .single();

  if (!membership) {
    return null;
  }

  return {
    workspaceId: membership.workspace_id,
    role: membership.role,
    workspace: (membership as any).workspaces,
  }
})

export type WorkspaceContext = NonNullable<
  Awaited<ReturnType<typeof getWorkspace>>
>
