# Smile+ Clinic SaaS API

## Milestone 1 Contract

No API route handlers are implemented in Milestone 1. The application will use Next.js App Router route handlers under `app/api/`, with business and integration logic kept in `lib/`.

## Planned Domains

- `auth`: login, session refresh, and logout
- `patients`: patient records and search
- `appointments`: public booking and staff scheduling
- `invoices`: billing, payments, and invoice documents
- `reports`: monthly aggregations and exports
- `uploads`: controlled clinical file uploads

All future mutation endpoints must validate input with Zod, enforce RBAC, return consistent error shapes, and keep Prisma access on the server.
