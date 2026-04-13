# Comprehensive Codebase Audit Report

## Executive Summary

El proyecto está bastante vivo y, a nivel de CI local, compila bien: `npm run lint`, `npm test`, `npm run build` y `./mvnw test` pasan. El problema no está en la “salud superficial”, sino en varios agujeros de autorización multi-tenant y en una desviación importante entre las reglas de negocio documentadas y la lógica real de reservas.

Lo más urgente es cerrar tres vectores de seguridad: el alta profesional puede dar acceso como `ADMIN` a una empresa existente, los endpoints de servicios permiten leer/borrar datos de otro tenant y el batch de horarios permite editar registros ajenos por `id`. Después de eso, toca corregir la lógica de disponibilidad de citas, endurecer la configuración JWT y limpiar algunas incoherencias de onboarding, bundle y documentación.

## Prioritized Action Items

### Critical

- Corregir el registro profesional para que nunca vincule a una empresa existente solo por coincidencia de nombre.
- Reescribir lectura/borrado de servicios para que siempre consulten por `serviceId + enterpriseId`.
- Bloquear el batch de horarios con validación por cada DTO y por cada entidad existente antes de guardar.

### High

- Validar reservas contra horario laboral real del empleado y no solo contra solapes.
- Restringir `GET /api/enterprises` a `SUPER_ADMIN` o eliminarlo del panel estándar.
- Alinear JWT secret y documentación: o Base64 explícito con validación al arrancar, o soporte para secreto raw.

### Moderate

- Arreglar el onboarding profesional para generar slug/configuración mínima o llevar a un setup obligatorio tras el alta.
- Igualar la política de contraseña entre frontend y backend.
- Trocear el bundle principal con imports dinámicos para flujos de PDF / caja.
- Eliminar escrituras implícitas en endpoints `GET` de horarios.

### Low

- Endurecer el manejo del token si queréis subir el listón de seguridad web.
- Actualizar contexto `.agent`, docs y restos de plantilla para evitar decisiones futuras basadas en información vieja.

## Detailed Findings

### 1. Guidelines & Clean Code

- `GET` de horarios con side effects persistentes.
- Validación de alta profesional inconsistente entre UI y API.
- Dependencias pesadas cargadas en el bundle principal sin lazy loading.
- Documentación y contexto de agentes desalineados con el stack real.

### 2. Security

- Riesgo crítico de takeover de tenant en registro profesional.
- Riesgo crítico de acceso cruzado en servicios.
- Riesgo crítico de acceso cruzado en horarios.
- Fuga de metadatos multi-tenant vía `GET /api/enterprises`.
- Configuración JWT frágil por secreto documentado incompatible con el parser.
- Hardening pendiente por almacenamiento de JWT en `localStorage`.

### 3. Architecture & Patterns

- La regla “solo reservar dentro del horario laboral” no está implementada.
- El alta profesional deja tenants incompletos para el canal B2C.
- La cobertura actual no protege los puntos más sensibles que hoy están fallando.

## Verification Notes

- Frontend:
  - `npm run lint` ✅
  - `npm test` ✅
  - `npm run build` ✅ con warning por chunk principal grande
- Backend:
  - `./mvnw test` ✅
- Comprobación adicional:
  - Verifiqué con `jshell` + classpath Maven que `Decoders.BASE64.decode("dev-only-change-this-secret-before-sharing")` falla con `Illegal base64 character: '-'`.
