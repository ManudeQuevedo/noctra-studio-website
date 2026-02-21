import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const getWorkspace = cache(async () => {
  console.log('[getWorkspace] starting...')
  
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

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  console.log('[getWorkspace] user:', user?.id, 
              'error:', userError?.message)
  
  if (!user) {
    console.log('[getWorkspace] no user, returning null')
    return null
  }

  const { data: membership, error: membershipError } = await supabase
    .from('workspace_members')
    .select(`
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
    `)
    .eq('user_id', user.id)
    .single()

  console.log('[getWorkspace] membership:', 
              JSON.stringify(membership),
              'error:', membershipError?.message,
              'code:', membershipError?.code)

  if (!membership) {
    console.log('[getWorkspace] no membership, returning null')
    return null
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
