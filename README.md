# Thrinxs Monorepo

Technology & Digital Solutions Platform

## Apps

| App   | URL                      | Port | Description             |
|-------|--------------------------|------|-------------------------|
| web   | thrinxs.com.ng           | 3000 | Main marketing website  |
| cms   | cms.thrinxs.com.ng       | 3001 | CMS dashboard           |
| api   | api.thrinxs.com.ng       | 3002 | Content delivery API    |
| docs  | docs.thrinxs.com.ng      | 3003 | Developer documentation |
| admin | admin.thrinxs.com.ng     | 3004 | Internal admin panel    |

## Quick Start

    pnpm install
    cp .env.example .env
    pnpm db:generate
    pnpm db:push
    pnpm dev

## Stack

Next.js 14, TypeScript, Tailwind CSS, PostgreSQL, Prisma,
Auth.js v5, Supabase, Resend, Paystack, OpenAI, Turborepo, pnpm
