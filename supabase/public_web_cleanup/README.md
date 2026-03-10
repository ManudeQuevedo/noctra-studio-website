# Noctra Public-Web Supabase Cleanup

## Scope

This analysis treats `noctra.studio` as the public marketing website only. It excludes CRM/backoffice/product surfaces under `forge`, `dashboard`, `admin`, proposal/contract signing, migration tooling, billing, and internal operations.

The classification below is based on real code references found in this repo, especially:

- `src/app/api/contact/route.ts`
- `src/app/api/quiz/submit/route.tsx`
- `src/lib/subscriptions.ts`
- `src/app/actions/forge.ts`
- `src/app/api/contact/resend-email/route.ts`
- `src/app/api/proposals/sign/route.ts`
- `src/app/api/contracts/sign/route.ts`
- `src/app/actions/sign-actions.ts`
- `src/app/[locale]/forge/**/*`
- `src/app/[locale]/dashboard/**/*`
- `src/app/[locale]/admin/**/*`
- `supabase/migrations/*.sql`
- `src/db/quiz_schema.sql`

Important repo gap:

- `contact_submissions`, `rate_limits`, `workspaces`, `workspace_members`, `workspace_config`, and `forge_early_access` are referenced in code, but their base table DDL is not fully versioned in `supabase/migrations/`.
- `quiz_submissions` exists only in `src/db/quiz_schema.sql`, not in `supabase/migrations/`.

Because of that, destructive SQL is intentionally conservative for unversioned objects.

## KEEP

### Tables

- `public.contact_submissions`
  - Used by the public contact form in `src/app/api/contact/route.ts`.
- `public.rate_limits`
  - Used by the public contact form throttling in `src/app/api/contact/route.ts`.
- `public.workspaces`
  - Used by the public contact flow for sender branding (`name`, `email`) in `src/app/api/contact/route.ts`.
- `public.quiz_submissions`
  - Used by the public quiz submission handler in `src/app/api/quiz/submit/route.tsx`.

### Columns to keep

- `contact_submissions`
  - `id`
  - `name`
  - `email`
  - `phone`
  - `message`
  - `service_interest`
  - `source_cta`
  - `source_page`
  - `locale`
  - `intent`
  - `request_id`
  - `lead_score`
  - `lead_score_breakdown`
  - `workspace_id`
  - `email_sent`
  - `email_sent_at`

- `rate_limits`
  - `id`
  - `ip`
  - `attempts`
  - `first_attempt_at`
  - `last_attempt_at`

- `workspaces`
  - `id`
  - `name`
  - `email`

- `quiz_submissions`
  - `id`
  - `created_at`
  - `name`
  - `email`
  - `phone`
  - `company`
  - `service_id`
  - `score`
  - `answers`
  - `status`

### Functions / RPCs

- `public.get_next_request_id()`
  - Used in `src/app/api/contact/route.ts`.

### Policies to keep

- `public.quiz_submissions`
  - `Enable insert for everyone`
    - Required because `src/app/api/quiz/submit/route.tsx` uses the anon client, not the service role.

## REVIEW

These objects are real code references, but I cannot prove they are required by the public marketing site itself, or their schema is not fully versioned in-repo.

- `public.forge_early_access`
  - Referenced only by `src/app/actions/forge.ts`.
  - I found no active import/call site for that server action.
  - Do not drop until you decide whether the Forge waitlist survives.

- `public.workspaces`
  - Additional CRM/product columns are mixed into a table that the public contact flow still uses for branding.
  - Public-safe long-term move: migrate branding to a dedicated `site_settings` table, then shrink `workspaces`.

- `public.workspace_config`
  - Referenced only from Forge settings/metrics paths, not from public marketing routes.
  - DDL is not versioned in this repo, so I did not generate destructive drops.

- Unversioned CRM core objects referenced in app code but not fully defined in repo migrations:
  - `public.projects`
  - `public.project_tasks`
  - `public.project_time_logs`
  - `public.project_expenses`
  - `public.workspace_members`
  - `public.profiles`
  - `public.deliverables`
  - `public.tickets`
  - `public.deliverable_items`

### Column candidates in REVIEW

- `workspaces.ai_credits_balance`
- `workspaces.is_ai_unlimited`
- `workspaces.tier`
- `workspaces.folio_prefix`
- `workspaces.custom_domain`
- `workspaces.subdomain`

Notes:

- `custom_domain` and `subdomain` are domain-related. The prompt explicitly says not to drop domain-linked data without proof. Leave them alone for now.
- `tier` is used by Forge settings and billing logic, not by the public marketing site.

## REMOVE

These objects are versioned in migrations and only referenced by CRM/backoffice/product code, not by the main public site.

### Tables

- `public.prospects`
- `public.proposals`
- `public.proposal_items`
- `public.proposal_signatures`
- `public.proposal_activities`
- `public.contracts`
- `public.lead_activities`
- `public.project_deliverables`
- `public.migrations`
- `public.migration_logs`
- `public.employee_costs`
- `public.tax_profiles`
- `public.integrations_config`
- `public.document_envelopes`
- `public.document_signatures`
- `public.customers`
- `public.subscriptions`

### Functions / RPCs

- `public.get_leads_needing_attention()`
- `public.get_next_proposal_number()`
- `public.set_proposal_number()`
- `public.get_next_contract_number()`
- `public.set_contract_number()`
- `public.update_proposal_totals()`
- `public.convert_prospect_to_client(uuid, uuid)`
- `public.calculate_project_profitability(uuid)`
- `public.trigger_sync_contact_function()`
- `public.increment_workspace_tokens(uuid, integer)`

### Sequences / Types

- `public.proposal_number_seq`
- `public.contract_number_seq`
- `public.integration_provider`
- `public.accounting_sync_status`
- `public.document_status`

### Triggers

- `public.proposal_items.update_proposal_totals_on_item_change`
- `public.prospects.update_prospects_updated_at`
- `public.proposals.update_proposals_updated_at`
- `public.proposals.tr_set_proposal_number`
- `public.contracts.tr_set_contract_number`
- `public.project_deliverables.update_project_deliverables_updated_at`
- `public.integrations_config.update_integrations_config_modtime`
- `public.document_envelopes.update_document_envelopes_modtime`
- `public.tax_profiles.update_tax_profiles_modtime`
- `public.leads.on_lead_won_sync_contact`

### Storage

- Bucket candidate: `storage.buckets.id = 'contracts'`
  - Only introduced by the Noctra Sign schema.
  - Actual app storage calls are commented out in `src/app/actions/sign-actions.ts`.
  - I left bucket deletion as a manual follow-up because deleting buckets safely depends on whether files exist.

### Column candidates to drop now

- `contact_submissions.pipeline_status`
- `contact_submissions.estimated_value`
- `contact_submissions.lost_reason`
- `contact_submissions.next_action`
- `contact_submissions.next_action_date`
- `contact_submissions.closed_at`

## Risks

### `01_inventory.sql`

- Read-only. No data or schema changes.

### `02_soft_cleanup.sql`

- Safe from a data-loss perspective.
- It will reduce CRM exposure by dropping policies, revoking direct access, and disabling triggers on candidate CRM objects.
- If you run it before deleting CRM code paths, Forge/dashboard/billing/signing flows can stop working immediately.

### `03_destructive_cleanup.sql`

- Irreversible without backup restore.
- Removes versioned CRM tables/functions/sequences/types and strips CRM-only columns from `contact_submissions`.
- Proposal signing, contract signing, billing, migration tooling, integrations, profitability, and project deliverables will be deleted.
- It intentionally does not drop unversioned/review objects like `workspaces`, `workspace_config`, `forge_early_access`, `projects`, or `profiles`.

## Post-cleanup validations

- `POST /api/contact` returns `200` and creates a `contact_submissions` row.
- Duplicate contact email still returns `409`.
- Rate limiting still returns `429` after repeated submissions.
- `get_next_request_id()` still executes.
- `POST /api/quiz/submit` still inserts into `quiz_submissions`.
- Search the repo again for dropped objects:
  - `rg -n "proposals|contracts|lead_activities|project_deliverables|integrations_config|document_envelopes|document_signatures|customers|subscriptions|calculate_project_profitability|get_leads_needing_attention" src`
- Confirm no remaining policies for removed tables:
  - `select * from pg_policies where schemaname = 'public' and tablename in (...);`
- If you decide to remove Noctra Sign completely, manually empty and delete the `contracts` storage bucket after verifying it has no objects.

## Suggested Target Public Schema

Minimal end-state for the public website:

- `public.contact_submissions`
  - `id`
  - `created_at`
  - `name`
  - `email`
  - `phone`
  - `message`
  - `service_interest`
  - `source_cta`
  - `source_page`
  - `locale`
  - `intent`
  - `request_id`
  - `lead_score`
  - `lead_score_breakdown`
  - `workspace_id`
  - `email_sent`
  - `email_sent_at`

- `public.rate_limits`
  - `id`
  - `ip`
  - `attempts`
  - `first_attempt_at`
  - `last_attempt_at`

- `public.quiz_submissions`
  - `id`
  - `created_at`
  - `name`
  - `email`
  - `phone`
  - `company`
  - `service_id`
  - `score`
  - `answers`
  - `status`

- `public.site_settings`
  - Suggested replacement for public branding on top of `workspaces`
  - `id`
  - `brand_name`
  - `from_email`
  - `reply_to_email`
  - `default_locale`
  - `active`

- Optional if you keep a waitlist:
  - `public.waitlist_entries`
    - `id`
    - `created_at`
    - `email`
    - `source`
    - `locale`
    - `metadata`

- Optional if you keep a public counter:
  - `public.public_site_counters`
    - `counter_key`
    - `value`
    - `updated_at`

Recommended migration path:

1. Move email branding off `workspaces` into `site_settings`.
2. If you still need a public counter, stop reading from `workspaces.subscription_status`.
3. Decide explicitly whether Forge waitlist survives. If not, drop `forge_early_access`.
