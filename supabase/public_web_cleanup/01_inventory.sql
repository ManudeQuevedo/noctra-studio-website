-- Read-only inventory for public-web cleanup candidates.
-- Run this first and save the output before any cleanup.

WITH tracked_tables AS (
  SELECT *
  FROM (
    VALUES
      ('public', 'contact_submissions', 'KEEP',   'Public contact form API'),
      ('public', 'rate_limits',         'KEEP',   'Public contact form throttling'),
      ('public', 'workspaces',          'KEEP',   'Public contact branding lookup'),
      ('public', 'quiz_submissions',    'KEEP',   'Public quiz submit API'),
      ('public', 'forge_early_access',  'REVIEW', 'Referenced only by src/app/actions/forge.ts'),
      ('public', 'workspace_config',    'REVIEW', 'Forge settings only, schema not versioned here'),
      ('public', 'prospects',           'REMOVE', 'Legacy CRM lead table'),
      ('public', 'proposals',           'REMOVE', 'CRM proposal flow'),
      ('public', 'proposal_items',      'REMOVE', 'CRM proposal line items'),
      ('public', 'proposal_signatures', 'REMOVE', 'CRM proposal signatures'),
      ('public', 'proposal_activities', 'REMOVE', 'CRM proposal audit log'),
      ('public', 'contracts',           'REMOVE', 'CRM / signing contracts'),
      ('public', 'lead_activities',     'REMOVE', 'CRM lead activity log'),
      ('public', 'project_deliverables','REMOVE', 'Client deliverables portal'),
      ('public', 'migrations',          'REMOVE', 'CRM migration module'),
      ('public', 'migration_logs',      'REMOVE', 'CRM migration module logs'),
      ('public', 'employee_costs',      'REMOVE', 'Profitability module'),
      ('public', 'tax_profiles',        'REMOVE', 'Finance sync module'),
      ('public', 'integrations_config', 'REMOVE', 'Marketing bridge config'),
      ('public', 'document_envelopes',  'REMOVE', 'Noctra Sign envelope store'),
      ('public', 'document_signatures', 'REMOVE', 'Noctra Sign signature log'),
      ('public', 'customers',           'REMOVE', 'Stripe billing mapping'),
      ('public', 'subscriptions',       'REMOVE', 'Stripe subscription mirror')
  ) AS t(schema_name, table_name, classification, reason)
),
tracked_columns AS (
  SELECT *
  FROM (
    VALUES
      ('public', 'contact_submissions', 'pipeline_status',  'REMOVE', 'Added by CRM pipeline migration'),
      ('public', 'contact_submissions', 'estimated_value',  'REMOVE', 'Added by CRM pipeline migration'),
      ('public', 'contact_submissions', 'lost_reason',      'REMOVE', 'Added by CRM pipeline migration'),
      ('public', 'contact_submissions', 'next_action',      'REMOVE', 'Added by CRM pipeline migration'),
      ('public', 'contact_submissions', 'next_action_date', 'REMOVE', 'Added by CRM pipeline migration'),
      ('public', 'contact_submissions', 'closed_at',        'REMOVE', 'Added by CRM pipeline migration'),
      ('public', 'workspaces',          'ai_credits_balance', 'REVIEW', 'Forge billing / AI credits only'),
      ('public', 'workspaces',          'is_ai_unlimited',    'REVIEW', 'Forge billing / AI credits only'),
      ('public', 'workspaces',          'tier',               'REVIEW', 'Forge billing / pricing only'),
      ('public', 'workspaces',          'folio_prefix',       'REVIEW', 'Forge folio generation only'),
      ('public', 'workspaces',          'custom_domain',      'REVIEW', 'Domain-linked, keep until explicitly migrated'),
      ('public', 'workspaces',          'subdomain',          'REVIEW', 'Domain-linked, keep until explicitly migrated')
  ) AS t(schema_name, table_name, column_name, classification, reason)
),
tracked_functions AS (
  SELECT *
  FROM (
    VALUES
      ('public', 'get_next_request_id',          '',               'KEEP',   'Public contact request IDs'),
      ('public', 'get_leads_needing_attention',  '',               'REMOVE', 'CRM alerts RPC'),
      ('public', 'get_next_proposal_number',     '',               'REMOVE', 'CRM proposal numbering'),
      ('public', 'set_proposal_number',          '',               'REMOVE', 'CRM proposal numbering trigger fn'),
      ('public', 'get_next_contract_number',     '',               'REMOVE', 'CRM contract numbering'),
      ('public', 'set_contract_number',          '',               'REMOVE', 'CRM contract numbering trigger fn'),
      ('public', 'update_proposal_totals',       '',               'REMOVE', 'CRM proposal totals trigger fn'),
      ('public', 'convert_prospect_to_client',   'p_proposal_id uuid, p_signature_id uuid', 'REMOVE', 'Legacy CRM conversion fn'),
      ('public', 'calculate_project_profitability', 'target_project_id uuid', 'REMOVE', 'Profitability RPC'),
      ('public', 'trigger_sync_contact_function','',               'REMOVE', 'Marketing bridge trigger fn'),
      ('public', 'increment_workspace_tokens',   'workspacecode uuid, amount integer', 'REMOVE', 'Stripe billing helper')
  ) AS t(schema_name, function_name, identity_args, classification, reason)
)
SELECT
  tt.classification,
  tt.schema_name,
  tt.table_name,
  c.relkind,
  pg_total_relation_size(to_regclass(format('%I.%I', tt.schema_name, tt.table_name))) AS bytes,
  tt.reason
FROM tracked_tables tt
LEFT JOIN pg_class c
  ON c.oid = to_regclass(format('%I.%I', tt.schema_name, tt.table_name))
ORDER BY
  CASE tt.classification WHEN 'KEEP' THEN 1 WHEN 'REVIEW' THEN 2 ELSE 3 END,
  tt.table_name;

SELECT
  tc.classification,
  tc.schema_name,
  tc.table_name,
  tc.column_name,
  c.data_type,
  c.is_nullable,
  c.column_default,
  tc.reason
FROM tracked_columns tc
LEFT JOIN information_schema.columns c
  ON c.table_schema = tc.schema_name
 AND c.table_name = tc.table_name
 AND c.column_name = tc.column_name
ORDER BY
  CASE tc.classification WHEN 'KEEP' THEN 1 WHEN 'REVIEW' THEN 2 ELSE 3 END,
  tc.table_name,
  tc.column_name;

SELECT
  tt.classification,
  p.schemaname,
  p.tablename,
  p.policyname,
  p.roles,
  p.cmd,
  p.qual,
  p.with_check
FROM pg_policies p
JOIN tracked_tables tt
  ON tt.schema_name = p.schemaname
 AND tt.table_name = p.tablename
ORDER BY
  CASE tt.classification WHEN 'KEEP' THEN 1 WHEN 'REVIEW' THEN 2 ELSE 3 END,
  p.tablename,
  p.policyname;

SELECT
  tt.classification,
  n.nspname AS schema_name,
  c.relname AS table_name,
  t.tgname AS trigger_name,
  pg_get_triggerdef(t.oid, true) AS trigger_def
FROM pg_trigger t
JOIN pg_class c
  ON c.oid = t.tgrelid
JOIN pg_namespace n
  ON n.oid = c.relnamespace
JOIN tracked_tables tt
  ON tt.schema_name = n.nspname
 AND tt.table_name = c.relname
WHERE NOT t.tgisinternal
ORDER BY
  CASE tt.classification WHEN 'KEEP' THEN 1 WHEN 'REVIEW' THEN 2 ELSE 3 END,
  c.relname,
  t.tgname;

SELECT
  tf.classification,
  n.nspname AS schema_name,
  p.proname AS function_name,
  pg_get_function_identity_arguments(p.oid) AS identity_args,
  pg_get_function_result(p.oid) AS returns_type,
  tf.reason
FROM tracked_functions tf
LEFT JOIN pg_proc p
  ON p.pronamespace = to_regnamespace(tf.schema_name)
 AND p.proname = tf.function_name
LEFT JOIN pg_namespace n
  ON n.oid = p.pronamespace
WHERE p.oid IS NOT NULL
ORDER BY
  CASE tf.classification WHEN 'KEEP' THEN 1 WHEN 'REVIEW' THEN 2 ELSE 3 END,
  p.proname,
  pg_get_function_identity_arguments(p.oid);

SELECT
  b.id AS bucket_id,
  b.name,
  b.public,
  b.file_size_limit,
  b.allowed_mime_types
FROM storage.buckets b
WHERE b.id = 'contracts';
