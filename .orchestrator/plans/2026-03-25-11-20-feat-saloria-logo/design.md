# Design: Saloria Logo Integration

## Architecture Overview
El cambio se resuelve enteramente en frontend. El logo vive como asset público SVG y se consume desde un componente liviano que abstrae la elección entre wordmark completo y marca compacta.

## Component Design
### Component Tree
BrandLogo
|- ClientPortalLayout
|- Sidebar
|- Navigation
|- ClientLoginPage
|- ClientRegisterPage
|- ProLoginPage
`- ProRegisterPage

### State Management
- Local state: none.
- Server state: none.

## File Structure
saloria-client/
|- public/
|  |- saloria-logo.svg
|  `- saloria-mark.svg
`- src/components/branding/
   `- BrandLogo.tsx

## Dependencies
- New packages: none.
- Existing packages used: React, Vite static asset serving.

## Testing Strategy
- Unit: no lógica crítica nueva.
- Integration: compilar frontend y revisar los layouts que renderizan marca.
