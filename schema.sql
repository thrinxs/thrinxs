-- ============================================================
-- THRINXS FULL PLATFORM SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ADMINS
-- ============================================================
CREATE TABLE IF NOT EXISTS "admins" (
  "id"            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "name"          TEXT NOT NULL,
  "email"         TEXT NOT NULL UNIQUE,
  "password_hash" TEXT NOT NULL,
  "role"          TEXT NOT NULL DEFAULT 'admin' CHECK ("role" IN ('super_admin', 'admin')),
  "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SALES REPS
-- ============================================================
CREATE TABLE IF NOT EXISTS "reps" (
  "id"            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "name"          TEXT NOT NULL,
  "email"         TEXT NOT NULL UNIQUE,
  "phone"         TEXT,
  "password_hash" TEXT NOT NULL,
  "level"         TEXT NOT NULL DEFAULT 'intern' CHECK ("level" IN ('intern', 'junior', 'associate', 'senior')),
  "ref_code"      TEXT NOT NULL UNIQUE,
  "status"        TEXT NOT NULL DEFAULT 'active' CHECK ("status" IN ('active', 'suspended')),
  "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "rep_referrals" (
  "id"               TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "rep_id"           TEXT NOT NULL REFERENCES "reps"("id") ON DELETE CASCADE,
  "submission_type"  TEXT NOT NULL,
  "submission_id"    TEXT NOT NULL,
  "created_at"       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "rep_commissions" (
  "id"            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "rep_id"        TEXT NOT NULL REFERENCES "reps"("id") ON DELETE CASCADE,
  "amount"        NUMERIC(12, 2) NOT NULL,
  "currency"      TEXT NOT NULL DEFAULT 'USD',
  "rate"          NUMERIC(5, 2) NOT NULL,
  "status"        TEXT NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'approved', 'paid')),
  "period_start"  TIMESTAMPTZ,
  "period_end"    TIMESTAMPTZ,
  "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "rep_payouts" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "rep_id"      TEXT NOT NULL REFERENCES "reps"("id") ON DELETE CASCADE,
  "amount"      NUMERIC(12, 2) NOT NULL,
  "currency"    TEXT NOT NULL DEFAULT 'USD',
  "method"      TEXT,
  "status"      TEXT NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'processing', 'paid')),
  "paid_at"     TIMESTAMPTZ,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- UPDATE EXISTING TABLES
-- ============================================================
ALTER TABLE "CareerApplication"
  ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'pending'
    CHECK ("status" IN ('pending', 'reviewed', 'approved', 'rejected')),
  ADD COLUMN IF NOT EXISTS "rep_id" TEXT REFERENCES "reps"("id") ON DELETE SET NULL;

ALTER TABLE "AffiliateApplication"
  ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'pending'
    CHECK ("status" IN ('pending', 'reviewed', 'approved', 'rejected')),
  ADD COLUMN IF NOT EXISTS "affiliate_id" TEXT;

-- ============================================================
-- CMS
-- ============================================================
CREATE TABLE IF NOT EXISTS "cms_users" (
  "id"            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "name"          TEXT NOT NULL,
  "email"         TEXT NOT NULL UNIQUE,
  "password_hash" TEXT NOT NULL,
  "plan"          TEXT NOT NULL DEFAULT 'free' CHECK ("plan" IN ('free', 'starter', 'pro', 'enterprise')),
  "status"        TEXT NOT NULL DEFAULT 'active' CHECK ("status" IN ('active', 'suspended')),
  "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "cms_sites" (
  "id"             TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "user_id"        TEXT NOT NULL REFERENCES "cms_users"("id") ON DELETE CASCADE,
  "name"           TEXT NOT NULL,
  "slug"           TEXT NOT NULL UNIQUE,
  "custom_domain"  TEXT,
  "status"         TEXT NOT NULL DEFAULT 'active' CHECK ("status" IN ('active', 'suspended')),
  "created_at"     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "cms_collections" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "site_id"     TEXT NOT NULL REFERENCES "cms_sites"("id") ON DELETE CASCADE,
  "name"        TEXT NOT NULL,
  "slug"        TEXT NOT NULL,
  "schema"      JSONB NOT NULL DEFAULT '[]',
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "cms_entries" (
  "id"            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "collection_id" TEXT NOT NULL REFERENCES "cms_collections"("id") ON DELETE CASCADE,
  "data"          JSONB NOT NULL DEFAULT '{}',
  "status"        TEXT NOT NULL DEFAULT 'draft' CHECK ("status" IN ('draft', 'published')),
  "published_at"  TIMESTAMPTZ,
  "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "cms_media" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "site_id"     TEXT NOT NULL REFERENCES "cms_sites"("id") ON DELETE CASCADE,
  "filename"    TEXT NOT NULL,
  "url"         TEXT NOT NULL,
  "size"        INTEGER,
  "mime_type"   TEXT,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "cms_forms" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "site_id"     TEXT NOT NULL REFERENCES "cms_sites"("id") ON DELETE CASCADE,
  "name"        TEXT NOT NULL,
  "fields"      JSONB NOT NULL DEFAULT '[]',
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "cms_form_submissions" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "form_id"     TEXT NOT NULL REFERENCES "cms_forms"("id") ON DELETE CASCADE,
  "data"        JSONB NOT NULL DEFAULT '{}',
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "cms_api_keys" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "site_id"     TEXT NOT NULL REFERENCES "cms_sites"("id") ON DELETE CASCADE,
  "key"         TEXT NOT NULL UNIQUE,
  "label"       TEXT,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "cms_webhooks" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "site_id"     TEXT NOT NULL REFERENCES "cms_sites"("id") ON DELETE CASCADE,
  "url"         TEXT NOT NULL,
  "events"      TEXT[] NOT NULL DEFAULT '{}',
  "secret"      TEXT,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "cms_team_members" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "site_id"     TEXT NOT NULL REFERENCES "cms_sites"("id") ON DELETE CASCADE,
  "user_id"     TEXT NOT NULL REFERENCES "cms_users"("id") ON DELETE CASCADE,
  "role"        TEXT NOT NULL DEFAULT 'editor' CHECK ("role" IN ('owner', 'editor', 'viewer')),
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- AI WEBSITE BUILDER
-- ============================================================
CREATE TABLE IF NOT EXISTS "ai_builds" (
  "id"              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "cms_user_id"     TEXT NOT NULL REFERENCES "cms_users"("id") ON DELETE CASCADE,
  "business_name"   TEXT NOT NULL,
  "logo_url"        TEXT,
  "template"        TEXT,
  "style"           JSONB NOT NULL DEFAULT '{}',
  "status"          TEXT NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'processing', 'complete', 'failed')),
  "zip_url"         TEXT,
  "created_at"      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- HOSTED WEBSITES
-- ============================================================
CREATE TABLE IF NOT EXISTS "hosted_sites" (
  "id"             TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "cms_user_id"    TEXT NOT NULL REFERENCES "cms_users"("id") ON DELETE CASCADE,
  "name"           TEXT NOT NULL,
  "subdomain"      TEXT NOT NULL UNIQUE,
  "custom_domain"  TEXT,
  "status"         TEXT NOT NULL DEFAULT 'active' CHECK ("status" IN ('active', 'suspended')),
  "created_at"     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "hosted_pages" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "site_id"     TEXT NOT NULL REFERENCES "hosted_sites"("id") ON DELETE CASCADE,
  "title"       TEXT NOT NULL,
  "slug"        TEXT NOT NULL,
  "content"     JSONB NOT NULL DEFAULT '{}',
  "status"      TEXT NOT NULL DEFAULT 'draft' CHECK ("status" IN ('draft', 'published')),
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "hosted_blog_posts" (
  "id"            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "site_id"       TEXT NOT NULL REFERENCES "hosted_sites"("id") ON DELETE CASCADE,
  "title"         TEXT NOT NULL,
  "slug"          TEXT NOT NULL,
  "content"       JSONB NOT NULL DEFAULT '{}',
  "status"        TEXT NOT NULL DEFAULT 'draft' CHECK ("status" IN ('draft', 'published')),
  "published_at"  TIMESTAMPTZ,
  "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "hosted_media" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "site_id"     TEXT NOT NULL REFERENCES "hosted_sites"("id") ON DELETE CASCADE,
  "filename"    TEXT NOT NULL,
  "url"         TEXT NOT NULL,
  "size"        INTEGER,
  "mime_type"   TEXT,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
;

CREATE TABLE IF NOT EXISTS "hosted_forms" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "site_id"     TEXT NOT NULL REFERENCES "hosted_sites"("id") ON DELETE CASCADE,
  "name"        TEXT NOT NULL,
  "fields"      JSONB NOT NULL DEFAULT '[]',
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "hosted_form_submissions" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "form_id"     TEXT NOT NULL REFERENCES "hosted_forms"("id") ON DELETE CASCADE,
  "data"        JSONB NOT NULL DEFAULT '{}',
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "hosted_seo" (
  "id"           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "page_id"      TEXT NOT NULL REFERENCES "hosted_pages"("id") ON DELETE CASCADE,
  "title"        TEXT,
  "description"  TEXT,
  "og_image"     TEXT,
  "created_at"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MULTI-TENANT END USER SYSTEM
-- ============================================================
CREATE TABLE IF NOT EXISTS "end_user_roles" (
  "id"               TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "hosted_site_id"   TEXT NOT NULL REFERENCES "hosted_sites"("id") ON DELETE CASCADE,
  "name"             TEXT NOT NULL,
  "permissions"      JSONB NOT NULL DEFAULT '{}',
  "dashboard_layout" JSONB NOT NULL DEFAULT '{}',
  "created_at"       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "end_users" (
  "id"              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "hosted_site_id"  TEXT NOT NULL REFERENCES "hosted_sites"("id") ON DELETE CASCADE,
  "role_id"         TEXT REFERENCES "end_user_roles"("id") ON DELETE SET NULL,
  "name"            TEXT NOT NULL,
  "email"           TEXT NOT NULL,
  "password_hash"   TEXT NOT NULL,
  "status"          TEXT NOT NULL DEFAULT 'active' CHECK ("status" IN ('active', 'suspended')),
  "created_at"      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE ("hosted_site_id", "email")
);

-- ============================================================
-- AFFILIATE SYSTEM
-- ============================================================
CREATE TABLE IF NOT EXISTS "affiliates" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "name"        TEXT NOT NULL,
  "email"       TEXT NOT NULL UNIQUE,
  "phone"       TEXT,
  "company"     TEXT,
  "ref_code"    TEXT NOT NULL UNIQUE,
  "status"      TEXT NOT NULL DEFAULT 'active' CHECK ("status" IN ('active', 'suspended')),
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE "AffiliateApplication"
  ADD CONSTRAINT "fk_affiliate" FOREIGN KEY ("affiliate_id")
  REFERENCES "affiliates"("id") ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS "affiliate_referrals" (
  "id"               TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "affiliate_id"     TEXT NOT NULL REFERENCES "affiliates"("id") ON DELETE CASCADE,
  "submission_id"    TEXT NOT NULL,
  "submission_type"  TEXT NOT NULL,
  "status"           TEXT NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'confirmed', 'paid')),
  "amount"           NUMERIC(12, 2),
  "created_at"       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "affiliate_payouts" (
  "id"            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "affiliate_id"  TEXT NOT NULL REFERENCES "affiliates"("id") ON DELETE CASCADE,
  "amount"        NUMERIC(12, 2) NOT NULL,
  "currency"      TEXT NOT NULL DEFAULT 'USD',
  "status"        TEXT NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'processing', 'paid')),
  "paid_at"       TIMESTAMPTZ,
  "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- BILLING
-- ============================================================
CREATE TABLE IF NOT EXISTS "invoices" (
  "id"            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "cms_user_id"   TEXT NOT NULL REFERENCES "cms_users"("id") ON DELETE CASCADE,
  "amount"        NUMERIC(12, 2) NOT NULL,
  "currency"      TEXT NOT NULL DEFAULT 'USD',
  "status"        TEXT NOT NULL DEFAULT 'draft' CHECK ("status" IN ('draft', 'sent', 'paid', 'overdue')),
  "paystack_ref"  TEXT,
  "stripe_ref"    TEXT,
  "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "subscriptions" (
  "id"                    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "cms_user_id"           TEXT NOT NULL REFERENCES "cms_users"("id") ON DELETE CASCADE,
  "plan"                  TEXT NOT NULL,
  "status"                TEXT NOT NULL DEFAULT 'active' CHECK ("status" IN ('active', 'cancelled', 'past_due')),
  "current_period_start"  TIMESTAMPTZ,
  "current_period_end"    TIMESTAMPTZ,
  "created_at"            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_reps_ref_code ON "reps"("ref_code");
CREATE INDEX IF NOT EXISTS idx_rep_referrals_rep_id ON "rep_referrals"("rep_id");
CREATE INDEX IF NOT EXISTS idx_rep_commissions_rep_id ON "rep_commissions"("rep_id");
CREATE INDEX IF NOT EXISTS idx_rep_payouts_rep_id ON "rep_payouts"("rep_id");
CREATE INDEX IF NOT EXISTS idx_cms_sites_user_id ON "cms_sites"("user_id");
CREATE INDEX IF NOT EXISTS idx_cms_collections_site_id ON "cms_collections"("site_id");
CREATE INDEX IF NOT EXISTS idx_cms_entries_collection_id ON "cms_entries"("collection_id");
CREATE INDEX IF NOT EXISTS idx_cms_media_site_id ON "cms_media"("site_id");
CREATE INDEX IF NOT EXISTS idx_hosted_sites_subdomain ON "hosted_sites"("subdomain");
CREATE INDEX IF NOT EXISTS idx_hosted_pages_site_id ON "hosted_pages"("site_id");
CREATE INDEX IF NOT EXISTS idx_hosted_blog_posts_site_id ON "hosted_blog_posts"("site_id");
CREATE INDEX IF NOT EXISTS idx_end_users_site_id ON "end_users"("hosted_site_id");
CREATE INDEX IF NOT EXISTS idx_affiliates_ref_code ON "affiliates"("ref_code");
CREATE INDEX IF NOT EXISTS idx_affiliate_referrals_affiliate_id ON "affiliate_referrals"("affiliate_id");
CREATE INDEX IF NOT EXISTS idx_invoices_cms_user_id ON "invoices"("cms_user_id");
CREATE INDEX IF NOT EXISTS idx_subscriptions_cms_user_id ON "subscriptions"("cms_user_id");

-- Done.