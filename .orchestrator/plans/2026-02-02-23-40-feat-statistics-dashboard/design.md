# Design: Statistics Dashboard

## Visual Concept

A "Premium Management Hub" look. High contrast between text and clean backgrounds, subtle gradients, and rounded corners (3xl).

## Layout

1. **Header**: Welcome message (e.g., "Hola, [Nombre]! Aquí tienes el resumen de hoy") and a date range picker (future).
2. **Stat Row**: 4 cards:
    - Total Mensual (Revenue)
    - Citas Totales (Count)
    - Nuevos Clientes (Count)
    - Tasa de Ocupación (%)
3. **Main Grid**:
    - **Left (2/3)**: Line chart for "Ingresos de los últimos 7-30 días".
    - **Right (1/3)**: Bar chart or List for "Servicios más Populares".
4. **Bottom Row**:
    - **Left (1/2)**: Recent Activity (Table).
    - **Right (1/2)**: Employee performance (Mini avatars with appointment counts).

## UI Tokens

- **Background**: `bg-slate-50`
- **Cards**: `bg-white`, `shadow-xl shadow-slate-200/50`, `rounded-3xl`, `border border-slate-100`
- **Typography**: Inter/Outfit. Bold headers, clean slate-500 secondary text.
- **Animations**: Subtle `y: 20 -> 0` entry for cards using `framer-motion`.

## Reference Mockup

(I will generate an image to visualize this)

---
*Created by @architect*
