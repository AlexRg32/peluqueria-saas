# Investigation: Project Backlog

## Summary

Objetivo: ordenar lo pendiente de todo el proyecto en una secuencia ejecutable, separando claramente seguridad, reglas de negocio, deuda estructural y roadmap de producto.

## Current State

- **Tech Stack**: Spring Boot 3 + Java 21 + PostgreSQL/Flyway en backend; React 19 + Vite + Tailwind en frontend.
- **Relevant Code**:
  - Auth y tenancy: `saloria-api/src/main/java/com/saloria/controller/EnterpriseController.java`, `saloria-api/src/main/java/com/saloria/security/SecurityService.java`
  - Citas y agenda: `saloria-api/src/main/java/com/saloria/service/AppointmentService.java`, `saloria-api/src/main/java/com/saloria/service/WorkingHourService.java`
  - B2C/public: `saloria-api/src/main/java/com/saloria/service/AuthenticationService.java`, `saloria-api/src/main/java/com/saloria/service/EnterpriseService.java`, `saloria-client/src/pages/ProfilePlaceholder.tsx`
  - Frontend session/perf: `saloria-client/src/features/auth/context/AuthContext.tsx`, `saloria-client/src/components/appointments/AppointmentDetailsModal.tsx`
- **Architecture**: monolito por capas en backend y SPA híbrida por dominios/features en frontend.

## Requirements

### Functional

- [x] Mantener aislamiento multi-tenant real.
- [x] Hacer cumplir la disponibilidad real en reservas.
- [x] Dejar a las empresas nuevas en un estado funcional tras el alta.
- [x] Seguir evolucionando el canal cliente y el panel admin.

### Non-Functional

- Seguridad: no exponer datos cross-tenant ni depender de defaults/documentación ambigua.
- Operabilidad: evitar side effects inesperados en endpoints de lectura.
- Rendimiento: reducir chunk principal del frontend.
- Calidad: mantener lint/test/build en verde mientras se endurece el sistema.

## Scope

### In Scope

- Priorización global del backlog actual.
- Orden recomendado de remediación.
- Clasificación por criticidad y dependencias.

### Out of Scope

- Implementar fixes en este workflow.
- Rediseñar todo el sistema de auth o moverlo entero a cookies.
- Entrar al roadmap largo de pagos/notificaciones/móvil.

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Mezclar producto y seguridad en una sola ola | se retrasan fixes críticos | separar por olas |
| Endurecer backend sin ajustar UI | más errores visibles al usuario | atacar agenda frontend justo después |
| Resolver solo UI de reservas | la API seguirá aceptando casos inválidos | fijar primero el backend |
| Posponer onboarding B2C | nuevos tenants “registrados” pero invisibles | hacerlo en la segunda ola |

## Recommendation

Primero cerrar superficie de seguridad y reglas core del negocio. Después completar onboarding y sólo luego invertir tiempo en polish, rendimiento y roadmap. El proyecto ya está suficientemente estable como para ejecutar esto en olas pequeñas sin congelar desarrollo.
