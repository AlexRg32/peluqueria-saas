# Design: Back to Landing Navigation

## Component Specification: `BackToHomeLink`

A reusable component (or inline implementation since it's only 2 pages) that provides exit navigation.

### Visual Styles

#### 1. Light Theme (Client)

- **Base**: `text-slate-600 font-bold flex items-center gap-2 px-4 py-2 rounded-xl transition-all`
- **Hover**: `hover:bg-slate-100 hover:text-slate-900`
- **Icon**: `w-5 h-5`

#### 2. Dark Theme (Pro)

- **Base**: `text-slate-400 font-bold flex items-center gap-2 px-4 py-2 rounded-xl transition-all`
- **Hover**: `hover:bg-white/10 hover:text-white`
- **Icon**: `w-5 h-5`

### Implementation Strategy

Add the link directly to `ClientLoginPage.tsx` and `ProLoginPage.tsx` within the relative container.

```tsx
<Link 
  to="/" 
  className="absolute top-6 left-6 lg:top-10 lg:left-10 z-50 flex items-center gap-2 font-bold text-slate-600 hover:text-slate-900 transition-colors"
>
  <ArrowLeft className="w-5 h-5" />
  <span>Volver al inicio</span>
</Link>
```
