# Design Document: Service Management

## 1. Backend Design

### ServiceOfferingController

We need to secure the write operations.

**Modifications:**

- Class `com.peluqueria.controller.ServiceOfferingController`
- Validation: Ensure `serviceOffering` payload has valid data before saving (basic null checks handled by DB constraints, but we can add `@Valid` if DTOs were used, for now reliance on Entity).

**Endpoints Security:**

- `POST /api/services`: Add `@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")`.
- `DELETE /api/services/{enterpriseId}/{id}`: Add `@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")`.
- `GET` endpoints remain accessible (possibly to `CLIENTE` as well, or at least `EMPLEADO`).

## 2. Frontend Design

### Component Architecture

We will create a `services` directory in components to keep things organized: `src/components/services`.

#### 1. `ServiceCard.tsx`

Displays a single service.

- **Props**: `service: ServiceOffering`
- **UI**:
  - Card layout with `white` background (or dark mode equivalent).
  - Image thumbnail (cover).
  - Title (`font-bold`).
  - Price tag.
  - Duration icon + text.
  - Action buttons (Delete - only for Admin).

#### 2. `CreateServiceModal.tsx`

Modal for adding a new service.

- **Props**: `isOpen: boolean`, `onClose: () => void`, `onSuccess: () => void`, `enterpriseId: number`.
- **Form Fields**:
  - Name (Text)
  - Description (Textarea)
  - Price (Number)
  - Duration (Number, minutes)
  - Category (Text/Select)
  - Image URL (Text input for now)
- **UI**:
  - Fixed overlay `z-50`.
  - Centered container.
  - "Create" button with loading state.

#### 3. `ServicesPage.tsx`

Main orchestrator.

- **State**: `services` list, `isModalOpen`, `isLoading`.
- **Effect**: Fetch services on mount using `getAllServicesByEnterpriseId`.
- **Render**:
  - Header with "Create Service" button (Conditional rendering based on role is ideal, but backend protection is mandatory).
  - Grid layout (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
  - `ServiceCard` mapped from list.

### Aesthetics (Premium Look)

- **Colors**: Use slate/gray for text, primary brand color for actions (e.g., Indigo/Violet/Blue).
- **Shadows**: `shadow-lg` for cards on hover.
- **Transitions**: `transition-all duration-300` for hover effects.
- **Gradients**: Subtle background gradients for headers or buttons.

## 3. Data Flow

1. User clicks "Servicios" in sidebar -> `ServicesPage` mounts.
2. `useEffect` triggers `fetch('/api/services/{enterpriseId}')`.
3. Admin clicks "New Service" -> `isModalOpen(true)`.
4. Form Submit -> `POST /api/services` with JSON payload.
5. On 200 OK -> Close Modal, Refetch List (or append to state).
