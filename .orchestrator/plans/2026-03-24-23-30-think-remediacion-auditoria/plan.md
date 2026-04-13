# Plan: Remediacion De Auditoria

> WARNING: This plan is strictly theoretical. No source code files have been modified.

> Goal: cerrar los riesgos criticos del SaaS y ordenar la deuda restante en olas ejecutables.
> Architecture: layered backend + hybrid feature/frontend, reforzando contratos y aislamiento multi-tenant.

## What Already Exists

- `SecurityService` y `@PreAuthorize` para permisos base
- `GlobalExceptionHandler` ya centraliza respuestas, aunque hay que endurecerlo
- Tests backend (`AppointmentServiceTest`, `EnterpriseServiceTest`, `PublicControllerTest`)
- Tests frontend con Vitest/RTL y smoke general
- `Marketplace` y `ClientPortal` ya tienen estructura visual reutilizable

## Test Diagram

```text
NEW / CHANGED CODEPATHS

1. Login
   valid active user -> 200 token
   inactive user -> 401/403 with safe message

2. User admin writes
   ADMIN creates EMPLEADO -> ok
   ADMIN creates SUPER_ADMIN -> rejected
   ADMIN updates peer in same enterprise -> ok
   ADMIN updates foreign enterprise user -> rejected

3. Appointment creation
   employee + service + customer from same enterprise -> ok
   any cross-enterprise resource -> rejected
   overlapping slot -> rejected

4. User removal/archive
   archive user -> hidden from active UI
   appointments/customers retained -> ok

5. Public marketplace
   real data available -> cards/profile render
   empty/error -> graceful fallback

6. Public booking CTA
   CTA leads into booking flow instead of dead button
```

## Foundation

- [x] **Task 1: Freeze insecure bootstrap** — `saloria-api/src/main/java/com/saloria/config/DataInitializer.java`
  - What: eliminar la creacion automatica del `SUPER_ADMIN` por defecto y reemplazarla por un mecanismo seguro/opt-in de bootstrap.
  - Verify: `./mvnw test` y arranque local sin que aparezca el usuario hardcodeado.

- [x] **Task 2: Guard critical env defaults** — `saloria-api/src/main/resources/application.properties`, `README.md`, `DEPLOYMENT.md`
  - What: retirar defaults inseguros o fallar de forma explicita cuando falten `JWT_SECRET` y credenciales de produccion.
  - Verify: arranque local documentado + tests backend siguen verdes.

- [x] **Task 3: Patch vulnerable frontend deps** — `saloria-client/package.json`, `saloria-client/package-lock.json`
  - What: actualizar `axios`, `jspdf` y transitive deps marcadas por `npm audit`.
  - Verify: `npm audit`, `npm test`, `npm run build`.

- [x] **Task 4: Fix lint baseline** — `saloria-client/vite.config.js`
  - What: corregir el uso de `__dirname` en ESM para que `eslint` vuelva a pasar.
  - Verify: `npm run lint`.

## Core Security

- [x] **Task 5: Block inactive users at auth layer** — `saloria-api/src/main/java/com/saloria/model/User.java`, `saloria-api/src/main/java/com/saloria/config/ApplicationConfig.java`
  - What: hacer que `active=false` afecte realmente a autenticacion/habilitacion.
  - Verify: test unitario o de integracion para login de usuario inactivo.

- [x] **Task 6: Introduce safe user write DTOs** — `saloria-api/src/main/java/com/saloria/dto/*User*Request.java`, `UserController.java`
  - What: sustituir `@RequestBody User` por DTOs de creacion/actualizacion con campos permitidos.
  - Verify: compile + controller tests.

- [x] **Task 7: Enforce admin role ceilings** — `saloria-api/src/main/java/com/saloria/service/UserService.java`
  - What: impedir que un `ADMIN` normal cree o promueva `SUPER_ADMIN`, aunque lo mande en el body.
  - Verify: test de servicio/controlador que rechace ese caso.

- [x] **Task 8: Introduce enterprise write DTOs** — `EnterpriseController.java`, nuevos DTOs
  - What: dejar de aceptar `Enterprise` entidad cruda en `POST/PUT`.
  - Verify: compile + test de actualizacion de empresa.

- [x] **Task 9: Introduce service offering write DTO** — `ServiceOfferingController.java`, `ServiceOfferingRequest.java`
  - What: parsear multipart hacia DTO validado y no hacia entidad JPA completa.
  - Verify: test de creacion de servicio con y sin imagen.

- [x] **Task 10: Add bean validation to priority requests** — `AuthController.java`, `AppointmentController.java`, DTOs de auth/citas/cliente/servicio`
  - What: anotar DTOs con constraints y controllers con `@Valid`.
  - Verify: tests de 400 para payloads invalidos.

- [x] **Task 11: Harden exception contract** — `saloria-api/src/main/java/com/saloria/exception/GlobalExceptionHandler.java`
  - What: devolver errores tipados y seguros, sin exponer `exc.getMessage()` genericamente.
  - Verify: tests de status/message para validacion, not found, forbidden y errores internos.

- [x] **Task 12: Enforce strict tenant checks in appointments** — `saloria-api/src/main/java/com/saloria/service/AppointmentService.java`
  - What: comprobar que empleado, servicio, cliente y usuario pertenecen a la misma empresa antes de crear o cobrar citas.
  - Verify: nuevos tests unitarios de recursos cruzados.

## Data & Operations

- [x] **Task 13: Replace destructive user deletion with archive semantics** — `User.java`, `UserRepository.java`, `UserService.java`, UI list queries
  - What: introducir borrado logico/archivo y conservar citas/clientes historicos.
  - Verify: test de servicio + UI sigue listando solo activos.

- [x] **Task 14: Filter archived users in queries** — `UserRepository.java`, `EnterpriseService.java`, `AuthContext` dependent flows if needed
  - What: asegurar que listados y autenticacion no consideran usuarios archivados/inactivos incorrectamente.
  - Verify: tests backend + flujo admin usuarios.

- [x] **Task 15: Add DB indexes for hot paths** — `saloria-api/src/main/resources/db/migration/V3__*.sql`
  - What: crear indices sobre citas, clientes, servicios y horarios para queries mas frecuentes.
  - Verify: migration aplica correctamente y tests backend pasan.

- [x] **Task 16: Unify CORS and env-specific exposure** — `SecurityConfig.java`, controllers con `@CrossOrigin`
  - What: eliminar CORS hardcodeado por controller y dejar una sola fuente de verdad.
  - Verify: frontend local funciona en `5173`/`3000` segun entorno documentado.

- [x] **Task 17: Clean prod-hostile defaults** — `application.properties`, `OpenAPIConfig.java` or security config
  - What: apagar `show-sql` por defecto y limitar Swagger/OpenAPI al entorno adecuado si aplica.
  - Verify: arranque local y tests backend.

- [x] **Task 18: Review rate limiting implementation** — `RateLimitFilter.java`
  - What: añadir expiracion/limites mas robustos o dejar al menos una estrategia menos vulnerable para proxy spoofing y crecimiento infinito.
  - Verify: tests basicos del filtro o checklist manual documentado.

## Product Completion

- [x] **Task 19: Replace marketplace mocks with real read API** — `saloria-client/src/services/MarketplaceService.ts`, backend public read endpoints if needed
  - What: conectar destacados/cercanos/busqueda a datos reales del backend.
  - Verify: `npm test` + smoke manual del portal cliente.

- [x] **Task 20: Implement public search page** — `saloria-client/src/pages/SearchPage.tsx`, related client-portal components
  - What: convertir el placeholder en listado/filtrado real con estados vacio/error.
  - Verify: tests de la pagina + smoke manual.

- [x] **Task 21: Wire booking CTA and real business hours** — `BarbershopProfilePage.tsx`, `workingHourService.ts`, backend public horario endpoint if needed
  - What: conectar “Reservar Ahora” a flujo real y renderizar horarios desde datos reales.
  - Verify: click CTA navega/abre flujo y los horarios coinciden con backend.

- [x] **Task 22: Replace client profile placeholder** — `ProfilePlaceholder.tsx`, new profile page flow and related services
  - What: implementar gestion basica de perfil cliente o reducir el alcance a una vista minima funcional.
  - Verify: tests de pagina + smoke con usuario cliente.

## Integration & Polish

- [x] **Task 23: Reconcile docs with reality** — `README.md`, `docs/03-arquitectura-tecnica.md`, `docs/04-backend.md`, `docs/05-frontend.md`, `docs/10-api-contract.md`
  - What: alinear stack real, contratos, tenancy, soft delete y estado del portal cliente con lo que el codigo haga de verdad.
  - Verify: revision manual de docs + no contradicciones con endpoints reales.

- [x] **Task 24: Final verification matrix** — `saloria-api`, `saloria-client`
  - What: correr bateria completa y dejar checklist de ship: backend tests, frontend tests, lint, build, audit.
  - Verify: `./mvnw test`, `npm test`, `npm run lint`, `npm run build`, `npm audit`.

## NOT in Scope

- Reescribir toda la capa frontend hacia React Query/Suspense
- Migrar auth a cookies HttpOnly + refresh tokens
- Stripe, notificaciones, app movil
- Rediseño completo del modelo multi-tenant

## Suggested Execution Waves

```text
Wave A (ship first)
  1 -> 12

Wave B
  13 -> 18

Wave C
  19 -> 22

Wave D
  23 -> 24
```

## Validation Before Implementation

- [x] Every task has What + Verify
- [x] Tasks are in dependency order
- [x] Core tasks are split into 5-15 minute units
