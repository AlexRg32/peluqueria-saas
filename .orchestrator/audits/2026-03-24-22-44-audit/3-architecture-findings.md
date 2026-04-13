# 3. Architecture & Performance Findings

## High

- La capa de usuarios hace borrado físico en cascada de citas y clientes, contradiciendo el contrato funcional de soft delete y elevando riesgo de pérdida irreversible de datos operativos. Referencias: `README.md:62-66`, `saloria-api/src/main/java/com/saloria/service/UserService.java:80-97`.
- El portal cliente sigue parcialmente mockeado: el marketplace usa datos hardcodeados con delays simulados, no backend real. Referencia: `saloria-client/src/services/MarketplaceService.ts:3-132`.
- Hay pantallas importantes sin implementar o solo decorativas: buscador, perfil cliente y CTA de reservar sin flujo real. Referencias: `saloria-client/src/pages/SearchPage.tsx:4-20`, `saloria-client/src/pages/ProfilePlaceholder.tsx:4-48`, `saloria-client/src/pages/BarbershopProfilePage.tsx:173-180`.
- `BarbershopProfilePage` muestra horarios hardcodeados en vez de usar `working_hours`, así que la UI pública no representa la disponibilidad real del negocio. Referencia: `saloria-client/src/pages/BarbershopProfilePage.tsx:258-260` y bloque de horarios renderizado a continuación.

## Moderate

- La migración inicial crea tablas y FKs pero no añade índices para consultas calientes (`enterprise_id`, `employee_id`, `date`, `customer_id`). Eso va a degradar dashboard, calendario y billing a medida que crezcan las citas. Referencia: `saloria-api/src/main/resources/db/migration/V1__init.sql:1-16`.
- `spring.jpa.show-sql=true` está activo por defecto y el propio arranque muestra warnings de `open-in-view` habilitado; ambos puntos son mala base para producción y favorecen ruido/logging excesivo y N+1 invisibles. Referencia: `saloria-api/src/main/resources/application.properties:10`.
- Hay deriva entre documentación y realidad técnica: docs hablan de React 18 / Java 17 / OAuth2 resource server con validación DTO, pero el repo está en React 19 / Java 21 y JWT custom sin esa disciplina. Referencias: `README.md:39-49`, `docs/03-arquitectura-tecnica.md:21-23`, `docs/03-arquitectura-tecnica.md:33-37`, `docs/03-arquitectura-tecnica.md:56-61`.

## Minor

- Algunos endpoints y controllers mantienen `@CrossOrigin` hardcodeado a `localhost:3000` o `5173`, duplicando y contradiciendo la configuración central de CORS. Referencias: `saloria-api/src/main/java/com/saloria/controller/EnterpriseController.java:20`, `saloria-api/src/main/java/com/saloria/controller/AppointmentController.java:19`, `saloria-api/src/main/java/com/saloria/controller/PublicController.java:20`, `saloria-api/src/main/java/com/saloria/config/SecurityConfig.java:59-69`.
