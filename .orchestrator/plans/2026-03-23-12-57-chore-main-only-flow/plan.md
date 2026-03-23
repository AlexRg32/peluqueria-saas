# Plan: Main-Only Flow

> Goal: eliminar staging como rama y entorno soportado en el repo.
> Architecture: feature branches desde `main`, integracion directa a `main`, sin promote.

## Foundation

- [x] **Task 1: Actualizar manuales y guias internas** — `AGENTS.md`, `.agent/MANUAL.md`
  - What: cambiar la narrativa del equipo a `main-only`.
  - Verify: no quedan instrucciones que pidan enviar cambios a `staging`.

- [x] **Task 2: Adaptar workflows Git** — `.agent/workflows/forge.md`, `.agent/workflows/ship.md`, `.agent/workflows/pr.md`, `.agent/workflows/promote.md`
  - What: hacer que `forge` parta de `main`, `ship` integre en `main`, `pr` compare contra `main` y eliminar `promote`.
  - Verify: los workflows solo mencionan `main` como rama de integracion.

## Core

- [x] **Task 3: Simplificar IaC** — `render.yaml`
  - What: eliminar el servicio `staging`.
  - Verify: `render.yaml` declara un unico servicio ligado a `main`.

- [x] **Task 4: Reescribir documentacion de despliegue** — `DEPLOYMENT.md`, `docs/01-vision-general.md`, `docs/07-infraestructura.md`
  - What: documentar un unico entorno soportado y la ruta productiva activa.
  - Verify: no quedan tablas o runbooks que describan `staging` como entorno vigente.

## Integration & Polish

- [x] **Task 5: Borrar rama `staging` local y remota** — Git refs
  - What: eliminar la rama una vez comprobado que no aporta trabajo no integrado.
  - Verify: `git branch` y `git ls-remote --heads origin` no muestran `staging`.

- [x] **Task 6: Verificacion final por grep** — repo
  - What: revisar referencias residuales a `staging`.
  - Verify: solo quedan usos no operativos como `vite preview` o comentarios de UI.
