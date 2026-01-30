# Plan: Preparación de Estadísticas (Citas) y Perfil del Dueño

Prioridad: Implementar el terreno para estadísticas (Estado y Precio de Citas) y luego el perfil de branding.

## 1. Backend: Estado y Precio en Citas (Opción 1)

- [x] Crear Enum `AppointmentStatus` (PENDING, COMPLETED, CANCELED, NO_SHOW).
- [x] Añadir campos `status` y `price` a `Appointment.java`.
- [ ] Actualizar/Crear `AppointmentController` si es necesario para gestionar estados.

## 2. Backend: Perfil de Empresa (Branding)

- [ ] Modify `Enterprise.java` to include:
  - `banner`: String
  - `instagram`: String
  - `facebook`: String
  - `tiktok`: String
  - `whatsapp`: String
  - `primaryColor`: String (default: #c5a059)
  - `secondaryColor`: String (default: #1e293b)
- [ ] Update `EnterpriseService.java`:
  - Add `update` method to handle profile updates.
- [ ] Update `EnterpriseController.java`:
  - Add `PUT /api/enterprises/{id}` endpoint.

## 2. Frontend: Implementation

- [ ] Create/Update `Enterprise` type in frontend.
- [ ] Create `peluqueria-client/src/services/enterpriseService.ts`.
- [ ] Update `Enterprises.tsx`:
  - Fetch enterprise data on mount using `user.enterpriseId`.
  - Create a beautiful, premium form to manage:
    - Basic Info (Name, Address, CIF, Phone, Email, Site).
    - Branding (Logo URL, Banner URL, Colors).
    - Social Networks (Instagram, Facebook, etc.).
  - Add save functionality with loading states and success/error notifications.

## 3. Visual Polish

- [ ] Ensure the design looks "Premium" as per the user's request for rich aesthetics.
- [ ] Add a preview of how the branding colors look.
