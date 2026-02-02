# Investigación: Gestión de Horarios

## 1. Contexto Backend

- **Modelo**: `WorkingHour.java` ya existe con los campos: `id`, `day`, `startTime`, `endTime`, `is_day_off`, `enterprise`, `user`.
- **Relación**: El modelo actual obliga a que cada horario esté vinculado a un `user` (`nullable = false`).
- **Problema**: No hay horarios "generales" de la empresa. Todo se gestiona por empleado.
- **Solución propuesta**:
    1. Modificar `WorkingHour.java` para que `user` sea opcional (`nullable = true`). Un `WorkingHour` con `user == null` representará el horario de apertura general del negocio.
    2. Crear `WorkingHourRepository`.
    3. Crear `WorkingHourService` con métodos para:
        - Obtener horarios por `enterpriseId` (para el negocio).
        - Obtener horarios por `userId` (para empleados).
        - Sincronizar/Garantizar que existan registros para los 7 días de la semana para evitar errores de UI.
    4. Crear `WorkingHourController`.

## 2. Contexto Frontend

- **Ubicación A (Negocio)**: En `Enterprises.tsx`, añadir una pestaña "Horarios" para configurar cuándo abre la peluquería en general.
- **Ubicación B (Personal)**: En `Users.tsx` (o dentro del `EmployeeModal.tsx`), añadir acceso a "Configurar Horario" para cada empleado.
- **UI/UX**: Una tabla o lista de los 7 días (Lunes a Domingo) con:
  - Toggle de "Cerrado/Libre".
  - Input de "Apertura" y "Cierre".
  - Botón de "Copiar a todos los días".

## 3. Integración con Citas

- Aunque la tarea principal es la *gestión*, en el futuro (o si sobra tiempo) el `AppointmentService` debería validar que la cita cae dentro del horario del empleado. Por ahora, nos enfocaremos en la CRUD y la UI de gestión.

## 4. Preguntas de Diseño

- ¿Deberían los empleados heredar el horario de la empresa por defecto?
  - *Decisión*: Sí, al crear un empleado o al inicializar su horario, podemos usar el de la empresa como base.
