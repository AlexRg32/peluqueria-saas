# Plan: Remediacion 3 Criticos

> WARNING: This plan is strictly theoretical. No source code files have been modified.

> Goal: cerrar los 3 agujeros criticos de aislamiento multi-tenant y takeover detectados en la auditoria.
> Architecture: layered Spring backend con tenancy por `enterprise_id`, reforzando services + repositories y manteniendo contratos actuales donde sea posible.

## What Already Exists

- `@PreAuthorize` y `SecurityService` ya filtran parte del acceso
- `GlobalExceptionHandler` ya centraliza respuestas
- Tests backend existentes para `PublicController`, `ServiceOfferingController`, `AppointmentService`
- Frontend de registro profesional ya muestra `err.response?.data?.message`

## Foundation

- [x] **Task 1: Red test for hostile professional signup** — `saloria-api/src/test/java/com/saloria/service/AuthenticationServiceTest.java`
  - What: escribir un test que demuestre que registrar un profesional con `enterpriseName` ya existente no debe unirlo a ese tenant.
  - Verify: `./mvnw -Dtest=AuthenticationServiceTest test`

- [x] **Task 2: Hotfix public register semantics** — `saloria-api/src/main/java/com/saloria/service/AuthenticationService.java`
  - What: cambiar `register()` para que cree una empresa nueva o falle en conflicto si el nombre ya existe; nunca reutilizar empresa existente en endpoint publico.
  - Verify: `./mvnw -Dtest=AuthenticationServiceTest test`

- [x] **Task 3: Surface a clean conflict response** — `saloria-api/src/main/java/com/saloria/exception/GlobalExceptionHandler.java`
  - What: asegurar que el caso de nombre de empresa ya existente devuelva un mensaje claro y status consistente para el frontend.
  - Verify: `./mvnw -Dtest=AuthControllerValidationTest test`

## Core

- [x] **Task 4: Red tests for cross-tenant service access** — `saloria-api/src/test/java/com/saloria/service/ServiceOfferingServiceTest.java`, `saloria-api/src/test/java/com/saloria/controller/ServiceOfferingControllerTest.java`
  - What: añadir casos que intenten leer y borrar un servicio con `enterpriseId` propio pero `id` ajeno.
  - Verify: `./mvnw -Dtest=ServiceOfferingServiceTest,ServiceOfferingControllerTest test`

- [x] **Task 5: Scope service queries by tenant** — `saloria-api/src/main/java/com/saloria/repository/ServiceOfferingRepository.java`, `saloria-api/src/main/java/com/saloria/service/ServiceOfferingService.java`
  - What: introducir consultas `findByIdAndEnterpriseId...` y usarlas en detalle/borrado para que `id` e `enterpriseId` siempre casen.
  - Verify: `./mvnw -Dtest=ServiceOfferingServiceTest,ServiceOfferingControllerTest test`

- [x] **Task 6: Red tests for hostile working-hours batch** — `saloria-api/src/test/java/com/saloria/service/WorkingHourServiceTest.java`, `saloria-api/src/test/java/com/saloria/controller/WorkingHourControllerTest.java`
  - What: cubrir payload mixto, primer DTO valido + segundo DTO ajeno, e ID existente de otro tenant.
  - Verify: `./mvnw -Dtest=WorkingHourServiceTest,WorkingHourControllerTest test`

- [x] **Task 7: Validate every DTO enterprise in batch** — `saloria-api/src/main/java/com/saloria/controller/WorkingHourController.java`
  - What: reemplazar la validacion del primer elemento por validacion de todos los `enterpriseId` del batch antes de delegar.
  - Verify: `./mvnw -Dtest=WorkingHourControllerTest test`

- [x] **Task 8: Scope existing working hours before save** — `saloria-api/src/main/java/com/saloria/service/WorkingHourService.java`, `saloria-api/src/main/java/com/saloria/repository/WorkingHourRepository.java`
  - What: cuando venga `dto.id`, cargar el registro existente y rechazar si su `enterprise_id` no coincide con el DTO/actor; no permitir reaprovechar IDs ajenos.
  - Verify: `./mvnw -Dtest=WorkingHourServiceTest,WorkingHourControllerTest test`

- [x] **Task 9: Validate referenced employee ownership in batch** — `saloria-api/src/main/java/com/saloria/service/WorkingHourService.java`, `saloria-api/src/main/java/com/saloria/repository/UserRepository.java`
  - What: asegurar que cualquier `userId` del batch pertenece a la misma empresa del horario y no a otro tenant.
  - Verify: `./mvnw -Dtest=WorkingHourServiceTest test`

## Integration & Polish

- [x] **Task 10: Regression pass for happy paths** — `saloria-api/src/test/java/com/saloria/service/*`, `saloria-api/src/test/java/com/saloria/controller/*`
  - What: añadir o ajustar casos positivos para registro profesional nuevo, lectura/borrado de servicio propio y guardado de horarios propios.
  - Verify: `./mvnw test`

- [x] **Task 11: Align API docs with fixed behavior** — `docs/10-api-contract.md`, `docs/02-guia-usuario.md`
  - What: documentar que el registro profesional crea negocio nuevo y que unirse a uno existente no forma parte del endpoint publico.
  - Verify: revision manual de docs + sin contradicciones con el codigo final

- [x] **Task 12: Final matrix before forge ship** — `saloria-api`, `saloria-client`
  - What: correr bateria final y revisar que el frontend sigue mostrando bien el error de conflicto en registro.
  - Verify: `./mvnw test`, `npm test`, `npm run lint`, `npm run build`

## Suggested Execution Order

```text
1 -> 3   register takeover
4 -> 5   services tenant scope
6 -> 9   working-hours tenant scope
10 -> 12 regression + docs + final verification
```

## Validation Before Implementation

- [x] Every task has What + Verify
- [x] Tasks are in dependency order
- [x] No task exceeds ~15 min
