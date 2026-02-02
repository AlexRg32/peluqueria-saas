# Design: Customer CRM Section

## UI/UX Design

### Layout: Master-Detail

- **Left Panel (Sidebar)**:
  - Search bar (by name or phone).
  - List of customer cards showing Name and Phone.
  - "Add Customer" floating action button.
- **Right Panel (Detail)**:
  - **Header**: Avatar with initials, Name, "Active/Regular" badge, Quick WhatsApp link.
  - **Stats Row**: 3 Cards (Total Visits, Pending Appts, Last Service).
  - **Tabs Section**:
    - **Citas**: Timeline of all appointments (Past/Upcoming).
    - **Información**: Form to edit Name, Phone, Email.
    - **Notas**: Large, auto-saving text area for internal salon notes.

### Color Palette & Aesthetics

- Use `brand-primary` for active states and badges.
- Glassmorphism for the Stats cards.
- Subtle animations when switching between customers in the master-detail view.

## Backend Architecture

### New/Updated DTOs

#### `CustomerDetailResponse` (Extends or replaces CustomerResponse for detail view)

```java
public class CustomerDetailResponse {
    private Long id;
    private String name;
    private String phone;
    private String email;
    private Integer visitsCount;
    private String internalNotes;
    private List<AppointmentSummaryDTO> appointments;
}
```

#### `AppointmentSummaryDTO`

```java
public class AppointmentSummaryDTO {
    private Long id;
    private LocalDateTime date;
    private String serviceName;
    private double price;
    private String employeeName;
    private String status; // PENDING, COMPLETED, CANCELLED
}
```

#### `UpdateCustomerRequest`

```java
public class UpdateCustomerRequest {
    private String name;
    private String phone;
    private String email;
    private String internalNotes;
}
```

### API Endpoints

- `GET /api/customers/enterprise/{enterpriseId}`: Returns list of basic customer info (Already exists, but maybe add search).
- `GET /api/customers/{id}`: Returns `CustomerDetailResponse`.
- `PATCH /api/customers/{id}`: Updates customer info or notes.

## Frontend Components (React)

### `src/pages/Customers.tsx`

The main page managing the state of the selected customer.

### `src/components/customers/CustomerList.tsx`

- Search logic.
- List rendering with `MUI List` and `ListItemButton`.

### `src/components/customers/CustomerProfile.tsx`

- Main container for the right panel.
- Manages Tabs: `Appointments`, `Info`, `Notes`.

### `src/components/customers/AppointmentTimeline.tsx`

- Vertical timeline component showing the history of visits.

## Data Fetching Strategy

- Use `useQuery` (TanStack Query) for fetching customers and details.
- Use `useMutation` for updating notes and customer info to ensure UI stays in sync.
