# Plan: Raspberry Deploy Healthcheck

> Goal: Restaurar el deploy de Raspberry sin volver a exponer Swagger en produccion.
> Architecture: healthcheck operativo contra un endpoint publico del backend.

## Foundation

- [x] **Task 1: Confirmar causa raiz** — `deploy/raspberry/scripts/healthcheck.sh`, `SecurityConfig.java`, logs de GitHub Actions`
  - What: Verificar que el deploy falla por `401` en `/v3/api-docs`.
  - Verify: Comparar runs exitosos y fallidos de `Deploy Raspberry API`.

## Core

- [x] **Task 2: Corregir healthcheck** — `deploy/raspberry/scripts/healthcheck.sh`
  - What: Apuntar a `/api/public/enterprises` y permitir override con `HEALTHCHECK_PATH`.
  - Verify: Revisar el script resultante y ejecutar validaciones locales.

## Integration & Polish

- [x] **Task 3: Alinear documentacion** — `deploy/raspberry/README.md`
  - What: Explicar el nuevo endpoint de healthcheck y su racional operativo.
  - Verify: La README refleja el comportamiento real del script.
