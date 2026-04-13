# Investigation: Core Operations Hardening

## Summary

El objetivo es endurecer el núcleo operativo de Saloria para que la agenda y la caja se comporten como un software fiable de peluquería real. La revisión previa mostró que la base técnica existe, pero el dominio de citas y cobros todavía está demasiado simplificado para una operación diaria con recepción, reservas online y varios profesionales trabajando a la vez.

## Current State

- **Tech Stack**: React 19 + Vite en frontend, Spring Boot 3 + Java 21 en backend, PostgreSQL/Flyway en datos.
- **Relevant Code**:
  - `saloria-api/src/main/java/com/saloria/controller/AppointmentController.java`
  - `saloria-api/src/main/java/com/saloria/service/AppointmentService.java`
  - `saloria-api/src/main/java/com/saloria/repository/AppointmentRepository.java`
  - `saloria-client/src/components/appointments/AppointmentDetailsModal.tsx`
  - `saloria-client/src/components/appointments/CheckoutModal.tsx`
  - `saloria-client/src/pages/CalendarPage.tsx`
  - `saloria-client/src/pages/AppointmentHistoryPage.tsx`
  - `saloria-client/src/pages/ClientAccountPage.tsx`
  - `saloria-client/src/services/appointmentService.ts`
- **Architecture**: monolito modular con capa de API REST y SPA única para B2B/B2C.

## Requirements

### Functional

- [ ] Soportar ciclo de vida completo de cita: crear, confirmar, cancelar, marcar no-show, completar.
- [ ] Permitir reprogramar sin perder trazabilidad operativa.
- [ ] Evitar doble reserva del mismo profesional bajo concurrencia.
- [ ] Separar mejor estado de servicio y estado de cobro.
- [ ] Reflejar correctamente los estados en agenda admin y portal cliente.

### Non-Functional

- **Performance**: la protección de solapes no debe degradar la agenda de forma apreciable.
- **Security**: ninguna transición de cita puede saltarse tenancy ni ownership.
- **Reliability**: operaciones concurrentes deben ser deterministas.
- **Operability**: recepción/admin debe resolver el flujo principal en pocos clics.

## Scope

### In Scope

- Dominio `appointments`
- Reglas de estado de cita
- Integridad de agenda / concurrencia
- UX operativa mínima en detalle de cita y vistas relacionadas
- Ajustes de contrato frontend/backend para estados

### Out of Scope

- WhatsApp, email o recordatorios
- depósitos/prepagos con Stripe
- inventario
- comisiones avanzadas
- guest booking anónimo
- app móvil

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Cambiar estados rompe vistas cliente/admin ya existentes | Alto | Introducir estado explícito y tests de contrato frontend/backend |
| Proteger concurrencia solo en app sigue dejando carreras | Alto | Resolver en transacción/BD, no solo en memoria |
| Mezclar “cita completada” con “pago cobrado” complica caja | Alto | Diseñar transiciones separadas aunque la UI inicial sea simple |
| Reprogramación mal diseñada destruye trazabilidad | Medio | Modelarla como update controlado con validación y audit trail mínimo |

## Recommendation

La mejor dirección no es añadir más módulos ahora, sino convertir `appointments` en un mini subdominio serio. Eso implica un state machine claro, garantías de integridad bajo concurrencia y una UI operativa coherente. Si esa base queda sólida, el resto del producto crece mucho mejor.
