-- ============================================
-- HARDEN WORKSPACE RLS & PUBLIC TOKEN FLOWS
-- Migration: 20260307121500_harden_workspace_rls.sql
-- ============================================

CREATE OR REPLACE FUNCTION public.user_has_workspace_access(target_workspace_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.workspace_members wm
    WHERE wm.workspace_id = target_workspace_id
      AND wm.user_id = auth.uid()
  )
  OR EXISTS (
    SELECT 1
    FROM public.workspaces w
    WHERE w.id = target_workspace_id
      AND w.owner_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.user_is_workspace_admin(target_workspace_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.workspace_members wm
    WHERE wm.workspace_id = target_workspace_id
      AND wm.user_id = auth.uid()
      AND wm.role IN ('owner', 'admin')
  )
  OR EXISTS (
    SELECT 1
    FROM public.workspaces w
    WHERE w.id = target_workspace_id
      AND w.owner_id = auth.uid()
  );
$$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'proposals'
      AND column_name = 'workspace_id'
  ) THEN
    ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins can manage proposals" ON public.proposals;
    DROP POLICY IF EXISTS "Authenticated can manage proposals" ON public.proposals;
    DROP POLICY IF EXISTS "Authenticated full access to proposals" ON public.proposals;
    DROP POLICY IF EXISTS "Public can read proposals by token" ON public.proposals;
    DROP POLICY IF EXISTS "Public can view proposals via token" ON public.proposals;
    DROP POLICY IF EXISTS "Public read proposals by token" ON public.proposals;
    CREATE POLICY "Workspace members can manage proposals"
    ON public.proposals
    FOR ALL
    TO authenticated
    USING (public.user_has_workspace_access(workspace_id))
    WITH CHECK (public.user_has_workspace_access(workspace_id));
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'contracts'
      AND column_name = 'workspace_id'
  ) THEN
    ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins can manage contracts" ON public.contracts;
    DROP POLICY IF EXISTS "Authenticated can manage contracts" ON public.contracts;
    DROP POLICY IF EXISTS "Authenticated full access to contracts" ON public.contracts;
    DROP POLICY IF EXISTS "Public can read contracts by token" ON public.contracts;
    DROP POLICY IF EXISTS "Public can view contracts via token" ON public.contracts;
    DROP POLICY IF EXISTS "Public read contracts by token" ON public.contracts;
    CREATE POLICY "Workspace members can manage contracts"
    ON public.contracts
    FOR ALL
    TO authenticated
    USING (public.user_has_workspace_access(workspace_id))
    WITH CHECK (public.user_has_workspace_access(workspace_id));
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'contact_submissions'
      AND column_name = 'workspace_id'
  ) THEN
    ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins can manage leads" ON public.contact_submissions;
    DROP POLICY IF EXISTS "Authenticated manage contact_submissions" ON public.contact_submissions;
    DROP POLICY IF EXISTS "Authenticated full access to contact_submissions" ON public.contact_submissions;
    CREATE POLICY "Workspace members can manage contact submissions"
    ON public.contact_submissions
    FOR ALL
    TO authenticated
    USING (public.user_has_workspace_access(workspace_id))
    WITH CHECK (public.user_has_workspace_access(workspace_id));
    DROP POLICY IF EXISTS "Public can submit contact form" ON public.contact_submissions;
    CREATE POLICY "Public can submit contact form"
    ON public.contact_submissions
    FOR INSERT
    TO anon
    WITH CHECK (workspace_id IS NOT NULL);
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'lead_activities'
  ) THEN
    ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins can manage lead activities" ON public.lead_activities;
    DROP POLICY IF EXISTS "Authenticated manage lead_activities" ON public.lead_activities;
    DROP POLICY IF EXISTS "Authenticated full access to lead_activities" ON public.lead_activities;
    CREATE POLICY "Workspace members can manage lead activities"
    ON public.lead_activities
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM public.contact_submissions cs
        WHERE cs.id = lead_activities.lead_id
          AND public.user_has_workspace_access(cs.workspace_id)
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1
        FROM public.contact_submissions cs
        WHERE cs.id = lead_activities.lead_id
          AND public.user_has_workspace_access(cs.workspace_id)
      )
    );
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'projects'
      AND column_name = 'workspace_id'
  ) THEN
    ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins can all projects" ON public.projects;
    DROP POLICY IF EXISTS "Public can view project report via token" ON public.projects;
    CREATE POLICY "Workspace members can manage projects"
    ON public.projects
    FOR ALL
    TO authenticated
    USING (public.user_has_workspace_access(workspace_id))
    WITH CHECK (public.user_has_workspace_access(workspace_id));
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'project_tasks'
  ) THEN
    ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Authenticated manage project_tasks" ON public.project_tasks;
    DROP POLICY IF EXISTS "Authenticated full access to project_tasks" ON public.project_tasks;
    DROP POLICY IF EXISTS "Public can view tasks via project report token" ON public.project_tasks;
    CREATE POLICY "Workspace members can manage project tasks"
    ON public.project_tasks
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM public.projects p
        WHERE p.id = project_tasks.project_id
          AND public.user_has_workspace_access(p.workspace_id)
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1
        FROM public.projects p
        WHERE p.id = project_tasks.project_id
          AND public.user_has_workspace_access(p.workspace_id)
      )
    );
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'project_time_logs'
  ) THEN
    ALTER TABLE public.project_time_logs ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Authenticated manage project_time_logs" ON public.project_time_logs;
    DROP POLICY IF EXISTS "Authenticated full access to project_time_logs" ON public.project_time_logs;
    CREATE POLICY "Workspace members can manage project time logs"
    ON public.project_time_logs
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM public.projects p
        WHERE p.id = project_time_logs.project_id
          AND public.user_has_workspace_access(p.workspace_id)
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1
        FROM public.projects p
        WHERE p.id = project_time_logs.project_id
          AND public.user_has_workspace_access(p.workspace_id)
      )
    );
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'project_expenses'
  ) THEN
    ALTER TABLE public.project_expenses ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Authenticated manage project_expenses" ON public.project_expenses;
    DROP POLICY IF EXISTS "Authenticated full access to project_expenses" ON public.project_expenses;
    CREATE POLICY "Workspace members can manage project expenses"
    ON public.project_expenses
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM public.projects p
        WHERE p.id = project_expenses.project_id
          AND public.user_has_workspace_access(p.workspace_id)
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1
        FROM public.projects p
        WHERE p.id = project_expenses.project_id
          AND public.user_has_workspace_access(p.workspace_id)
      )
    );
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'project_deliverables'
  ) THEN
    ALTER TABLE public.project_deliverables ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Full access for authenticated users" ON public.project_deliverables;
    DROP POLICY IF EXISTS "Authenticated manage project_deliverables" ON public.project_deliverables;
    DROP POLICY IF EXISTS "Authenticated full access to project_deliverables" ON public.project_deliverables;
    DROP POLICY IF EXISTS "Read access for clients via token" ON public.project_deliverables;
    DROP POLICY IF EXISTS "Update access for clients via token" ON public.project_deliverables;
    DROP POLICY IF EXISTS "Public read deliverables by token" ON public.project_deliverables;
    DROP POLICY IF EXISTS "Public can view deliverables via project report token" ON public.project_deliverables;
    CREATE POLICY "Workspace members can manage project deliverables"
    ON public.project_deliverables
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM public.projects p
        WHERE p.id = project_deliverables.project_id
          AND public.user_has_workspace_access(p.workspace_id)
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1
        FROM public.projects p
        WHERE p.id = project_deliverables.project_id
          AND public.user_has_workspace_access(p.workspace_id)
      )
    );
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'deliverable_items'
      AND column_name = 'deliverable_id'
  ) THEN
    ALTER TABLE public.deliverable_items ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Authenticated manage deliverable_items" ON public.deliverable_items;
    DROP POLICY IF EXISTS "Authenticated full access to deliverable_items" ON public.deliverable_items;
    CREATE POLICY "Workspace members can manage deliverable items"
    ON public.deliverable_items
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM public.project_deliverables pd
        JOIN public.projects p ON p.id = pd.project_id
        WHERE pd.id = deliverable_items.deliverable_id
          AND public.user_has_workspace_access(p.workspace_id)
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1
        FROM public.project_deliverables pd
        JOIN public.projects p ON p.id = pd.project_id
        WHERE pd.id = deliverable_items.deliverable_id
          AND public.user_has_workspace_access(p.workspace_id)
      )
    );
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'document_envelopes'
      AND column_name = 'organization_id'
  ) THEN
    ALTER TABLE public.document_envelopes ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Users can view envelopes in their organization" ON public.document_envelopes;
    DROP POLICY IF EXISTS "Users can insert envelopes in their organization" ON public.document_envelopes;
    DROP POLICY IF EXISTS "Users can update envelopes in their organization" ON public.document_envelopes;
    DROP POLICY IF EXISTS "Public can view envelope via hash token" ON public.document_envelopes;
    DROP POLICY IF EXISTS "Public can update envelope via hash token" ON public.document_envelopes;
    CREATE POLICY "Workspace members can manage document envelopes"
    ON public.document_envelopes
    FOR ALL
    TO authenticated
    USING (public.user_has_workspace_access(organization_id))
    WITH CHECK (public.user_has_workspace_access(organization_id));
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'document_signatures'
  ) THEN
    ALTER TABLE public.document_signatures ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Users can view signatures in their organization" ON public.document_signatures;
    DROP POLICY IF EXISTS "Public can insert signature" ON public.document_signatures;
    CREATE POLICY "Workspace members can view document signatures"
    ON public.document_signatures
    FOR SELECT
    TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM public.document_envelopes de
        WHERE de.id = document_signatures.envelope_id
          AND public.user_has_workspace_access(de.organization_id)
      )
    );
  END IF;
END $$;
