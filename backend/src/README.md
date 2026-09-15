# Backend implementation conventions

Business code belongs in `modules/<domain>`. A feature normally adds its Nest module, controller, validated DTOs, application service and domain rules together. Avoid creating unused generic repositories or base classes.

Controllers handle transport and authorization; application services coordinate work; domain rules remain independently testable. Access another domain through its exported service, not by importing private implementation details.

Before introducing constructor-injected services, replace the lightweight `tsx` development runner with a compiler-backed Nest watch runner: esbuild does not emit TypeScript decorator metadata. Production builds already use TypeScript with metadata enabled.

Before adding protected routes, implement authentication and deny-by-default permission checks. The only existing route is public process liveness. Add request DTO validation and a consistent error format with the first input endpoint.

Use a PostgreSQL adapter with the generated Prisma 7 client when connecting persistence. Add database readiness separately from process liveness. Add meaningful integration tests for authorization boundaries, organization isolation and state transitions as those features are implemented.
