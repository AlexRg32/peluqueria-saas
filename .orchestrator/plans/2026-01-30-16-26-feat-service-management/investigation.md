# Investigation Report: Service Management Functionality

## 1. Request Analysis

The user requires a "Service Management" feature where:

- **Admin View**: A clear, aesthetically pleasing list of services.
- **Creation**: A modal to create new services.
- **Security**: Only `ADMIN` or `SUPER_ADMIN` can create services (Backend enforcement).

## 2. Current State Analysis

### Backend (`peluqueria-api`)

- **Model**: `ServiceOffering` exists (`com.peluqueria.model`). Fields: `name`, `description`, `price`, `image`, `duration`, `category`, `enterprise`.
- **Controller**: `ServiceOfferingController` exists but lacks Method Security (`@PreAuthorize`).
- **Security**: `SecurityConfig` has `@EnableMethodSecurity`, enabling usage of `@PreAuthorize`.
- **Roles**: `Role` enum contains `ADMIN` and `SUPER_ADMIN`.

### Frontend (`peluqueria-client`)

- **Page**: `src/pages/Services.tsx` exists but is a placeholder.
- **Logic**: No existing hooks or components for Service management logic.

## 3. Architecture Decisions

### Backend

- **Security Layer**: Apply `@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")` to `POST /api/services` (create) and `DELETE /api/services/{enterpriseId}/{id}`.
- **Validation**: Ensure `ServiceOffering` DTO has proper validation (not explicitly requested but standard practice).

### Frontend

- **Design System**: Use creating reusable components if possible, or direct Tailwind styling for "Premium" look (Glassmorphism, clean cards).
- **Components**:
  - `ServiceList`: Grid view of services.
  - `ServiceCard`: Individual service display.
  - `CreateServiceModal`: Dialog with form.
- **State Management**: Use `React Query` (if available) or standard `useEffect`/`useState` pattern already present in the app (Need to check if React Query is installed, otherwise stick to established patterns).

## 4. Risks & Considerations

- **Image Handling**: `ServiceOffering` has an `image` field (String). We need to decide if this is a URL or if we need file upload. For now, we will assume it's a URL string input to keep scope within "Functionality Development" without full S3/Storage setup unless prompted.
- **Enterprise Context**: The backend requires `enterprise_id`. The frontend must send the current enterprise ID (likely from Auth Context).

## 5. Next Steps

1. **Design**: Create UI mockups/specs for the Service List and Modal.
2. **Plan**: Detailed task list.
3. **Implementation**: Backend security updates -> Frontend UI -> Integration.
