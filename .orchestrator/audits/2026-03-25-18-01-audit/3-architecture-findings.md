# Architecture & Performance Findings

## Findings

1. La regla de negocio principal de reservas no está cerrada en backend: hoy se valida solape, pero no horario laboral real del empleado.
   - Impacto: se pueden aceptar citas fuera de disponibilidad real si el cliente o admin fuerza la fecha.
   - Referencias:
     - Regla documentada: `.agent/contexts/project-domain.md:24-26`
     - Implementación actual: `saloria-api/src/main/java/com/saloria/service/AppointmentService.java:25-56`

2. El frontend calcula slots usando horarios generales y no horarios del empleado seleccionado; además no incorpora duración del servicio ni disponibilidad ya ocupada en el selector.
   - Impacto: UX engañosa y más rechazos del backend cuando endurezcamos la regla.
   - Referencias:
     - `saloria-client/src/components/appointments/CreateAppointmentModal.tsx:36-41`
     - `saloria-client/src/components/ui/DateTimePicker.tsx:74-112`

3. El onboarding profesional deja empresas invisibles para marketplace/perfil público hasta que alguien configure `slug`.
   - Impacto: tenant nuevo no entra realmente en el circuito B2C tras registrarse.
   - Referencias:
     - `saloria-api/src/main/java/com/saloria/service/AuthenticationService.java:42-45`
     - `saloria-api/src/main/java/com/saloria/service/EnterpriseService.java:65-67`

4. El bundle principal del frontend sigue siendo demasiado grande.
   - Evidencia: `npm run build` genera `dist/assets/index-C7LIAjKC.js` de ~1.74 MB minificado y Vite avisa de chunks > 500 kB.
   - Contribuyente probable:
     - `saloria-client/src/components/appointments/AppointmentDetailsModal.tsx:7`

5. El ticket PDF arrastra branding heredado y no usa el nombre real de empresa ni la marca actual.
   - Impacto: inconsistencia de producto y salida poco profesional.
   - Referencia:
     - `saloria-client/src/components/appointments/AppointmentDetailsModal.tsx:47-87`
