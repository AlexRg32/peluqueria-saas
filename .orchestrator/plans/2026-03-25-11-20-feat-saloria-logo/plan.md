# Plan: Saloria Logo Integration

> Goal: aplicar el nuevo logo en los puntos clave del frontend.
> Architecture: assets SVG + componente reutilizable.

## Foundation

- [x] **Task 1: Crear assets del logo** — `saloria-client/public/*`
  - What: añadir una versión compacta y una versión completa en SVG.
  - Verify: abrir los assets en build y comprobar que resuelven desde `/`.

- [x] **Task 2: Crear componente de branding** — `saloria-client/src/components/branding/BrandLogo.tsx`
  - What: encapsular la referencia al logo completo o compacto.
  - Verify: importar el componente sin errores de TypeScript.

## Core

- [x] **Task 3: Reemplazar marca en layouts** — `ClientPortalLayout.tsx`, `Sidebar.tsx`, `Navigation.tsx`
  - What: sustituir iconos/texto actuales por el logo.
  - Verify: render correcto en cabecera pública, footer y panel.

- [x] **Task 4: Reforzar branding en auth** — `features/auth/pages/*`
  - What: mostrar el logo en desktop y mobile en login/registro cliente y business.
  - Verify: layouts sin solapes en ambas variantes.

## Finish

- [x] **Task 5: Conectar favicon y manifest** — `index.html`, `manifest.json`
  - What: usar el logo como icono de la app web.
  - Verify: build sin errores y referencias correctas a SVG.
