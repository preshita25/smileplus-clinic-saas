# Smile+ Clinic SaaS

Milestone 1 foundation for the Smile+ clinic management platform. The system is planned as a single Next.js application serving the public website, staff dashboard, API routes, and future Android client.

## Stack

- Next.js 15 App Router with TypeScript
- Tailwind CSS and shadcn/ui foundations
- Prisma ORM with PostgreSQL
- ESLint and Prettier

## Development

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Install dependencies with `npm install`.
3. Generate the Prisma client with `npm run db:generate`.
4. Start the development server with `npm run dev`.

Available checks:

```bash
npm run lint
npm run typecheck
npm run format:check
npm run db:validate
```

## Project Structure

The folder layout follows the approved architecture in `docs/PRD.md`. Milestone 1 contains foundation and contracts only; product pages, dashboard screens, business workflows, and seeded data are intentionally deferred.

## Documentation

- [Product requirements](docs/PRD.md)
- [Database design](docs/ERD.md)
- [API conventions](docs/API.md)
