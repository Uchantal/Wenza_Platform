# Development scripts

Shared development and maintenance tooling lives here. `docker/compose.yml` starts local PostgreSQL and Redis through the root `npm run infra:up` command; `npm run infra:down` stops them without deleting their data.
