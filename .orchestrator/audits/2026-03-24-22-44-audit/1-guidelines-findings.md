# 1. Guidelines & Code Quality Findings

## High

- `UserController` rompe el patrón DTO-first y acepta entidades JPA completas en escritura (`User`) para crear y actualizar usuarios, lo que abre la puerta a mass assignment y a cambios de rol inseguros. Referencias: `saloria-api/src/main/java/com/saloria/controller/UserController.java:34-44`, `saloria-api/src/main/java/com/saloria/service/UserService.java:30-58`.
- `EnterpriseController` también acepta entidades JPA (`Enterprise`) en `POST` y `PUT`, incumpliendo la separación Controller -> DTO -> Service documentada. Referencias: `saloria-api/src/main/java/com/saloria/controller/EnterpriseController.java:34-52`.
- `ServiceOfferingController` deserializa un `ServiceOffering` completo desde JSON multipart en vez de un request DTO validado. Referencias: `saloria-api/src/main/java/com/saloria/controller/ServiceOfferingController.java:41-64`.
- La documentación y el código divergen en puntos base: README y docs prometen DTOs y soft deletes, pero el backend sigue usando entidades en controllers y el borrado de usuarios es físico. Referencias: `README.md:62-66`, `saloria-api/src/main/java/com/saloria/controller/UserController.java:47-52`, `saloria-api/src/main/java/com/saloria/service/UserService.java:80-97`.

## Moderate

- No hay validación JSR-303 real en requests de autenticación, registro o creación de citas: ni anotaciones en DTOs ni `@Valid` en controllers. Referencias: `saloria-api/src/main/java/com/saloria/controller/AuthController.java:24-35`, `saloria-api/src/main/java/com/saloria/dto/RegisterRequest.java:12-16`, `saloria-api/src/main/java/com/saloria/dto/AuthRequest.java:12-15`, `saloria-api/src/main/java/com/saloria/dto/CreateAppointmentRequest.java:14-22`.
- El frontend no sigue la guía cargada de organización/data fetching: usa servicios globales y `useEffect` por página, sin boundaries claros de features ni capa de queries/suspense. Ejemplos: `saloria-client/src/pages/ClientPortal.tsx`, `saloria-client/src/pages/BarbershopProfilePage.tsx`, `saloria-client/src/pages/Billing.tsx`.
- `eslint` no pasa por un error real de configuración en Vite (`__dirname` en ESM). Referencia: `saloria-client/vite.config.js:12`.

## Minor

- Varias pantallas siguen con `alert()` y `console.error()` como UX de error en producción. Ejemplos: `saloria-client/src/pages/Users.tsx`, `saloria-client/src/pages/CalendarPage.tsx`, `saloria-client/src/components/appointments/AppointmentDetailsModal.tsx`.
- Los tests del frontend pasan, pero dejan warnings de `whileInView` colándose al DOM en dobles de `framer-motion`, lo que indica setup de test mejorable.
