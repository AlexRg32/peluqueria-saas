# 1. Guidelines & Clean Code Findings

## High

- `GET` con efectos secundarios en horarios:
  - [WorkingHourService](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/WorkingHourService.java#L30) y [WorkingHourService](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/WorkingHourService.java#L42) crean registros persistentes cuando un `GET` no encuentra horarios.
  - Esto rompe el principio de lectura sin efectos y complica debugging, concurrencia y auditoría.

- Regla de negocio principal sin implementar:
  - El contexto del repo exige que las citas solo puedan reservarse dentro del horario del empleado en [.agent/contexts/project-domain.md](/Users/alex32/Desktop/peluqueria-saas/.agent/contexts/project-domain.md#L22), pero [AppointmentService](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/AppointmentService.java#L25) solo valida solapes y pertenencia al tenant.

## Moderate

- Validación incoherente entre frontend y backend en el alta profesional:
  - [ProRegisterForm](/Users/alex32/Desktop/peluqueria-saas/saloria-client/src/features/auth/components/pro/ProRegisterForm.tsx#L12) acepta contraseñas de 4 caracteres.
  - [RegisterRequest](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/dto/RegisterRequest.java#L24) exige mínimo 8.

- Carga de PDF en el bundle principal:
  - [AppointmentDetailsModal](/Users/alex32/Desktop/peluqueria-saas/saloria-client/src/components/appointments/AppointmentDetailsModal.tsx#L7) importa `jspdf` de forma eager, lo que empuja dependencias pesadas al chunk principal de frontend.

## Low

- Deriva documental y de contexto:
  - [.agent/contexts/project-domain.md](/Users/alex32/Desktop/peluqueria-saas/.agent/contexts/project-domain.md#L34) sigue diciendo Java 17 / React 18, pero el código real usa Java 21 y React 19.
  - [saloria-client/README.md](/Users/alex32/Desktop/peluqueria-saas/saloria-client/README.md) sigue siendo la plantilla por defecto de Vite.
