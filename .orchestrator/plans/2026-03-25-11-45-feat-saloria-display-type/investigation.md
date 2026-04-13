# Investigation: Saloria Display Typography

## Summary
El wordmark del logo tiene una personalidad geométrica y ligera que chocaba con los titulares actuales de sistema. La mejora debe alinear home y auth con la marca sin alterar la tipografía funcional del producto.

## Current State
- **Tech Stack**: React + TypeScript + Tailwind 4 + Vite.
- **Relevant Code**: `src/index.css`, `features/client-portal/components/MarketplaceHero.tsx`, `features/auth/pages/*`, `features/auth/components/*`.
- **Architecture**: layouts públicos y auth separados del producto interno.

## Requirements
### Functional
- [x] Introducir una fuente display de marca.
- [x] Limitar su uso a hero/auth.
- [x] Mantener el resto del producto con tipografía actual.

### Non-Functional
- Performance: carga ligera y solo una familia externa.
- Consistency: uso centralizado mediante una utility CSS.

## Recommendation
Definir `font-display` en `index.css` y aplicarla únicamente a titulares de home/auth para acercar la UI al logo sin rehacer la identidad completa del producto.
