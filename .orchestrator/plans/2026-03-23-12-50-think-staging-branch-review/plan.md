# Plan: staging-branch-review

> WARNING: This plan is strictly theoretical. No source code files have been modified.

> Goal: decidir si retirar `staging` y, si se retira, hacerlo sin romper despliegues ni automatizaciones.
> Architecture: simplificacion de ramas hacia `feature -> main` con validacion previa fuera de una rama intermedia.

## Foundation

- [ ] **Task 1: Inventariar dependencias externas de `staging`** — `GitHub`, `Render`, `Vercel`
  - What: Confirmar rama por defecto del repo, servicios ligados a `staging`, hooks o aliases que dependan de ella.
  - Verify: Lista cerrada de dependencias externas con propietario y accion requerida.

- [ ] **Task 2: Definir gate alternativo a preproduccion** — `operativa`
  - What: Decidir si la validacion previa queda en previews por branch, PR checks o un entorno efimero.
  - Verify: Flujo escrito en 3-5 pasos sin ambigüedad.

## Core

- [ ] **Task 3: Adaptar workflows del repo** — `.agent/`, `AGENTS.md`, `docs/07-infraestructura.md`
  - What: Sustituir referencias a `staging` por el nuevo flujo elegido.
  - Verify: `rg -n "\\bstaging\\b"` solo devuelve referencias historicas o justificadas.

- [ ] **Task 4: Reconfigurar IaC y despliegues** — `render.yaml`
  - What: Eliminar o reciclar el servicio staging y dejar `main` como rama estable unica.
  - Verify: IaC y dashboards coinciden con el flujo documentado.

## Integration & Polish

- [ ] **Task 5: Cerrar divergencias Git antes del cambio** — `main`, `staging`, `origin/HEAD`
  - What: Alinear `staging` con `main` o congelarla para que no arrastre ruido historico.
  - Verify: `git rev-list --left-right --count main...staging` y su equivalente remoto quedan en `0 0` antes de eliminarla.

- [ ] **Task 6: Retirar la rama de integracion** — `git host + local clones`
  - What: Cambiar default branch si hace falta, borrar `staging` y actualizar scripts locales.
  - Verify: Ninguna automatizacion intenta hacer checkout/push/compare contra `staging`.
