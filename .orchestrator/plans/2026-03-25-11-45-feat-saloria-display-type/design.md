# Design: Saloria Display Typography

## Architecture Overview
La fuente display se configura como token/utility global y se consume solo en titulares de marketing y autenticación.

## File Structure
saloria-client/
|- src/index.css
|- src/features/client-portal/components/MarketplaceHero.tsx
`- src/features/auth/
   |- pages/*
   `- components/*

## Dependencies
- New packages: none.
- External assets: Google Fonts (`Jost`).

## Testing Strategy
- Verificar build y lint.
- Confirmar que solo se modifican encabezados de hero/auth.
