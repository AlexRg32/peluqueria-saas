# 2. Security Findings

## Critical

- `saloria-api/src/main/java/com/saloria/service/AppointmentService.java:52-82`
- `saloria-api/src/main/java/com/saloria/repository/AppointmentRepository.java:41-44`
  - Appointment collision prevention is implemented as "read existing appointments, then save".
  - There is no transaction boundary, lock, or database-level exclusion/uniqueness guard to prevent two concurrent bookings from taking the same professional slot.
  - This is a real production integrity issue for a salon using public booking plus receptionist/admin booking at the same time.

## High

- `saloria-client/src/lib/axios.ts:61-63`
  - Treating `403` as session expiry blurs authentication and authorization failures.
  - Users can be kicked out for simply reaching a route or action they are not allowed to use.

## Moderate

- `saloria-client/src/features/auth/context/AuthContext.tsx:33-56`
  - JWT is stored in `localStorage`.
  - This is workable, but it keeps the session exposed to any future XSS issue and is weaker than an httpOnly cookie-based session model.

- `saloria-api/src/main/resources/application.properties:8-9`
  - `spring.jpa.open-in-view` is left at the Spring default and the test logs confirm it is enabled.
  - It is not an exploit by itself, but it broadens persistence access beyond the service boundary and makes accidental lazy-load leakage easier.
