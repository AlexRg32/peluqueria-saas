# Design: Hard Delete with Cascading for Users

## Backend Design

### Service Layer Changes (`UserService.java`)

- Annotate `deleteUser` with `@Transactional`.
- Logic:
  1. `appointmentRepository.deleteByEmployeeId(id)`
  2. `customerRepository.findByUserId(id)` -> for each customer, `appointmentRepository.deleteByCustomerId(customer.getId())` followed by `customerRepository.delete(customer)`.
  3. `userRepository.deleteById(id)`.

### Repository Layer Changes

- `AppointmentRepository`: `void deleteByEmployeeId(Long employeeId)`
- `AppointmentRepository`: `void deleteByCustomerId(Long customerId)`
- `CustomerRepository`: `Optional<Customer> findByUserId(Long userId)`

## Frontend Design

### Custom Modal (`src/components/ui/ConfirmModal.tsx`)

A generic modal for confirmations:

- `title`: string
- `message`: string
- `onConfirm`: () => void
- `onCancel`: () => void
- `isOpen`: boolean
- `confirmText`: string (default "Confirmar")
- `cancelText`: string (default "Cancelar")
- `variant`: 'danger' | 'info' (default 'info')

### Integration in `UsersPage.tsx`

- Replace `window.confirm`.
- Use `ConfirmModal` with `variant="danger"`.
