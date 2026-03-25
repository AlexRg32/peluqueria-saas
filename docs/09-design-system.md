# 🎨 Sistema de Diseño y UI

La identidad visual de **Saloria** busca transmitir elegancia, exclusividad y limpieza.

## 🌈 Paleta de Colores

Utilizamos variables CSS nativas definidas en el `@theme` de Tailwind 4.

| Token | Valor Hex | Uso Principal |
| :--- | :--- | :--- |
| `--color-brand-primary` | `#c5a059` (Dorado) | Botones principales, acentos activos, bordes destacados. |
| `--color-brand-secondary` | `#ecd3a5` (Crema) | Fondos secundarios, hovers suaves. |
| `--color-brand-accent` | `#1e293b` (Slate 800) | Textos principales, elementos de navegación oscuros. |
| `--color-brand-bg` | `#0f172a` (Slate 900) | Fondos oscuros, modo noche o secciones footer. |
| `--color-brand-surface` | `#f8fafc` (Slate 50) | Fondo general de la aplicación (Modo claro). |

## 🔠 Tipografía

La aplicación mantiene la fuente del sistema para el producto y formularios, e introduce una fuente display para reforzar el tono editorial de la marca en home y auth.

- **Títulos marketing/auth**: `font-display` (`Jost`) para hero headlines, accesos y mensajes de marca.
- **Cuerpo y producto**: `font-sans text-slate-800`.
- **Monospace**: Para datos técnicos o IDs.

## 🧱 Componentes Base

### Botones (`Button.tsx`)

- **Primary**: Fondo dorado (`brand-primary`) con texto blanco/oscuro.
- **Outline**: Borde dorado, fondo transparente.
- **Ghost**: Sin borde ni fondo hasta hover.

### Tarjetas (`Card.tsx`)

- Fondo blanco (`#ffffff`).
- Borde sutil (`border-slate-100`).
- Sombra suave (`shadow-sm` o `--shadow-brand`).
- `border-radius: 1rem` (`--radius-xl`).

### Inputs

- Fondo `slate-50`.
- Borde `slate-200` en reposo.
- Borde `brand-primary` + `ring` dorado en foco.

## 📏 Espaciado y Layout

- **Container**: Centrado con `max-width-7xl`.
- **Grid**: Uso extensivo de CSS Grid para el dashboard.
- **Flex**: Para alineación de componentes UI.
- **Padding**: Múltiplos de 4px (Tailwind standard).
