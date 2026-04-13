# Investigation: Remediacion 3 Criticos

## Summary

El objetivo es cerrar los tres hallazgos mas peligrosos detectados en la auditoria sin abrir una refactorizacion gigante: 1) takeover de tenant en el registro profesional, 2) acceso cruzado entre tenants en lectura/borrado de servicios y 3) acceso cruzado entre tenants en guardado masivo de horarios. La prioridad aqui no es “mejorar la arquitectura” en abstracto, sino restaurar una garantia basica del producto: que un tenant no pueda entrar ni tocar datos de otro.

## Current State

- **Tech Stack**:
  - Backend: Spring Boot 3.3, Java 21, Spring Security, JPA, Flyway
  - Frontend: React 19, Vite 7, TypeScript, Vitest
- **Relevant Code**:
  - Auth y tenancy: [AuthenticationService.java](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/AuthenticationService.java), [SecurityService.java](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/security/SecurityService.java)
  - Servicios: [ServiceOfferingController.java](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/controller/ServiceOfferingController.java), [ServiceOfferingService.java](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/ServiceOfferingService.java), `ServiceOfferingRepository`
  - Horarios: [WorkingHourController.java](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/controller/WorkingHourController.java), [WorkingHourService.java](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/WorkingHourService.java), `WorkingHourRepository`
  - Contratos y docs: [docs/10-api-contract.md](/Users/alex32/Desktop/peluqueria-saas/docs/10-api-contract.md), [docs/03-arquitectura-tecnica.md](/Users/alex32/Desktop/peluqueria-saas/docs/03-arquitectura-tecnica.md)
- **Architecture**:
  - Backend en capas con `Controller -> Service -> Repository`
  - Tenancy por `enterprise_id`
  - Seguridad basada en `@PreAuthorize` + `SecurityService`, pero con huecos en operaciones que vuelven a consultar por `id` sin scope

## Requirements

### Functional

- [ ] El registro profesional publico no debe unir a un usuario a una empresa ya existente por coincidencia de nombre.
- [ ] Leer o eliminar un servicio debe requerir coincidencia simultanea de `serviceId` y `enterpriseId`.
- [ ] Guardar horarios en batch debe validar todos los elementos del payload, no solo el primero.
- [ ] Actualizar un horario existente debe exigir que el registro ya pertenezca al tenant autorizado.
- [ ] La correccion debe mantener las rutas actuales salvo donde haya un motivo claro para cambiar contrato.

### Non-Functional

- Security: restaurar aislamiento multi-tenant real y evitar escalado de privilegios por onboarding.
- Backward compatibility: minimizar cambios de frontend y mantener el flujo admin actual donde no sea inseguro.
- Auditability: dejar tests regresivos que prueben el fallo y el fix.
- Simplicity: priorizar hotfix seguro sobre gran rediseño.

## Scope

### In Scope

- Endurecer `POST /auth/register`
- Endurecer `GET /api/services/{enterpriseId}/{id}`
- Endurecer `DELETE /api/services/{enterpriseId}/{id}`
- Endurecer `PUT /api/working-hours/batch`
- Añadir tests unitarios/integracion para los tres casos
- Ajustar docs y mensajes de error si cambia el comportamiento observable

### Out of Scope

- Nuevo sistema completo de invitaciones a empresas
- Migrar auth a cookies HttpOnly
- Replantear todo `SecurityService`
- Cambiar UI o rutas del portal cliente salvo errores contractuales derivados
- Rehacer el modelo multi-tenant a nivel de schema

## What / Why / Where / Reuse / Risks

### 1. What is being requested

Preparar una remediacion planificada para tres vulnerabilidades criticas que rompen el aislamiento de tenants.

### 2. Why is it needed

Porque hoy un atacante podria:

- registrarse como `ADMIN` dentro de una empresa ajena,
- leer o borrar servicios de otra empresa,
- editar horarios de otra empresa mediante IDs conocidos.

Eso compromete directamente la confianza del producto y bloquea cualquier crecimiento serio del SaaS.

### 3. Where does it fit

- Capa `service`: reglas de negocio y ownership
- Capa `repository`: consultas con scope tenant
- Capa `controller`: validacion de payloads batch
- Documentacion/API contract: reflejar el nuevo comportamiento de registro

### 4. What exists that can be reused

- `@PreAuthorize` ya esta presente y funciona para el primer filtro de acceso.
- `SecurityService.hasEnterpriseAccess(...)` sirve como base para el tenant check del actor.
- `GlobalExceptionHandler` ya centraliza respuestas y puede absorber conflictos/forbidden.
- La suite de tests backend ya existe y se puede extender sin montar infraestructura nueva.

### 5. Risks and edge cases

| Risk | Impact | Mitigation |
|------|--------|------------|
| Alguna empresa hoy depende de registrarse varias veces con el mismo nombre | Alto | en el hotfix, devolver conflicto claro; dejar invitaciones/ownership para una fase posterior |
| El frontend profesional no maneja bien un `409` en registro | Medio | revisar captura de error actual y documentar mensaje esperado |
| El batch de horarios mezcle filas nuevas y existentes | Alto | validar cada DTO y cada entidad cargada, no asumir homogeneidad |
| El fix de servicios rompa un flujo admin existente que pasaba IDs incoherentes | Bajo | añadir tests de happy path y ajustar frontend si dependia de un bug |

## Recommendation

La mejor estrategia es un **hotfix en 3 bloques** dentro de una misma ola:

1. **Registro profesional**: `POST /auth/register` debe crear una empresa nueva o fallar si el nombre ya existe. Unirse a una empresa existente debe quedarse fuera del endpoint publico.
2. **Servicios**: reemplazar lookups por `id` puro con consultas scopeadas por `enterpriseId`.
3. **Horarios**: validar todos los DTOs del batch y cargar registros existentes con comprobacion de tenant antes de guardar.

Despues de eso, conviene abrir una segunda iniciativa separada para invitaciones/admin ownership, pero no mezclarla con este cierre de riesgo.
