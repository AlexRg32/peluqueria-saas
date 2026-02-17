# Investigation: Normalize Login Styles

## Objective

Normalize the login styles for clients and professionals while maintaining their separate identities (light theme for clients, dark theme for pros).

## Component Analysis

### 1. Client Login Page & Form

- **Current Layout**: Split layout (Content left, Form right).
- **Current Theme**: Light (`bg-[#f8fafc]`).
- **Form Style**: White semi-transparent (`bg-white/80`), `rounded-3xl`, high blur, large shadow.
- **Button Style**: Brand primary color, dark text, hover scale effect.
- **Input Style**: Light background, subtle border, focus ring.

### 2. Pro Login Page & Form

- **Current Layout**: Centered layout.
- **Current Theme**: Dark (`bg-[#0f172a]`).
- **Form Style**: Dark semi-transparent (`bg-[#1e293b]`), `rounded-2xl`, border slate-700/50.
- **Button Style**: Brand primary color, dark text, transition effect.
- **Input Style**: Dark background, slate border, focus ring.

## Identified Inconsistencies

1. **Layout**: One is split, the other is centered.
2. **Rounding**: `rounded-3xl` vs `rounded-2xl`.
3. **Typography**: Differing font weights and sizes for headings.
4. **Spacing**: Padding and gaps are slightly different.
5. **Interactive effects**: Focus rings and hover states aren't perfectly aligned.

## Proposed Normalization Strategy

1. **Shared Layout Pattern**: Use the split layout for both to give them a premium, balanced feel.
2. **Standardized Geometry**: Both will use `rounded-3xl` for forms and `rounded-2xl` for inputs/buttons.
3. **Unified Animation Pipeline**: Share the same hover transitions and focus rings.
4. **Themed Variants**: Maintain the light theme for clients and dark theme for pros using consistent CSS patterns.
5. **Shared Logic**: Forms already exist and work, so we focus on CSS normalization.
