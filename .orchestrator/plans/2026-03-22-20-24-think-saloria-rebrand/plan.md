# Plan: Saloria Rebrand

> WARNING: This plan was produced via the repo's think-first workflow and then used as the blueprint for implementation.

> Goal: Replace the legacy `Peluquería SaaS` brand with `Saloria` across the project while keeping the repository buildable.
> Architecture: Cross-cutting metadata and namespace rename across frontend, backend, docs, and deployment descriptors.

## Foundation

- [ ] **Task 1: Rebrand planning artifacts and create a safe branch** — `.orchestrator/plans/...`, git branch`
  - What: Record investigation/design/plan, then move implementation off `staging` into a feature branch.
  - Verify: Plan files exist and `git branch --show-current` is not `staging` or `main`.

- [ ] **Task 2: Update core app metadata** — `README.md`, `peluqueria-client/index.html`, `peluqueria-client/public/manifest.json`, `peluqueria-client/package.json`, `peluqueria-api/pom.xml`, `peluqueria-api/src/main/resources/application.properties`
  - What: Replace the old product name in top-level metadata and package descriptors.
  - Verify: Search results for `Peluquería SaaS`, `Peluqueria SaaS`, and `peluqueria-ui` return no hits in source/config/docs.

## Core

- [ ] **Task 3: Rebrand UI copy** — `peluqueria-client/src/**/*`
  - What: Update visible fallback labels and product mentions to `Saloria`.
  - Verify: Targeted search shows old brand strings removed from frontend source.

- [ ] **Task 4: Rename backend Java namespace** — `peluqueria-api/src/{main,test}/java/com/peluqueria/**`
  - What: Move the package tree to `com.saloria`, rename the application class, and update imports/package declarations.
  - Verify: Maven tests compile and run successfully.

- [ ] **Task 5: Rebrand deployment descriptors and repo references** — `render.yaml`, `docker-compose.yml`, `deploy/raspberry/*`, `DEPLOYMENT.md`
  - What: Replace branded service/container identifiers and references where the project advertises or scaffolds deployment identity.
  - Verify: Search for `peluqueria-saas` and `peluqueria_` in deployment files only leaves intentional legacy notes, if any.

## Integration & Polish

- [ ] **Task 6: Update project documentation** — `docs/*`, `.agent/contexts/project-domain.md`
  - What: Rewrite documentation to describe the platform as `Saloria` and reflect any package/infra changes.
  - Verify: Docs searches no longer show stale primary branding except where documenting legacy live infrastructure explicitly.

- [ ] **Task 7: Validate and summarize residual follow-up** — search + tests
  - What: Run backend/frontend checks and a final stale-brand audit.
  - Verify: Tests pass, searches are clean, and any unavoidable manual follow-up is documented.
