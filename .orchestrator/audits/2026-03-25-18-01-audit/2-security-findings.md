# Security Findings

## Findings

1. `GET /api/enterprises` no tiene `@PreAuthorize`, así que cualquier usuario autenticado puede enumerar empresas completas.
   - Impacto: fuga de metadatos multi-tenant.
   - Referencia:
     - `saloria-api/src/main/java/com/saloria/controller/EnterpriseController.java:28-31`

2. La superficie de administración de tenants sigue siendo demasiado amplia: `POST /api/enterprises` permite a un `ADMIN` crear empresas internas aunque no sea `SUPER_ADMIN`.
   - Impacto: gobernanza débil de tenants y endpoint potencialmente innecesario para admins normales.
   - Referencia:
     - `saloria-api/src/main/java/com/saloria/controller/EnterpriseController.java:34-38`

3. El token JWT sigue almacenándose en `localStorage`.
   - Impacto: exposición mayor frente a XSS respecto a una estrategia con cookies `HttpOnly`.
   - Referencias:
     - `saloria-client/src/features/auth/context/AuthContext.tsx:39-49`
     - `saloria-client/src/lib/axios.ts:12-17`

4. La documentación de arranque sigue sugiriendo un `JWT_SECRET` raw que no es compatible con el parser actual basado en Base64.
   - Impacto: fallos de arranque local u operacional si se copia la guía al pie de la letra.
   - Referencias:
     - `README.md:106-115`
     - `saloria-api/src/main/java/com/saloria/security/JwtUtil.java:69-71`

5. El endpoint público de registro profesional crea tenants incompletos sin slug ni configuración mínima.
   - Impacto: no es takeover ya, pero sí deja empresas nuevas en estado medio roto para el canal B2C.
   - Referencias:
     - `saloria-api/src/main/java/com/saloria/service/AuthenticationService.java:35-45`
     - `saloria-api/src/main/java/com/saloria/model/Enterprise.java:57-58`
