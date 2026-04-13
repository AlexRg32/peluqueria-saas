# 2. Security Findings

## Critical

- Toma de control de tenant en el registro profesional:
  - [AuthenticationService](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/AuthenticationService.java#L35) reutiliza una empresa existente por `enterpriseName` y [AuthenticationService](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/AuthenticationService.java#L46) crea un nuevo `ADMIN` unido a ese tenant.
  - Un atacante solo necesita conocer el nombre comercial de una empresa ya existente para registrarse dentro de ella.

- Acceso cruzado entre tenants en servicios:
  - [ServiceOfferingController](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/controller/ServiceOfferingController.java#L53) autoriza por `enterpriseId`, pero [ServiceOfferingService](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/ServiceOfferingService.java#L46) y [ServiceOfferingService](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/ServiceOfferingService.java#L57) operan por `id` sin comprobar que pertenezca al tenant autorizado.
  - Esto permite leer o borrar lógicamente servicios de otra empresa si se conoce su `id`.

- Acceso cruzado entre tenants en horarios:
  - [WorkingHourController](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/controller/WorkingHourController.java#L42) solo valida el `enterpriseId` del primer elemento del batch.
  - [WorkingHourService](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/WorkingHourService.java#L76) recupera entidades por `id` bruto y [WorkingHourService](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/WorkingHourService.java#L88) conserva el tenant original si el registro ya existe.
  - Con un `id` válido de otra empresa, un admin puede modificar horarios ajenos.

## High

- Enumeración global de empresas para cualquier usuario autenticado:
  - [EnterpriseController](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/controller/EnterpriseController.java#L28) no tiene `@PreAuthorize` específico y [EnterpriseService](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/service/EnterpriseService.java#L34) devuelve todas las empresas.
  - Un `CLIENTE` autenticado puede consultar metadatos de todos los tenants.

- Configuración JWT propensa a caída por secreto incompatible:
  - [JwtUtil](/Users/alex32/Desktop/peluqueria-saas/saloria-api/src/main/java/com/saloria/security/JwtUtil.java#L69) exige un secreto en Base64.
  - [README.md](/Users/alex32/Desktop/peluqueria-saas/README.md#L106) y [docker-compose.yml](/Users/alex32/Desktop/peluqueria-saas/docker-compose.yml#L19) documentan un valor plano (`dev-only-change-this-secret-before-sharing`) que produce `DecodingException` al firmar/validar tokens.

## Moderate

- JWT persistido en `localStorage`:
  - [AuthContext](/Users/alex32/Desktop/peluqueria-saas/saloria-client/src/features/auth/context/AuthContext.tsx#L39) y [axios.ts](/Users/alex32/Desktop/peluqueria-saas/saloria-client/src/lib/axios.ts#L12) guardan y reinyectan el token desde `localStorage`.
  - No es un fallo explotable por sí solo, pero aumenta mucho el impacto de cualquier XSS futura.
