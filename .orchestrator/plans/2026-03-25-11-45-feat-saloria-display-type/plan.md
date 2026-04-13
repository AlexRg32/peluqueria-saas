# Plan: Saloria Display Typography

> Goal: acercar la voz visual de home/auth al logo sin tocar la UI funcional.

## Foundation

- [x] **Task 1: Crear utility tipográfica** — `saloria-client/src/index.css`
  - What: añadir familia display y clase reutilizable.
  - Verify: la clase compila y está disponible globalmente.

## Core

- [x] **Task 2: Aplicar display font al hero** — `MarketplaceHero.tsx`
  - What: usar la nueva utility en el titular principal.
  - Verify: no afecta inputs ni copy secundario.

- [x] **Task 3: Aplicar display font en auth** — `features/auth/pages/*`, `features/auth/components/*`
  - What: actualizar titulares de páginas y tarjetas de acceso/registro.
  - Verify: coherencia visual con el wordmark.

## Finish

- [x] **Task 4: Actualizar documentación visual** — `docs/09-design-system.md`
  - What: reflejar el uso mixto de tipografía.
  - Verify: docs alineadas con implementación.
