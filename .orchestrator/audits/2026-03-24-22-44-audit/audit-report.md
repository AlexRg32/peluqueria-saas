# Comprehensive Codebase Audit Report

## Executive Summary

El proyecto tiene una base útil y tests verdes, pero ahora mismo no está listo para endurecerse como SaaS multi-tenant de producción. Lo más serio no está en compilación sino en seguridad y consistencia de dominio: hay una puerta trasera de superadmin, escalado de privilegios en gestión de usuarios, aislamiento multi-tenant incompleto en citas y dependencias frontend con vulnerabilidades activas. Además, parte importante del portal cliente sigue mockeada o sin implementar.

Verificaciones ejecutadas:

- `saloria-client`: `npm test` OK, `npm run lint` FAIL, `npm audit` FAIL
- `saloria-api`: `./mvnw test` OK

## Prioritized Action Items

### 🔴 Critical (Fix Immediately)

1. Eliminar la creación automática del usuario `SUPER_ADMIN` por defecto y cualquier credencial embebida de arranque.
2. Cerrar el escalado de privilegios en `POST/PUT /api/users`: usar DTOs, lista blanca de campos y prohibir que un `ADMIN` pueda asignar `SUPER_ADMIN`.
3. Reforzar el aislamiento multi-tenant en creación/edición de citas comprobando pertenencia de empleado, servicio y cliente a la empresa autenticada.
4. Rotar secreto JWT y credenciales por defecto, y bloquear arranques inseguros cuando falten variables críticas.
5. Actualizar dependencias vulnerables del frontend, empezando por `jspdf` y `axios`.

### 🟠 High (Do Next)

1. Hacer que `active=false` impida login realmente.
2. Sustituir el borrado físico de usuarios/citas/clientes por soft delete o archivado consistente.
3. Añadir validación backend real (`@Valid`, Bean Validation, DTOs) y normalizar errores sin filtrar mensajes internos.
4. Revisar el rate limiting para que no dependa de mapas en memoria sin TTL ni de un `X-Forwarded-For` no confiable.
5. Reemplazar mocks del marketplace por API real y completar el flujo público de reserva.
6. Añadir índices a `appointments`, `customers`, `service_offerings`, `working_hours` según los accesos reales.

### 🟡 Moderate (Refactor Soon)

1. Corregir `eslint` en `vite.config.js`.
2. Eliminar `show-sql` en default/prod y revisar `open-in-view`.
3. Unificar la configuración CORS y evitar `@CrossOrigin` hardcodeado.
4. Restringir Swagger/OpenAPI según perfil o entorno.
5. Revisar estrategia de almacenamiento del token en frontend.

### 🔵 Product / Pending Features

1. Implementar el buscador real del marketplace.
2. Implementar la pantalla de perfil cliente.
3. Conectar el CTA `Reservar Ahora` con un flujo de selección de servicio/empleado/hora.
4. Mostrar horarios públicos reales desde `working_hours`.
5. Reconciliar roadmap, README y docs con el estado actual del producto.

## Detailed Findings

### 1. Guidelines & Clean Code

- Se incumple el patrón DTO-first en varios controllers de escritura.
- Falta validación declarativa de requests.
- Hay deriva entre lo que documenta el repo y lo que hace el código.

### 2. Security

- Credenciales/secretos inseguros por defecto.
- Posible elevación de privilegios mediante gestión de usuarios.
- Separación multi-tenant incompleta.
- Dependencias frontend con CVEs relevantes.

### 3. Architecture & Patterns

- Pérdida de datos por borrado físico.
- Marketplace y perfil cliente todavía incompletos o mockeados.
- Esquema sin índices para consultas críticas.
