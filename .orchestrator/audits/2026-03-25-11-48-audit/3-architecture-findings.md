# 3. Architecture Findings

## High

- Reserva pública incompleta respecto al dominio:
  - [AppointmentService](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/AppointmentService.java#L36) solo controla conflictos horarios, pero no valida jornada laboral, día libre ni ventana real de disponibilidad.
  - El portal B2C queda desacoplado de la política operativa real definida en el proyecto.

- Onboarding profesional incompleto:
  - [AuthenticationService](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/AuthenticationService.java#L39) crea empresas nuevas solo con `name`.
  - [EnterpriseService](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/EnterpriseService.java#L64) solo publica empresas con `slug`.
  - Resultado: un negocio recién registrado no entra en el directorio público ni deja trazada una configuración mínima de perfil.

## Moderate

- Bundle principal sobredimensionado:
  - El build genera un chunk principal de `1,744.70 kB` minificado en frontend.
  - [AppointmentDetailsModal](/Users/alex32/Desktop/peluqueria-saas/saloria-client/src/components/appointments/AppointmentDetailsModal.tsx#L7) concentra una dependencia pesada (`jspdf`) dentro del flujo principal de administración.

- Cobertura insuficiente en rutas críticas de seguridad:
  - Hay tests de [AppointmentServiceTest](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/test/java/com/saloria/service/AppointmentServiceTest.java) y [EnterpriseServiceTest](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/test/java/com/saloria/service/EnterpriseServiceTest.java), pero no encontré pruebas que cubran:
  - takeover de tenant por registro profesional
  - acceso cruzado en servicios por `enterpriseId` + `id`
  - batch mixto o malicioso en horarios
  - validación de cita contra jornada laboral
