# Investigation: Saloria Rebrand

## Summary
The request is to replace the placeholder product name with `Saloria` across the project as completely as practical, covering user-facing branding, project metadata, documentation, deployment descriptors, and internal identifiers that materially shape the product identity.

## Current State
- **Tech Stack**: Spring Boot 3 + Java 21 backend, React + Vite frontend, Docker Compose, Render, Vercel, Supabase.
- **Relevant Code**: `README.md`, `docs/`, `render.yaml`, `docker-compose.yml`, `deploy/raspberry/`, `peluqueria-client/`, `peluqueria-api/`.
- **Architecture**: Monorepo with separate backend and frontend apps plus deployment/docs folders.

## Requirements
### Functional
- [ ] Replace visible product branding with `Saloria`.
- [ ] Update technical metadata that still exposes the old brand name.
- [ ] Keep the project buildable after the rename.
- [ ] Update documentation so it reflects the new brand consistently.

### Non-Functional
- Performance: No runtime behavior regressions from the rename.
- Security: Avoid changing live secrets or credentials; only rename identifiers and descriptive metadata.

## Scope
### In Scope
- User-facing strings, page titles, manifest, footer copy, testimonials, docs, local app metadata.
- Deployment descriptors and infrastructure docs where the old brand is presented as the app identity.
- Maven/Spring metadata and Java package namespace if the rename can be done safely in one pass.

### Out of Scope
- Purchasing or configuring new live domains, Vercel projects, Render services, or Supabase projects.
- Editing binary screenshots to overlay the new brand.
- Renaming the outer workspace folder on disk.

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Partial rename leaves stale `peluqueria` identifiers | High | Search by exact brand strings before and after edits. |
| Java package rename breaks imports or test discovery | High | Rename directories coherently and run backend tests. |
| Deployment docs imply resources were renamed live when they were not | Medium | Distinguish between configured code/blueprints and externally provisioned live resources. |
| Over-renaming operational DB/container defaults adds unnecessary churn | Medium | Keep low-value internal DB names unless they materially express the product brand. |

## Recommendation
Adopt a layered rebrand: change all product-facing and configuration-level branding to `Saloria`, rename the Java namespace to `com.saloria` for internal consistency, keep operational defaults like the local database name only if changing them adds churn without meaningful branding value, and clearly document any live infra identifiers that still require manual follow-up.
