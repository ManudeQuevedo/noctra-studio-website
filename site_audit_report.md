# Site Audit Report

Date: 2026-03-07

## Executive Summary

The public marketing site is visually strong and the route structure is broad, but there are three systemic issues that materially affect production quality:

1. Multi-tenant database protections are currently too permissive in multiple Supabase RLS migrations.
2. Several authenticated endpoints trust session presence or client-supplied workspace identifiers without verifying role or tenancy ownership.
3. Accessibility is inconsistent across shared UI patterns, especially dialogs, forms, keyboard flow, and low-contrast input states.

I reviewed the route inventory under `src/app`, shared layouts/components, representative public pages, and the Supabase/API layer. Public pages were spot-checked in a real browser; authenticated internal areas were primarily audited from source because no seeded user session was provided.

## Critical

### AUD-001: RLS policies currently allow broad cross-tenant access

Severity: Critical

Location:
- `supabase/migrations/011_rls_security_update.sql:11-13`
- `supabase/migrations/011_rls_security_update.sql:28-30`
- `supabase/migrations/011_rls_security_update.sql:44-46`
- `supabase/migrations/011_rls_security_update.sql:52-54`
- `supabase/migrations/011_rls_security_update.sql:59-78`
- `supabase/migrations/009_project_deliverables.sql:21-26`

Evidence:
- `ON proposals FOR ALL TO authenticated USING (true) WITH CHECK (true);`
- `ON contracts FOR ALL TO authenticated USING (true) WITH CHECK (true);`
- `ON contact_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);`
- `ON project_tasks / project_time_logs / project_expenses / project_deliverables ... USING (true) WITH CHECK (true);`

Impact:
- Any authenticated user can potentially read, update, or delete records across tenants/workspaces if they can hit the table through app code or direct client access.
- This breaks tenant isolation for proposals, contracts, leads, tasks, expenses, and deliverables.

How to fix:
- Replace every `USING (true)` / `WITH CHECK (true)` tenant table policy with workspace- or organization-scoped predicates.
- Standardize on a single helper relationship such as `workspace_members.user_id = auth.uid()` and enforce it consistently across all tables.
- Add negative tests proving one authenticated workspace user cannot read or mutate another workspace's records.

## High

### AUD-002: “Token-based” public policies expose all tokenized rows instead of only the matching row

Severity: High

Location:
- `supabase/migrations/011_rls_security_update.sql:19-21`
- `supabase/migrations/011_rls_security_update.sql:36-38`
- `supabase/migrations/011_rls_security_update.sql:80-83`
- `supabase/migrations/009_project_deliverables.sql:29-45`
- `supabase/migrations/20260223000004_noctra_sign_schema.sql:73-86`
- `supabase/migrations/20260223000004_noctra_sign_schema.sql:103-112`

Evidence:
- `USING (client_token IS NOT NULL);`
- `USING (hash_token IS NOT NULL AND expires_at > now());`
- Anonymous `UPDATE` and `INSERT` policies are also granted based on row state rather than proof of possession of a specific token.

Impact:
- Anonymous access is not scoped to “the row that matches the supplied token”; it is scoped to “any row whose token column is populated”.
- That can leak proposals/contracts/deliverables/signing envelopes and allows anonymous mutation paths that should only be possible through a validated secure endpoint.

How to fix:
- Move token verification into a server route or Edge Function that validates the token and performs the mutation using a service-role client.
- Keep anon policies either removed entirely or limited to a dedicated public projection table/view that does not expose internal IDs or unrelated columns.
- If public access must remain in RLS, couple it to a validated claim or temporary signed token, not merely `IS NOT NULL`.

### AUD-003: Multiple server endpoints trust session presence or client-supplied workspace IDs without verifying ownership

Severity: High

Location:
- `src/app/api/stripe/checkout/route.ts:12-33`
- `src/app/api/stripe/portal/route.ts:11-32`
- `src/app/api/revalidate/route.ts:6-16`
- `src/app/api/admin/invite/route.ts:7-14`
- `src/app/[locale]/forge/metrics/page.tsx:10-24`

Evidence:
- Stripe routes accept `workspaceId` from the request body and immediately query `customers` by that ID.
- `revalidatePath(path)` is allowed for any authenticated session.
- Admin invite is gated by `user.email === "hello@noctra.studio"` instead of role/claim membership.
- Metrics page loads `contact_submissions` without a workspace filter.

Impact:
- A logged-in user can potentially trigger billing flows, portal access, cache invalidation, or lead visibility outside their own workspace.
- Even if some requests fail because of partial RLS coverage, the authorization model is inconsistent and fragile.

How to fix:
- Resolve the active workspace server-side from authenticated membership, never from client-supplied `workspaceId` alone.
- Use `getUser()` plus workspace membership/role verification for sensitive actions; avoid `getSession()` as the sole authorization check in server code.
- Restrict revalidation to admin/editor roles and allowlist which paths can be invalidated.
- Replace email-string admin checks with role-based authorization stored in trusted server-side claims or membership tables.

## Medium

### AUD-004: Cookie consent dialogs are visually present but not implemented as fully accessible dialogs

Severity: Medium

Location:
- `src/components/cookie-consent/CookieBanner.tsx:71-131`
- `src/components/cookie-consent/CookieConfigModal.tsx:49-214`

Evidence:
- Both components use `role="dialog"` / `aria-modal="true"`.
- There is no focus trap, no initial focus placement, and no focus restoration logic.
- Background content remains mounted and there is no keyboard containment logic.

Impact:
- Keyboard and screen-reader users can continue tabbing behind the overlay or lose context when the dialog opens/closes.
- This is especially problematic because the cookie banner appears globally and can cover interactive UI, including forms.

How to fix:
- Replace custom dialog behavior with a tested primitive such as Radix Dialog.
- On open, move focus to the first meaningful action; trap focus while open; restore focus on close.
- Mark the background inert while a modal dialog is active.

### AUD-005: Several forms are not fully programmatically accessible and rely on weak affordances

Severity: Medium

Location:
- `src/app/[locale]/contact/ContactClient.tsx:535-610`
- `src/app/[locale]/contact/ContactClient.tsx:718-776`
- `src/components/auth/LoginPage.tsx:76-115`

Evidence:
- Contact form labels are visually separate but not bound with `htmlFor`/`id`.
- Contact error text is rendered visually, but not attached with `aria-describedby` or announced via `aria-live`.
- Contact flow disables the “next” CTA before the user can attempt submission.
- Login password visibility toggle has no accessible name.

Impact:
- Screen readers may not reliably associate labels/errors with inputs.
- Users with cognitive or motor constraints get less guidance because controls fail silently or are disabled early.
- Password visibility control is ambiguous for assistive tech.

How to fix:
- Give every input a stable `id`, pair every label with `htmlFor`, and connect error text with `aria-describedby`.
- Add `aria-invalid` and an `aria-live="polite"` region for step-level validation feedback.
- Keep the CTA enabled and validate on submit/step transition with clear messaging.
- Add `aria-label={showPassword ? "Hide password" : "Show password"}` to the visibility toggle.

### AUD-006: Low-contrast placeholders and body-wide text selection suppression hurt usability

Severity: Medium

Location:
- `src/components/auth/LoginPage.tsx:87-104`
- `src/app/globals.css:96-128`

Evidence:
- Login inputs use `placeholder:text-white/10`, which is extremely low contrast.
- Global body styling applies `select-none`, then selectively re-enables text selection only for some elements.

Impact:
- Placeholder hints are difficult to read, especially on low-quality displays.
- Users cannot reliably copy company names, IDs, URLs, or legal text from many non-text elements and containers.

How to fix:
- Raise placeholder contrast to at least a clearly readable muted token and use visible labels as the primary cue.
- Remove `select-none` from `body`; opt out only for truly decorative or drag-only UI.

## Low

### AUD-007: Global keyboard navigation would benefit from a skip link and reduced repeated-motion burden

Severity: Low

Location:
- `src/app/[locale]/layout.tsx:155-170`
- `src/components/header.tsx`

Evidence:
- Shared layout renders global header, cookie controls, floating actions, quiz modal, and footer around page content.
- No skip link is provided before the fixed navigation.

Impact:
- Keyboard users must traverse repeated navigation and floating controls on every route.
- Combined with animated transitions, the experience is heavier than it needs to be for assistive users.

How to fix:
- Add a visually hidden “Skip to content” link before the header and target a stable `main` id in page layouts.
- Audit motion-heavy components against `prefers-reduced-motion` and provide calmer fallbacks.

## Additional Improvements

These are not top-priority vulnerabilities, but they would improve platform quality:

- Unify CSP in `next.config.ts` and `src/proxy.ts`; the current policies differ and still rely on `unsafe-inline` / `unsafe-eval`, which reduces the value of CSP as an XSS mitigation.
- Align analytics consent loading with CSP. The current cookie utilities inject GA/Plausible scripts, but the local runtime already showed CSP blocking some external scripts.
- Add automated checks:
  - a11y smoke tests for main public routes
  - Supabase policy tests for tenant isolation
  - endpoint authorization tests for workspace-scoped APIs
- Create a route audit checklist covering: one `h1`, one `main`, labeled forms, keyboard-visible focus, and dialog focus management.

## Suggested Remediation Order

1. Lock down Supabase RLS and remove broad `authenticated` / `anon` access.
2. Fix workspace/role authorization on billing, revalidation, admin, and analytics routes.
3. Refactor cookie dialogs onto an accessible modal primitive.
4. Normalize form semantics across contact, login, careers, and Forge modals.
5. Add global skip navigation, reduce low-contrast placeholder usage, and remove `body`-level `select-none`.
