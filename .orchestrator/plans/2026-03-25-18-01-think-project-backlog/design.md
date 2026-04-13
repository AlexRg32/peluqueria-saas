# Design: Project Backlog

## Architecture Overview

La remediación óptima no es por carpetas sino por impacto:

1. **Tenant Safety Layer**
   - endpoints de empresa y autorización transversal
2. **Scheduling Integrity Layer**
   - disponibilidad, horarios y motor de citas
3. **Tenant Activation Layer**
   - alta profesional y visibilidad pública
4. **UX / Ops Layer**
   - perfil cliente, superadmin, docs/config, bundle, tests
5. **Roadmap Layer**
   - pagos, notificaciones, portal avanzado, móvil

## Data Model / Rules to Protect

| Concern | Current Gap | Desired State |
|--------|-------------|---------------|
| Multi-tenancy | `/api/enterprises` enumera demasiado | acceso solo para actor autorizado |
| Scheduling | solo se valida solape | validar horario empresa/empleado + duración |
| Working hours | GET inicializa filas | lectura pura, setup explícito |
| Tenant onboarding | alta pro crea empresa incompleta | tenant nuevo usable o guiado por wizard |

## Component / Module Impact

### Backend

- `EnterpriseController` y posible endurecimiento de endpoints internos
- `AppointmentService` para reglas reales de agenda
- `WorkingHourService` para eliminar escrituras en lectura
- `AuthenticationService` para onboarding de tenant
- `JwtUtil` + docs para contrato claro de secretos

### Frontend

- `CreateAppointmentModal` + `DateTimePicker` para representar disponibilidad real
- `AuthContext` para deuda de token/session
- `ProfilePlaceholder` y ruta `/perfil`
- route stub `superadmin/empresas`
- `AppointmentDetailsModal` para branding y code-splitting

## Dependencies

- No hacen falta paquetes nuevos para la siguiente ola crítica.
- Sí conviene usar `React.lazy` o imports dinámicos cuando se ataque bundle/PDF.

## Testing Strategy

- Unit/backend: reglas de agenda fuera de horario, acceso a empresas, inicialización explícita de horarios.
- Integration/backend: seguridad de endpoints de empresa.
- Frontend: formularios de alta pro, reservas, perfil cliente y superadmin.
- Verification matrix final:
  - `./mvnw test`
  - `npm run lint`
  - `npm test`
  - `npm run build`

## Suggested Waves

### Wave A

- Seguridad multi-tenant y gobernanza de empresas.

### Wave B

- Integridad de agenda y horarios.

### Wave C

- Onboarding pro y activación B2C.

### Wave D

- UX pendiente, hardening frontend y performance.

### Wave E

- Roadmap de negocio.
