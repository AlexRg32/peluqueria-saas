# Investigation: Remediacion De Auditoria

## Summary

El objetivo es convertir los hallazgos de la auditoria en un plan ejecutable, ordenado y de bajo riesgo para endurecer el SaaS antes de seguir ampliando producto. El problema no es una sola feature: hay una combinacion de fallos criticos de seguridad, deuda de arquitectura y pantallas B2C aun incompletas. La estrategia recomendada es separar la remediacion en olas, empezando por seguridad y consistencia de dominio, despues calidad estructural, y solo luego funcionalidades pendientes del portal cliente.

## Scope Challenge

### What already exists

- **Autorizacion base con `@PreAuthorize` y `SecurityService`**: ya existe una malla parcial de control de acceso; hay que endurecerla, no reemplazarla.
- **Tests backend y frontend existentes**: hay una base minima para validar cambios sin empezar desde cero.
- **Flyway y esquema SQL versionado**: la base de datos ya esta bajo migracion controlada.
- **Portal cliente parcialmente montado**: ya hay rutas, layout, perfil publico y componentes visuales reutilizables.
- **Storage local y Supabase Storage**: no hace falta rediseñar almacenamiento; solo terminar bordes inseguros y contratos.

### Minimum viable remediation

La minima unidad que cambia el riesgo real de produccion es:

1. eliminar credenciales/arranques inseguros,
2. cerrar escalado de privilegios,
3. reforzar aislamiento multi-tenant de citas,
4. actualizar dependencias vulnerables,
5. dejar DTOs y validacion basica en los endpoints de escritura mas peligrosos.

Todo lo demas debe quedar detras de ese bloque.

### Complexity check

Si intentamos arreglar seguridad, deuda de arquitectura y roadmap B2C en una sola implementacion, el cambio tocaria demasiados archivos y mezclaria varias clases de riesgo. Huele a plan sobrecargado. La recomendacion es dividirlo en **4 olas** y ejecutar cada una como bloque verificable.

## Current State

- **Tech Stack**:
  - Backend: Spring Boot 3.3, Java 21 real en `pom.xml`, JPA, Spring Security, Flyway, PostgreSQL
  - Frontend: React 19 real en `package.json`, Vite 7, TypeScript, Tailwind 4, Vitest
- **Relevant Code**:
  - Seguridad y auth: `saloria-api/src/main/java/com/saloria/config/*`, `security/*`, `service/AuthenticationService.java`
  - Escrituras peligrosas: `UserController`, `EnterpriseController`, `ServiceOfferingController`, `AppointmentService`
  - Cliente web: `AuthContext`, `axios`, `MarketplaceService`, `BarbershopProfilePage`, `SearchPage`, `ProfilePlaceholder`
  - Persistencia: `db/migration/V1__init.sql`, repositorios y modelos JPA
- **Architecture**:
  - Backend en capas, pero con fugas de entidades JPA hacia controllers
  - Frontend hibrido: algo de feature-based, algo de paginas + servicios globales
  - Multi-tenant por `enterprise_id`, pero con enforcement incompleto

## Requirements

### Functional

- [ ] El sistema no debe crear usuarios privilegiados por defecto
- [ ] Un `ADMIN` no debe poder escalar a `SUPER_ADMIN`
- [ ] Ninguna operacion de citas debe mezclar recursos de distintas empresas
- [ ] Los endpoints de escritura deben usar DTOs y validacion minima
- [ ] El portal cliente debe dejar de depender de mocks para sus flujos clave
- [ ] Las funciones “proximamente” visibles deben convertirse en backlog priorizado o implementarse

### Non-Functional

- **Security**: cierre de puertas traseras, hardening de auth, saneado de errores, dependencias sin CVEs relevantes
- **Reliability**: cambios desplegables por fases, con rollback claro
- **Performance**: indices en tablas calientes y menos ruido de logs
- **Maintainability**: dif minimo pero explicito, sin reescribir media app

## In Scope

- Seguridad de arranque, secretos y usuarios privilegiados
- DTOs y validacion en endpoints de escritura prioritarios
- Endurecimiento del dominio de citas y tenant isolation
- Dependencias vulnerables del frontend
- Borrado logico/archivo en lugar de destruccion fisica
- Correcciones de configuracion y consistencia basicas
- Plan para sustituir mocks y placeholders B2C mas importantes

## Out of Scope

- Reescritura completa del frontend hacia Suspense/React Query
- Nuevo sistema de auth con refresh tokens o cookies HttpOnly en esta primera ola
- App movil
- Integracion Stripe/WhatsApp/Email
- Rediseño total del esquema multi-tenant o migracion a microservicios

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Cambiar auth y escritura a la vez rompe flujos admin | Alto | Dividir en olas y asegurar tests por endpoint |
| Introducir DTOs en bloque genera mucho diff | Alto | Empezar por los endpoints de escritura mas sensibles |
| Cambiar borrado fisico a logico afecta UI y queries | Alto | Añadir bandera/estado y revisar repositorios antes de tocar pantallas |
| Actualizar deps frontend rompe build o PDF | Medio | Subir paquetes en un bloque aislado con test + build + smoke |
| Sustituir mocks B2C demasiado pronto distrae del hardening | Medio | Dejar producto B2C para la ultima ola |

## Recommendation

La recomendacion es ejecutar **4 olas**:

1. **P0 Seguridad**: quitar bootstrap inseguro, cerrar privilegios, endurecer multi-tenant, rotar defaults, actualizar CVEs.
2. **P1 Contratos y dominio**: DTOs, validacion, errores tipados, bloqueo real de usuarios inactivos.
3. **P2 Persistencia y operacion**: soft delete/archivo, indices, CORS/logging/config.
4. **P3 B2C y completado funcional**: marketplace real, buscador, reserva publica y perfil cliente.

Esto reduce riesgo, mantiene diffs razonables y deja cada bloque verificable antes del siguiente.
