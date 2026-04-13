# Comprehensive Codebase Audit Report

## Executive Summary

El proyecto está en un punto bastante sano a nivel de “superficie”: `npm run lint`, `npm test`, `npm run build`, `npm audit --omit=dev` y `./mvnw test` pasan. Eso significa que el repo es mantenible y shippeable en cambios pequeños. Lo que sigue pendiente ya no es “que compile”, sino cerrar deuda estructural en autorización multi-tenant, reglas de agenda y onboarding/producto.

La prioridad real ahora es:

1. cerrar la fuga de metadatos de empresas,
2. endurecer el motor de disponibilidad de citas en backend,
3. quitar side effects de lectura en horarios,
4. completar el onboarding de nuevos negocios para que el canal público no quede a medias.

## Verification Notes

- Frontend
  - `npm run lint` ✅
  - `npm test` ✅
  - `npm run build` ✅ con warning por chunk principal grande
  - `npm audit --omit=dev` ✅
- Backend
  - `./mvnw test` ✅
- Observaciones
  - Vitest sigue mostrando warnings por `whileInView` en algunos tests de UI
  - Spring sigue avisando de `open-in-view` activo por defecto en tests

## Prioritized Action Items

### 🔴 Critical (Atacar ya)

1. Restringir `GET /api/enterprises` a `SUPER_ADMIN` o eliminarlo del API estándar.
   - Referencia: `saloria-api/src/main/java/com/saloria/controller/EnterpriseController.java:28-31`
   - Motivo: fuga de directorio multi-tenant a cualquier usuario autenticado.

2. Mover la validación de disponibilidad real al backend de citas: horario laboral, horario por empleado y duración del servicio.
   - Referencias:
     - `saloria-api/src/main/java/com/saloria/service/AppointmentService.java:25-56`
     - `.agent/contexts/project-domain.md:24-26`
   - Motivo: hoy se puede agendar fuera de horario si no hay solape.

### 🟠 High (Siguiente ola)

1. Hacer read-only los `GET` de horarios y mover la inicialización por defecto a un flujo explícito de setup o guardado.
   - Referencias:
     - `saloria-api/src/main/java/com/saloria/service/WorkingHourService.java:31-50`
     - `saloria-api/src/main/java/com/saloria/service/WorkingHourService.java:114-128`

2. Completar el onboarding profesional para generar slug/configuración mínima o exigir wizard posterior obligatorio.
   - Referencias:
     - `saloria-api/src/main/java/com/saloria/service/AuthenticationService.java:42-45`
     - `saloria-api/src/main/java/com/saloria/service/EnterpriseService.java:65-67`

3. Revisar el endpoint `POST /api/enterprises` para que quede reservado a `SUPER_ADMIN` o desaparezca si no se usa.
   - Referencia:
     - `saloria-api/src/main/java/com/saloria/controller/EnterpriseController.java:34-38`

4. Alinear frontend y backend en política de contraseña del registro pro.
   - Referencias:
     - `saloria-client/src/features/auth/components/pro/ProRegisterForm.tsx:12-13`
     - `saloria-api/src/main/java/com/saloria/dto/RegisterRequest.java:24-29`

5. Corregir la guía de `JWT_SECRET` o endurecer el backend para aceptar secreto raw/documentar Base64 explícitamente.
   - Referencias:
     - `README.md:106-115`
     - `saloria-api/src/main/java/com/saloria/security/JwtUtil.java:69-71`

### 🟡 Moderate (Refactor pronto)

1. Reducir el chunk principal del frontend con `lazy`/imports dinámicos para la parte de PDFs y flows pesados.
2. Revisar la estrategia de token en `localStorage` si queréis subir el listón de seguridad web.
3. Quitar warnings de tests de `framer-motion` para que CI vuelva a tener salida limpia.
4. Desactivar explícitamente `spring.jpa.open-in-view` si no se necesita.
5. Limpiar el ticket PDF para usar branding real de Saloria/empresa.

### 🔵 Product / Pending Features

1. Sustituir el perfil cliente mínimo por un perfil real con edición y autogestión.
   - Referencias:
     - `saloria-client/src/App.tsx:53-56`
     - `saloria-client/src/pages/ProfilePlaceholder.tsx:9-135`

2. Implementar la vista real de `SUPER_ADMIN` para empresas.
   - Referencia:
     - `saloria-client/src/App.tsx:90-93`

3. Completar lo que sigue en roadmap oficial:
   - pagos y depósitos online,
   - notificaciones automáticas,
   - portal cliente avanzado,
   - app móvil.
   - Referencia:
     - `README.md:147-155`

## Recommended Order

1. Seguridad de tenants
2. Reglas de agenda y horarios
3. Onboarding y activación B2C de nuevos negocios
4. Hardening operativo y deuda frontend
5. Producto pendiente y roadmap
