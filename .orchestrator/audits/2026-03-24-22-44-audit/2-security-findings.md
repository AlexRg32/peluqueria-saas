# 2. Security Findings

## Critical

- El backend crea automáticamente un `SUPER_ADMIN` con credenciales conocidas (`dios@dios.com` / `dios`) en cualquier arranque no `test`. Esto es una puerta trasera directa si el despliegue arranca con base de datos limpia. Referencia: `saloria-api/src/main/java/com/saloria/config/DataInitializer.java:23-36`.
- Existe una ruta clara de escalado de privilegios: un `ADMIN` puede crear o actualizar usuarios enviando directamente el campo `role`, incluyendo `SUPER_ADMIN`, porque el controller acepta `User` completo y el service persiste `role` sin restricciones. Referencias: `saloria-api/src/main/java/com/saloria/controller/UserController.java:33-44`, `saloria-api/src/main/java/com/saloria/service/UserService.java:30-58`.
- La creación de citas no verifica que `employeeId`, `serviceId`, `customerId` o `userId` pertenezcan a la `enterpriseId` del request. Eso rompe el aislamiento multi-tenant y permite mezclar recursos entre empresas. Referencias: `saloria-api/src/main/java/com/saloria/service/AppointmentService.java:23-68`, `saloria-api/src/main/java/com/saloria/service/AppointmentService.java:73-107`.

## High

- Hay secretos y credenciales inseguras por defecto en configuración (`postgres/postgres`, JWT secret por defecto). Si faltan variables de entorno, la app arranca con valores reutilizables. Referencias: `saloria-api/src/main/resources/application.properties:5-7`, `saloria-api/src/main/resources/application.properties:21`.
- El estado `active` no bloquea el acceso: `User.isEnabled()` devuelve siempre `true`, así que un usuario marcado como inactivo puede seguir autenticándose. Referencia: `saloria-api/src/main/java/com/saloria/model/User.java:81-83`.
- `GlobalExceptionHandler` captura cualquier `Exception` y devuelve el `exc.getMessage()` al cliente con `400`, filtrando mensajes internos y homogeneizando mal los estados HTTP. Referencia: `saloria-api/src/main/java/com/saloria/exception/GlobalExceptionHandler.java:37-41`.
- `npm audit` detecta dependencias vulnerables en frontend, incluyendo `jspdf` con severidad crítica y `axios` con severidad alta. Resultado local: 8 vulnerabilidades totales (`1 critical`, `5 high`, `2 moderate`).

## Moderate

- Los JWT viven en `localStorage` y se inyectan en cada request desde JS, lo que aumenta el impacto de cualquier XSS del frontend. Referencias: `saloria-client/src/features/auth/context/AuthContext.tsx:39-49`, `saloria-client/src/lib/axios.ts:10-16`.
- `csrf` está deshabilitado globalmente y Swagger queda expuesto sin restricción de entorno. Referencia: `saloria-api/src/main/java/com/saloria/config/SecurityConfig.java:35-43`.
- El rate limiting usa mapas en memoria sin expiración y confía ciegamente en `X-Forwarded-For`, por lo que puede crecer sin límite y es fácil de falsear detrás de proxies. Referencias: `saloria-api/src/main/java/com/saloria/security/RateLimitFilter.java:28-29`, `saloria-api/src/main/java/com/saloria/security/RateLimitFilter.java:93-98`.
