# Investigation: Saloria Logo Integration

## Summary
Integrar el logo proporcionado en los puntos de branding principales del frontend para sustituir la combinación actual de icono genérico + texto y reforzar la identidad visual de Saloria.

## Current State
- **Tech Stack**: React 19 + TypeScript + Vite + Tailwind.
- **Relevant Code**: `saloria-client/src/components/layout/*`, `saloria-client/src/features/auth/pages/*`, `saloria-client/index.html`, `saloria-client/public/manifest.json`.
- **Architecture**: SPA con layouts separados para portal cliente y panel interno.

## Requirements
### Functional
- [x] Añadir un asset reutilizable del logo.
- [x] Mostrar el logo en portal público, auth y panel interno.
- [x] Usar el logo como icono web principal.

### Non-Functional
- Performance: usar SVG liviano y reutilizable.
- Consistency: un único origen para la marca.

## Scope
### In Scope
- Assets SVG del logo.
- Componente reutilizable `BrandLogo`.
- Reemplazo de marca textual/iconográfica existente en frontend.

### Out of Scope
- Rebranding completo de copies o paleta.
- Sustitución de logos dinámicos de negocio.

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| El archivo adjunto no estaba disponible como asset local | Medio | Recrear el logo como SVG utilizable a partir de la referencia visual |
| El wordmark no encaja en mobile | Medio | Usar variante compacta y tamaños responsivos |

## Recommendation
Crear assets SVG públicos y un componente `BrandLogo` para centralizar el branding y reutilizarlo tanto en navegación como en auth y metadatos web.
