# Architecture

Source: sections 9–15 of `Wenza_StartUp_initial_proposal_UPDATED_v2.docx` and its embedded diagram, preserved as [proposal-architecture.png](proposal-architecture.png).

## Foundation decisions

- npm workspaces keep the web, API and schema in one repository with one lockfile.
- Next.js owns public pages and role-specific web experiences. NestJS owns business rules and persistence.
- One modular backend starts the project. Module folders represent business boundaries, not separately deployed microservices.
- PostgreSQL is authoritative. Redis is for temporary state and queues; S3-compatible storage will hold media.
- BullMQ workers will run through a separate entry point within the API codebase when the first asynchronous workflow exists.
- Provider adapters isolate social data, payments, AI, storage and notifications. No provider is connected yet.
- Gemini is a candidate for brief parsing. Deterministic eligibility and ranking stay in the matching module.

## Planned module ownership

| Module | Owns |
| --- | --- |
| identity | Authentication, user roles, session lifecycle and authorization |
| creators | Profiles, portfolio, categories, qualification and media kits |
| organizations | Brands, institutions, memberships and verification |
| discovery | Read models and creator filters |
| opportunities | Opportunity publication, applications and invitations |
| campaigns | Agreements, deliverables, approvals and collaboration state |
| messaging | Restricted commercial conversations |
| matching | Eligibility filters, scoring and brief parsing orchestration |
| payments | Payment events, commission snapshots, ledger, earnings and payouts |
| notifications | Notification preferences and delivery orchestration |
| admin | Verification review, moderation and dispute operations |
| audit | Traceable business and financial actions |

Only health is an active Nest module today. Domain directories document intended ownership; they do not expose unfinished endpoints.

## Rules to preserve during implementation

1. Audience accounts cannot initiate private creator messages. Organization verification and membership authorization must be checked server-side for commercial contact.
2. A user role alone does not establish organization authority. Every organization operation must verify membership and scope.
3. Social handles are user input; metrics are fetched through permitted integrations. Store provider provenance and freshness. Combined followers are not unique audience reach.
4. Payment amounts use integer minor units with explicit currency. Store the commission terms applicable to each transaction. The initial schema intentionally excludes financial tables until the ledger workflow is designed.
5. Payment webhooks require signature verification, unique event IDs and transactional processing. Payout retries must never cause duplicate transfers.
6. Social credentials and payout destinations need protected storage. Secrets must not appear in logs or public API responses.
7. Kenya is the launch market. Persist explicit country and language data; use UTC timestamps and explicit currency when financial records are introduced.

## Initial data model limitations

The schema covers users, creator profiles, social accounts and metric snapshots, organizations and memberships. It is a draft foundation, not an approved complete ERD. Authentication identities, membership permissions, audit records, consent, qualification history and campaign/financial models are subsequent work. Role assignment must not be accepted from public registration input. An empty role list grants no access.

## Framework references

- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
- [NestJS first steps](https://docs.nestjs.com/first-steps)
- [Prisma 7 migration and configuration](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7)

Framework versions are resolved in the root lockfile; Node 24 is the project runtime.
