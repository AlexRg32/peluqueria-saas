# Design: Staging Strategy

## Architecture Overview

The release flow is now: `feature branch` -> `staging branch` -> `main branch`.

- `staging`: Automated deployment to Render (Staging project) and Vercel (Staging URL). Database is PostgreSQL on Render.
- `main`: Automated deployment to Render (Production project) and Vercel (Production URL). Database is PostgreSQL on Supabase.

## Workflow Changes

### 1. Forge Workflow (`.agent/workflows/forge.md`)

- `Phase 0`: Change `git checkout main` to `git checkout staging`.
- `Phase 0`: Change `git pull origin main` to `git pull origin staging`.

### 2. Ship Workflow (`.agent/workflows/ship.md`)

- `Step 1A`: Update warning if on `staging` (instead of `main`).
- `Step 3`: Change `git checkout main` to `git checkout staging`.
- `Step 3`: Change `git pull origin main` to `git pull origin staging`.
- `Step 4`: Change `git push origin main` to `git push origin staging`.

### 3. Promote Workflow (`.agent/workflows/promote.md`)

- `Goal`: Promote validated changes from `staging` to `main`.
- `Flow`: Checkout `main` -> pull -> merge `staging` -> push `main`.

## Documentation Changes

### 1. Infrastructure (`docs/07-infraestructura.md`)

- Replace the single "Entornos de Producción" with a dual table/section for Staging and Production.
- Update CI/CD section to explain the branch mapping.

### 2. General Vision (`docs/01-vision-general.md`)

- Brief mention of environment redundancy for reliability.

## Testing Strategy

- Verify that `/forge` correctly branches off `staging`.
- Verify that `git remote show origin` shows the updated branches.
- Manual check of `docs/07-infraestructura.md` rendering.
