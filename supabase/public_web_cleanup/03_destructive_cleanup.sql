-- Destructive cleanup for Supabase objects that are confirmed CRM/backoffice-only in this repo.
-- Execute only after you remove the corresponding app code paths or accept that those paths will stop working.

BEGIN;

SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '120s';

-- 1) Strip CRM-only columns from a public table that must remain.
ALTER TABLE IF EXISTS public.contact_submissions DROP COLUMN IF EXISTS pipeline_status;
ALTER TABLE IF EXISTS public.contact_submissions DROP COLUMN IF EXISTS estimated_value;
ALTER TABLE IF EXISTS public.contact_submissions DROP COLUMN IF EXISTS lost_reason;
ALTER TABLE IF EXISTS public.contact_submissions DROP COLUMN IF EXISTS next_action;
ALTER TABLE IF EXISTS public.contact_submissions DROP COLUMN IF EXISTS next_action_date;
ALTER TABLE IF EXISTS public.contact_submissions DROP COLUMN IF EXISTS closed_at;

-- 2) Drop explicit triggers before removing their tables/functions.
DO $$
BEGIN
  IF to_regclass('public.proposal_items') IS NOT NULL THEN
    EXECUTE 'DROP TRIGGER IF EXISTS update_proposal_totals_on_item_change ON public.proposal_items';
  END IF;
  IF to_regclass('public.prospects') IS NOT NULL THEN
    EXECUTE 'DROP TRIGGER IF EXISTS update_prospects_updated_at ON public.prospects';
  END IF;
  IF to_regclass('public.proposals') IS NOT NULL THEN
    EXECUTE 'DROP TRIGGER IF EXISTS update_proposals_updated_at ON public.proposals';
    EXECUTE 'DROP TRIGGER IF EXISTS tr_set_proposal_number ON public.proposals';
  END IF;
  IF to_regclass('public.contracts') IS NOT NULL THEN
    EXECUTE 'DROP TRIGGER IF EXISTS tr_set_contract_number ON public.contracts';
  END IF;
  IF to_regclass('public.project_deliverables') IS NOT NULL THEN
    EXECUTE 'DROP TRIGGER IF EXISTS update_project_deliverables_updated_at ON public.project_deliverables';
  END IF;
  IF to_regclass('public.integrations_config') IS NOT NULL THEN
    EXECUTE 'DROP TRIGGER IF EXISTS update_integrations_config_modtime ON public.integrations_config';
  END IF;
  IF to_regclass('public.document_envelopes') IS NOT NULL THEN
    EXECUTE 'DROP TRIGGER IF EXISTS update_document_envelopes_modtime ON public.document_envelopes';
  END IF;
  IF to_regclass('public.tax_profiles') IS NOT NULL THEN
    EXECUTE 'DROP TRIGGER IF EXISTS update_tax_profiles_modtime ON public.tax_profiles';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'leads'
  ) THEN
    EXECUTE 'DROP TRIGGER IF EXISTS on_lead_won_sync_contact ON public.leads';
  END IF;
END $$;

-- 3) Drop tables created for CRM/product modules that are not part of the public website.
DROP TABLE IF EXISTS public.document_signatures CASCADE;
DROP TABLE IF EXISTS public.document_envelopes CASCADE;

DROP TABLE IF EXISTS public.migration_logs CASCADE;
DROP TABLE IF EXISTS public.migrations CASCADE;

DROP TABLE IF EXISTS public.proposal_activities CASCADE;
DROP TABLE IF EXISTS public.proposal_signatures CASCADE;
DROP TABLE IF EXISTS public.proposal_items CASCADE;

DROP TABLE IF EXISTS public.contracts CASCADE;
DROP TABLE IF EXISTS public.proposals CASCADE;
DROP TABLE IF EXISTS public.prospects CASCADE;

DROP TABLE IF EXISTS public.lead_activities CASCADE;
DROP TABLE IF EXISTS public.project_deliverables CASCADE;

DROP TABLE IF EXISTS public.tax_profiles CASCADE;
DROP TABLE IF EXISTS public.integrations_config CASCADE;
DROP TABLE IF EXISTS public.employee_costs CASCADE;

DROP TABLE IF EXISTS public.customers CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;

-- 4) Drop CRM/product functions and RPCs that are no longer needed.
DROP FUNCTION IF EXISTS public.get_leads_needing_attention();
DROP FUNCTION IF EXISTS public.get_next_proposal_number();
DROP FUNCTION IF EXISTS public.set_proposal_number();
DROP FUNCTION IF EXISTS public.update_proposal_totals();
DROP FUNCTION IF EXISTS public.convert_prospect_to_client(uuid, uuid);
DROP FUNCTION IF EXISTS public.get_next_contract_number();
DROP FUNCTION IF EXISTS public.set_contract_number();
DROP FUNCTION IF EXISTS public.calculate_project_profitability(uuid);
DROP FUNCTION IF EXISTS public.trigger_sync_contact_function();
DROP FUNCTION IF EXISTS public.increment_workspace_tokens(uuid, integer);

-- 5) Drop now-unused enum types and sequences created by removable modules.
DROP TYPE IF EXISTS public.integration_provider;
DROP TYPE IF EXISTS public.accounting_sync_status;
DROP TYPE IF EXISTS public.document_status;

DROP SEQUENCE IF EXISTS public.proposal_number_seq;
DROP SEQUENCE IF EXISTS public.contract_number_seq;

COMMIT;

-- ROLLBACK PLAN
-- 1. Restore from a schema+data backup taken immediately before this script.
-- 2. Re-apply versioned migrations for removed modules:
--    - 001_crm_schema.sql
--    - 002_pipeline_kanban.sql
--    - 003_alerts_rpc.sql
--    - 004_proposals_numbering.sql
--    - 005_proposal_signature_flow.sql
--    - 006_contracts_schema.sql
--    - 007_contracts_refinements.sql
--    - 009_project_deliverables.sql
--    - 20260222123456_data_migration_module.sql
--    - 20260223000001_ai_profitability_schema.sql
--    - 20260223000002_finance_sync_schema.sql
--    - 20260223000003_marketing_bridge_schema.sql
--    - 20260223000004_noctra_sign_schema.sql
--    - 20260223000005_stripe_billing_schema.sql
-- 3. Recreate any manually managed/unversioned objects separately:
--    `workspaces`, `workspace_members`, `workspace_config`, `profiles`, `projects`,
--    `project_tasks`, `project_time_logs`, `project_expenses`, `forge_early_access`, `rate_limits`.
