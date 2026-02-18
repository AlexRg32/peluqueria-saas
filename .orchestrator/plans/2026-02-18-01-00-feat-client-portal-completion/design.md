# Design: Client Portal Completion

## Schema Design

### Database Changes

- **Table `enterprises`**:
  - Add column `slug` (VARCHAR(255), UNIQUE, NOT NULL).
  - Constraint: Ensure `slug` matches regex `^[a-z0-9-]+$`.

### API Contracts

#### 1. Public Enterprise Profile

- **Endpoint:** `GET /api/enterprises/slug/{slug}`
- **Output (`EnterpriseResponse`):**

    ```json
    {
      "id": 1,
      "name": "Barberia Alex",
      "slug": "barberia-alex",
      "description": "...",
      "logo": "url",
      "banner": "url",
      "services": [ ... ], // List of ServiceDTO
      "employees": [ ... ], // List of UserDTO (Public info only)
      "workingHours": [ ... ] 
    }
    ```

#### 2. User Appointments

- **Endpoint:** `GET /api/appointments/me`
- **Updated Output (`AppointmentResponse`):**

    ```json
    {
      "id": 101,
      "serviceName": "Corte Caballero",
      "employeeName": "Juan Perez",
      "enterpriseId": 1,
      "enterpriseName": "Barberia Alex",
      "enterpriseSlug": "barberia-alex", // For linking back
      "date": "2026-02-20T10:00:00",
      "status": "CONFIRMED",
      "price": 15.00
    }
    ```

## Frontend Architecture (`peluqueria-client`)

### Directory Structure

```
src/features/client-portal/
├── pages/
│   ├── BarbershopProfilePage.tsx  # /b/:slug
│   └── AppointmentHistoryPage.tsx # /citas
├── components/
│   ├── profile/
│   │   ├── ProfileHeader.tsx
│   │   ├── ServiceList.tsx
│   │   └── StaffGrid.tsx
│   └── history/
│       ├── AppointmentCard.tsx
│       └── HistoryTabs.tsx (Upcoming / Past)
```

### Component Logic

#### `BarbershopProfilePage`

- **State:** `enterprise` (fetched via `usePublicEnterprise(slug)` query).
- **Actions:**
  - Click "Reservar" -> Opens Booking Drawer/Modal (pre-filled enterprise context).
  - Click "Service" -> Maybe auto-select service in booking flow.

#### `AppointmentHistoryPage`

- **State:** `appointments` (fetched via `useMyAppointments()` query).
- **Tabs:** "Próximas" (filter `date >= now`), "Historial" (filter `date < now`).

## Testing Strategy

### Backend

1. **Unit Tests:**
    - `EnterpriseServiceTest`: Verify slug generation/retrieval.
    - `AppointmentServiceTest`: Verify response mapping with enterprise data.
2. **Integration Tests:**
    - `PublicControllerTest`: Ensure /slug endpoint is accessible without auth.
    - `AppointmentControllerTest`: Ensure /me endpoint filters by logged-in user correctly.

### Frontend

1. **Component Tests:**
    - `BarbershopProfilePage`: Renders loading state, content, and error state.
    - `AppointmentHistoryPage`: Renders list correctly.
