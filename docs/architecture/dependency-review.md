# Dependency review — 2026-09-10

The initial `npm audit` reports seven high-severity affected dependency entries (including parent packages), not seven independent vulnerabilities. These remain unresolved and must be reviewed before production deployment.

| Dependency chain | Finding | Current scope |
| --- | --- | --- |
| NestJS platform-express → multer | Multipart denial-of-service advisories affecting versions below 2.3.0 | No upload endpoints exist yet. Review a supported patched version before adding uploads. |
| Prisma config → deepmerge-ts | Recursive object graph stack exhaustion below 8.0.0 | Development schema/config tooling; configuration is repository controlled. |
| Prisma → mysql2 | Authentication downgrade and compressed-protocol advisories | Transitive tooling dependency; this project uses PostgreSQL and has no MySQL connection. |

The audit offered no automatic NestJS fix and proposed a Prisma major downgrade. No forced downgrade or unverified major-version override was applied. Re-run `npm audit` when updating dependencies; confirm supported patches with upstream maintainers and rerun builds and integration tests. The lockfile preserves the versions that were checked.
