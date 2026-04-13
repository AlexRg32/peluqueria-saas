# Investigation: Raspberry Deploy Healthcheck

## Summary
El despliegue en la Raspberry Pi falla desde `c754a67` aunque la imagen se construye y el contenedor arranca. La causa raíz es que `deploy/raspberry/scripts/healthcheck.sh` sigue validando `/v3/api-docs`, pero desde ese commit la documentación OpenAPI queda deshabilitada por defecto en producción.

## Current State
- **Tech Stack**: Monorepo con Spring Boot 3 + React 19 + Docker Compose.
- **Relevant Code**:
  - `deploy/raspberry/scripts/healthcheck.sh`
  - `deploy/raspberry/scripts/redeploy.sh`
  - `deploy/raspberry/README.md`
  - `saloria-api/src/main/java/com/saloria/config/SecurityConfig.java`
  - `saloria-api/src/main/resources/application.properties`
- **Architecture**: Backend desplegado en Raspberry Pi con Docker Compose y Cloudflare Tunnel.

## Requirements
### Functional
- [x] El healthcheck debe validar un endpoint que siga siendo publico en produccion.
- [x] El deploy no debe depender de Swagger/OpenAPI para marcar la API como sana.

### Non-Functional
- Seguridad: no reabrir Swagger en produccion solo para satisfacer el healthcheck.
- Operacion: permitir override del path si en el futuro cambia el endpoint de comprobacion.

## Scope
### In Scope
- Corregir el script de healthcheck.
- Actualizar la documentacion operativa de Raspberry.

### Out of Scope
- Cambiar politicas de seguridad del backend.
- Reconfigurar variables reales de la Raspberry.

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| El endpoint publico cambie en el futuro | Medio | Hacer configurable el path del healthcheck con una variable de entorno |
| Un endpoint muy superficial no detecte problemas de DB | Medio | Usar un endpoint publico que consulta datos de negocio (`/api/public/enterprises`) |

## Recommendation
Mover el healthcheck a `/api/public/enterprises` y permitir override por `HEALTHCHECK_PATH`. Mantiene Swagger cerrado en produccion y verifica que la API y el acceso a datos siguen operativos.
