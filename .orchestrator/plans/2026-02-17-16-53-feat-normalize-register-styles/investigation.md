# Investigation: Normalize Register Styles & Home Link

## Objective

Harmonize the visual identity of Client and Pro registration experiences while adding a "Back to Home" navigation link.

## Page Analysis

### 1. Client Register Page & Form

- **Current Status**: Already has a split layout, but could use refinement.
- **Form Style**: Semi-transparent white (`bg-white/80`), `rounded-3xl`.
- **Missing**: "Back to Home" navigation link.

### 2. Pro Register Page & Form

- **Current Status**: Centered layout, dark theme.
- **Form Style**: Dark solid (`bg-[#1e293b]`), `rounded-2xl`.
- **Missing**: Split layout (needs marketing text), "Back to Home" navigation link.

## Identified Inconsistencies

- **Layout**: Client uses split view; Pro uses centered view.
- **Rounding**: Inconsistent `rounded-3xl` vs `rounded-2xl`.
- **Inputs**: Formatting and padding differs from the new normalized login style.

## Proposed Strategy

1. **Shared Layout Pattern**: Implement the split layout for Pro registration to match the login architecture.
2. **Back to Home Link**: Add the `ArrowLeft` navigation link to both pages at `top-6 left-6`.
3. **Geometry Normalization**: Apply `rounded-3xl` to forms and `rounded-2xl` to inputs/buttons.
4. **Theme Alignment**: Use the "Luminous" theme for clients and "Nocturnal" (dark) theme for pros, matching the login modules.
