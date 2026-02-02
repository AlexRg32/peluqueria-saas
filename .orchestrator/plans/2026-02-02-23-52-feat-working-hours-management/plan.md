# Plan de Implementación: Gestión de Horarios

## Fase 1: Backend (Infraestructura)

- [x] **Modificar Modelo**: Actualizar `WorkingHour.java` para permitir `user_id` nulo y corregir nombres de campos si es necesario (ej: `is_day_off` -> `dayOff`).
- [x] **Crear Repositorio**: `WorkingHourRepository` con búsquedas por enterprise y user.
- [x] **Crear DTOs**: `WorkingHourRequest` (usamos `WorkingHourDTO`).
- [x] **Crear Servicio**: `WorkingHourService`.
- [x] **Crear Controlador**: `WorkingHourController`.

## Fase 2: Frontend (Servicios y UI)

- [x] **Servicio API**: Crear `workingHourService.ts`.
- [x] **Componente Compartido**: Crear `WorkingHourSettings.tsx` que maneje la lógica de edición de los 7 días.
- [x] **Pantalla Empresa**: Integrar la nueva pestaña en `Enterprises.tsx`.
- [x] **Pantalla Personal**: Añadir botón de horarios en `EmployeeTable.tsx` y el modal correspondiente.

## Fase 3: Pulido y Estética

- [x] **Feedback Visual**: Añadir loaders y toasts para el guardado.
- [x] **Estilos Premium**: Asegurar que los inputs de tiempo y los toggles sigan la estética de la app.
- [x] **Verificación**: Comprobar que los horarios se guardan correctamente para empresa vs empleados individuales.
