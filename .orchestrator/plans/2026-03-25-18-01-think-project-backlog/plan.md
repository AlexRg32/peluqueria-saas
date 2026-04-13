# Plan: Project Backlog

> WARNING: This plan is strictly theoretical. No source code files have been modified.

> Goal: ordenar todo lo pendiente en olas pequeñas, con foco inicial en seguridad y reglas core.
> Architecture: layered backend + SPA híbrida, reforzando tenancy, scheduling y activación B2C.

## Wave A — Critical

- [ ] **Task 1: Cerrar enumeración global de empresas** — `saloria-api/src/main/java/com/saloria/controller/EnterpriseController.java`
  - What: restringir `GET /api/enterprises` a `SUPER_ADMIN` o retirarlo del contrato estándar.
  - Verify: tests de security/autorización; un `CLIENTE` o `ADMIN` normal no puede listar todas las empresas.

- [ ] **Task 2: Revisar creación interna de empresas** — `saloria-api/src/main/java/com/saloria/controller/EnterpriseController.java`
  - What: limitar `POST /api/enterprises` a `SUPER_ADMIN` o eliminarlo si no aporta valor real.
  - Verify: tests de controller/authorization y revisión de llamadas frontend reales.

- [ ] **Task 3: Validar horario laboral real en reservas** — `saloria-api/src/main/java/com/saloria/service/AppointmentService.java`
  - What: rechazar citas fuera de horario general/empleado y contemplar la duración del servicio al validar.
  - Verify: tests backend para fuera de horario, borde de cierre y horario válido.

## Wave B — High

- [ ] **Task 4: Eliminar side effects de GET en horarios** — `saloria-api/src/main/java/com/saloria/service/WorkingHourService.java`
  - What: sustituir `initializeHours(...)` en lectura por snapshots/defaults no persistidos y crear un flujo explícito de inicialización.
  - Verify: `GET` no genera filas nuevas; tests de servicio con base vacía.

- [ ] **Task 5: Alinear el selector de horas con disponibilidad real** — `saloria-client/src/components/appointments/CreateAppointmentModal.tsx`, `saloria-client/src/components/ui/DateTimePicker.tsx`
  - What: usar horarios del empleado seleccionado y modelar slots compatibles con la validación backend.
  - Verify: tests/UI manual donde cambiar de profesional cambie horas disponibles.

- [ ] **Task 6: Alinear política de contraseñas pro** — `saloria-client/src/features/auth/components/pro/ProRegisterForm.tsx`, `saloria-api/src/main/java/com/saloria/dto/RegisterRequest.java`
  - What: unificar mínimos y mensajes entre frontend y backend.
  - Verify: el formulario no acepta nada que luego la API rechace por longitud.

## Wave C — High Product

- [ ] **Task 7: Completar onboarding profesional** — `saloria-api/src/main/java/com/saloria/service/AuthenticationService.java`, `saloria-api/src/main/java/com/saloria/service/EnterpriseService.java`
  - What: generar slug/configuración mínima al registrar o forzar setup obligatorio al primer login.
  - Verify: una empresa recién creada puede quedar visible en directorio o recibe wizard claro y obligatorio.

- [ ] **Task 8: Endurecer contrato de JWT/documentación** — `README.md`, `saloria-api/src/main/java/com/saloria/security/JwtUtil.java`
  - What: documentar Base64 de forma inequívoca o soportar secreto raw de forma segura.
  - Verify: arranque local siguiendo README sin errores por secreto incompatible.

## Wave D — Moderate

- [ ] **Task 9: Sustituir perfil cliente placeholder** — `saloria-client/src/App.tsx`, `saloria-client/src/pages/ProfilePlaceholder.tsx`
  - What: implementar perfil real o rebajar explícitamente la ruta a “resumen de cuenta” sin naming de placeholder.
  - Verify: ruta `/perfil` con copy/acciones definitivas y tests actualizados.

- [ ] **Task 10: Implementar panel real de superadmin** — `saloria-client/src/App.tsx`
  - What: reemplazar el `<div>` stub por una pantalla útil o quitar la ruta hasta que exista.
  - Verify: navegación superadmin sin pantallas temporales.

- [ ] **Task 11: Reducir peso del bundle principal** — `saloria-client/src/components/appointments/AppointmentDetailsModal.tsx` y puntos de importación
  - What: lazy-load para PDF y flujos pesados.
  - Verify: `npm run build` con chunk principal sensiblemente menor.

- [ ] **Task 12: Limpiar branding del ticket PDF** — `saloria-client/src/components/appointments/AppointmentDetailsModal.tsx`
  - What: usar marca Saloria/empresa real en lugar de textos heredados.
  - Verify: ticket generado con branding correcto.

- [ ] **Task 13: Reducir ruido de tests UI** — tests de `framer-motion`
  - What: ajustar mocks para no propagar props inválidas al DOM.
  - Verify: `npm test` sin warnings repetitivos de `whileInView`.

## Wave E — Roadmap

- [ ] **Task 14: Pagos y depósitos online** — backend + frontend + proveedor de pago
  - What: integrar pagos parciales o completos en reserva.
  - Verify: reserva con señal/prepago y estado conciliado.

- [ ] **Task 15: Notificaciones automáticas** — backend jobs + proveedor externo
  - What: enviar confirmaciones y recordatorios por email/WhatsApp.
  - Verify: flujo completo de recordatorio en entorno controlado.

- [ ] **Task 16: Portal cliente avanzado** — perfil/citas cliente
  - What: permitir reprogramar, cancelar y editar perfil.
  - Verify: usuario cliente puede autogestionar su cita extremo a extremo.

## Validation Before Implementation

- [x] Every task has What + Verify
- [x] Tasks are in dependency order
- [x] No task exceeds ~15 min si se ejecuta dividida por PRs pequeños
