# 🖼 Frontend (Cliente Web)

La aplicación web está construida con **React 18** y **TypeScript**, utilizando **Vite** como empaquetador para una experiencia de desarrollo ultrarrápida.

## 📂 Organización del Proyecto

El código fuente en `src/` sigue una estructura híbrida basada en **Features** (Funcionalidades) y **Components** (Reutilizables).

```plaintext
src/
├── features/           # Módulos funcionales autocontenidos
│   ├── auth/           # Login, Registro, Contexto de Auth
│   └── client-portal/  # Página pública de reserva para clientes
├── components/         # Componentes compartidos o específicos de dominio
│   ├── ui/             # Botones, Modales, Inputs (Design System base)
│   ├── calendar/       # Componentes complejos de agenda
│   ├── appointments/   # Formularios de creación/edición de citas
│   ├── customers/      # Listados y detalles de clientes
│   └── settings/       # Configuración de servicios y empleados
├── hooks/              # Custom Hooks (useAuth, useAppointments)
├── context/            # Contextos globales (ThemeContext, etc.)
├── types/              # Definiciones de tipos TypeScript compartidas
└── utils/              # Funciones auxiliares (fechas, formateo moneda)
```

## 🛠 Tecnologías Clave

- **React Router**: Gestión de rutas (`/login`, `/dashboard`, `/agenda`).
- **Tailwind CSS**: Framework de utilidades para estilos rápidos y consistentes.
- **React Hook Form**: Gestión eficiente de formularios grandes.
- **Zod**: Validación de esquemas y datos.
- **TanStack Query (React Query)**: Gestión de estado asíncrono (cacheo de datos del servidor).
- **Lucide React**: Librería de iconos vectoriales ligeros.
- **date-fns**: Manipulación robusta de fechas y horas.

## 🧩 Componentes Principales

### 1. Sistema de Diseño (`components/ui`)

Componentes abstractos que aseguran consistencia visual:

- `Button`: Variantes (primary, outline, ghost).
- `Input`, `Select`: Campos de formulario estandarizados con soporte de errores.
- `Modal`: Ventanas emergentes para confirmaciones.
- `Card`: Contenedores con sombra y borde.

### 2. Calendario Interactivo (`components/calendar`)

El componente más complejo de la aplicación.

- Permite arrastrar y soltar (Drag & Drop) citas.
- Vistas por Día, Semana y Mes.
- Filtrado por profesional.

### 3. Portal del Cliente (`features/client-portal`)

Una aplicación dentro de la aplicación.

- Ruta pública accesible sin login previo.
- Flujo paso a paso (Wizard) para completar una reserva.

## 🔄 Gestión de Estado

La aplicación utiliza dos niveles de estado:

1. **Estado de Servidor (React Query)**: Datos de citas, usuarios y servicios. Se invalida automáticamente tras mutaciones (`POST`, `PUT`, `DELETE`).
2. **Estado de UI (Local State/Context)**: Modal abierto/cerrado, filtro de calendario seleccionado, usuario autenticado (AuthContext).

> [Siguiente: Base de Datos](./06-base-de-datos.md)
