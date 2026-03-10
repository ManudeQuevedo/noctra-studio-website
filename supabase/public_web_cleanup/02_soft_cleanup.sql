-- Non-destructive cleanup for CRM/backoffice objects not required by the public website.
-- Safe from a data-loss perspective, but it will break CRM/product flows that still expect these policies/triggers.

BEGIN;

-- Tight timeouts so this script fails fast instead of waiting on long locks.
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';

-- 1) Drop RLS policies on clearly removable CRM tables.
DO $$
BEGIN
  IF to_regclass('public.prospects') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Admins can manage prospects" ON public.prospects';
  END IF;

  IF to_regclass('public.proposals') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Admins can manage proposals" ON public.proposals';
    EXECUTE 'DROP POLICY IF EXISTS "Authenticated full access to proposals" ON public.proposals';
    EXECUTE 'DROP POLICY IF EXISTS "Workspace members can manage proposals" ON public.proposals';
    EXECUTE 'DROP POLICY IF EXISTS "Public can view proposals via token" ON public.proposals';
    EXECUTE 'DROP POLICY IF EXISTS "Public can read proposals by token" ON public.proposals';
    EXECUTE 'DROP POLICY IF EXISTS "Public read proposals by token" ON public.proposals';
  END IF;

  IF to_regclass('public.proposal_items') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Admins can manage proposal_items" ON public.proposal_items';
  END IF;

  IF to_regclass('public.proposal_signatures') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Admins can view signatures" ON public.proposal_signatures';
  END IF;

  IF to_regclass('public.proposal_activities') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Admins can view activities" ON public.proposal_activities';
  END IF;

  IF to_regclass('public.contracts') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Admins can manage contracts" ON public.contracts';
    EXECUTE 'DROP POLICY IF EXISTS "Authenticated full access to contracts" ON public.contracts';
    EXECUTE 'DROP POLICY IF EXISTS "Workspace members can manage contracts" ON public.contracts';
    EXECUTE 'DROP POLICY IF EXISTS "Public can view contracts via token" ON public.contracts';
    EXECUTE 'DROP POLICY IF EXISTS "Public can read contracts by token" ON public.contracts';
    EXECUTE 'DROP POLICY IF EXISTS "Public read contracts by token" ON public.contracts';
  END IF;

  IF to_regclass('public.lead_activities') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Admins can manage lead activities" ON public.lead_activities';
    EXECUTE 'DROP POLICY IF EXISTS "Authenticated users can manage lead activities" ON public.lead_activities';
    EXECUTE 'DROP POLICY IF EXISTS "Authenticated full access to lead_activities" ON public.lead_activities';
    EXECUTE 'DROP POLICY IF EXISTS "Workspace members can manage lead activities" ON public.lead_activities';
  END IF;

  IF to_regclass('public.project_deliverables') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Full access for authenticated users" ON public.project_deliverables';
    EXECUTE 'DROP POLICY IF EXISTS "Authenticated full access to project_deliverables" ON public.project_deliverables';
    EXECUTE 'DROP POLICY IF EXISTS "Workspace members can manage project deliverables" ON public.project_deliverables';
    EXECUTE 'DROP POLICY IF EXISTS "Read access for clients via token" ON public.project_deliverables';
    EXECUTE 'DROP POLICY IF EXISTS "Update access for clients via token" ON public.project_deliverables';
    EXECUTE 'DROP POLICY IF EXISTS "Public read deliverables by token" ON public.project_deliverables';
    EXECUTE 'DROP POLICY IF EXISTS "Public can view deliverables via project report token" ON public.project_deliverables';
  END IF;

  IF to_regclass('public.migrations') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Users can view migrations of their workspace" ON public.migrations';
    EXECUTE 'DROP POLICY IF EXISTS "Users can create migrations for their workspace" ON public.migrations';
  END IF;

  IF to_regclass('public.migration_logs') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Users can view logs of their migrations" ON public.migration_logs';
  END IF;

  IF to_regclass('public.employee_costs') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.employee_costs';
  END IF;

  IF to_regclass('public.tax_profiles') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Users can manage their organization''s tax profiles" ON public.tax_profiles';
  END IF;

  IF to_regclass('public.integrations_config') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Users can manage their organization''s integration config" ON public.integrations_config';
    EXECUTE 'DROP POLICY IF EXISTS "Service Role can read all integration configs" ON public.integrations_config';
  END IF;

  IF to_regclass('public.document_envelopes') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Users can view envelopes in their organization" ON public.document_envelopes';
    EXECUTE 'DROP POLICY IF EXISTS "Users can insert envelopes in their organization" ON public.document_envelopes';
    EXECUTE 'DROP POLICY IF EXISTS "Users can update envelopes in their organization" ON public.document_envelopes';
    EXECUTE 'DROP POLICY IF EXISTS "Public can view envelope via hash token" ON public.document_envelopes';
    EXECUTE 'DROP POLICY IF EXISTS "Public can update envelope via hash token" ON public.document_envelopes';
    EXECUTE 'DROP POLICY IF EXISTS "Workspace members can manage document envelopes" ON public.document_envelopes';
  END IF;

  IF to_regclass('public.document_signatures') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Users can view signatures in their organization" ON public.document_signatures';
    EXECUTE 'DROP POLICY IF EXISTS "Public can insert signature" ON public.document_signatures';
    EXECUTE 'DROP POLICY IF EXISTS "Workspace members can view document signatures" ON public.document_signatures';
  END IF;

  IF to_regclass('public.customers') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Users can view customers for their workspaces" ON public.customers';
  END IF;

  IF to_regclass('public.subscriptions') IS NOT NULL THEN
    EXECUTE 'DROP POLICY IF EXISTS "Users can view subscriptions for their workspaces" ON public.subscriptions';
  END IF;
END $$;

-- 2) Revoke direct access from anon/authenticated roles on removable tables.
DO $$
DECLARE
  rel_name text;
BEGIN
  FOREACH rel_name IN ARRAY ARRAY[
    'public.prospects',
    'public.proposals',
    'public.proposal_items',
    'public.proposal_signatures',
    'public.proposal_activities',
    'public.contracts',
    'public.lead_activities',
    'public.project_deliverables',
    'public.migrations',
    'public.migration_logs',
    'public.employee_costs',
    'public.tax_profiles',
    'public.integrations_config',
    'public.document_envelopes',
    'public.document_signatures',
    'public.customers',
    'public.subscriptions'
  ] LOOP
    IF to_regclass(rel_name) IS NOT NULL THEN
      EXECUTE format('REVOKE ALL ON TABLE %s FROM anon, authenticated', rel_name);
    END IF;
  END LOOP;
END $$;

-- 3) Revoke execute on removable functions/RPCs.
DO $$
DECLARE
  proc_name text;
BEGIN
  FOREACH proc_name IN ARRAY ARRAY[
    'public.get_leads_needing_attention()',
    'public.get_next_proposal_number()',
    'public.set_proposal_number()',
    'public.get_next_contract_number()',
    'public.set_contract_number()',
    'public.update_proposal_totals()',
    'public.convert_prospect_to_client(uuid, uuid)',
    'public.calculate_project_profitability(uuid)',
    'public.trigger_sync_contact_function()',
    'public.increment_workspace_tokens(uuid, integer)'
  ] LOOP
    IF to_regprocedure(proc_name) IS NOT NULL THEN
      EXECUTE format('REVOKE ALL ON FUNCTION %s FROM anon, authenticated', proc_name);
    END IF;
  END LOOP;
END $$;

-- 4) Disable triggers on removable CRM tables.
ALTER TABLE IF EXISTS public.proposal_items       DISABLE TRIGGER update_proposal_totals_on_item_change;
ALTER TABLE IF EXISTS public.prospects            DISABLE TRIGGER update_prospects_updated_at;
ALTER TABLE IF EXISTS public.proposals            DISABLE TRIGGER update_proposals_updated_at;
ALTER TABLE IF EXISTS public.proposals            DISABLE TRIGGER tr_set_proposal_number;
ALTER TABLE IF EXISTS public.contracts            DISABLE TRIGGER tr_set_contract_number;
ALTER TABLE IF EXISTS public.project_deliverables DISABLE TRIGGER update_project_deliverables_updated_at;
ALTER TABLE IF EXISTS public.integrations_config  DISABLE TRIGGER update_integrations_config_modtime;
ALTER TABLE IF EXISTS public.document_envelopes   DISABLE TRIGGER update_document_envelopes_modtime;
ALTER TABLE IF EXISTS public.tax_profiles         DISABLE TRIGGER update_tax_profiles_modtime;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'leads'
  ) THEN
    EXECUTE 'ALTER TABLE public.leads DISABLE TRIGGER on_lead_won_sync_contact';
  END IF;
END $$;

-- 5) Storage hardening for the removable Noctra Sign bucket.
DROP POLICY IF EXISTS "Authenticated users can upload contracts" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read contracts" ON storage.objects;

-- TODO(manual): if the bucket is truly unused, empty `storage.objects` where bucket_id = 'contracts'
-- and then delete the row from `storage.buckets`.

-- TODO(manual): `forge_early_access`, `workspace_config`, and unversioned CRM core tables remain in REVIEW.
-- Confirm production usage before any destructive cleanup on those objects.

COMMIT;

-- ROLLBACK PLAN
-- - No data was deleted.
-- - To undo this script, recreate the dropped policies from the relevant migration files and re-grant table/function privileges.
-- - Re-enable triggers with:
--   ALTER TABLE ... ENABLE TRIGGER <name>;
