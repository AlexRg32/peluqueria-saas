# Plan - Fix Service Deletion Confirmation

The goal is to implement a styled confirmation modal when deleting a service in the `ServicesPage`, replacing the current `window.confirm` alert. Additionally, we will clarify that services are soft-deleted, so historical appointments remain intact.

## 1. Investigation ✅

- Verified that `ServiceOffering` is soft-deleted in the backend (`deleted` flag).
- Verified that `Appointment` references `ServiceOffering`, so historical data is preserved.
- Identified `src/components/ui/ConfirmModal.tsx` as the reusable component for confirmations.

## 2. Design ✅

- Use `ConfirmModal` with `variant="danger"`.
- Title: "¿Eliminar servicio?"
- Message: "Esta acción marcará el servicio como no disponible. Las citas existentes con este servicio se mantendrán para el registro histórico, pero no se podrán crear nuevas citas con él."
- Icons and colors should match the premium aesthetic.

## 3. Planning ✅

1. **Modify `ServicesPage.tsx`**:
    - Add state for `isDeleteModalOpen` (boolean).
    - Add state for `serviceToDelete` (number | null).
    - Update `handleDelete` to set state and open modal.
    - Create `handleConfirmDelete` to execute the API call.
    - Render `ConfirmModal` at the bottom of the component.
2. **Verification**:
    - Test deleting a service and ensuring the modal appears.
    - Verify the service is removed from the list after confirmation.

## 4. Implementation ✅

- Edit `peluqueria-client/src/pages/Services.tsx`.

## 5. Verification ✅

- Manual verification of the UI flow.
