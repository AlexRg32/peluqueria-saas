# Design: Unified Register Experience

## Visual Specifications

### 1. "Back to Home" Link

- **Position**: `absolute top-6 left-6 lg:top-10 lg:left-10 z-50`.
- **Component**: `Link` from `react-router-dom` with `ArrowLeft` icon.
- **Client Style**: `text-slate-500 hover:text-slate-900`.
- **Pro Style**: `text-slate-400 hover:text-white`.

### 2. Standardized Forms

Consistent with Login styles:

- **Geometry**: `rounded-3xl` for main card, `rounded-2xl` for children.
- **Client**: `bg-white/80 backdrop-blur-xl`.
- **Pro**: `bg-[#1e293b]/70 backdrop-blur-xl`.
- **Interactive**: Hover effects on buttons, ring focus on inputs.

### 3. Pro split Layout (Marketing panel)

For the Pro registration page, we need content for the left panel:

- **Main Heading**: "Impulsa tu Salón."
- **Focus Points**: Control de citas, Crecimiento, Fidelización.
- **Badging**: "Registro Business".
