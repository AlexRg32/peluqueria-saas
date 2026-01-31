# Design Phase

## 1. Domain Models (Backend)

### `Appointment` Entity

- **Relationships**:
  - `user`: Customer (@ManyToOne, nullable=false) - Existing
  - `service`: ServiceOffering (@ManyToOne, nullable=false) - Existing
  - `enterprise`: Enterprise (@ManyToOne, nullable=false) - Existing
  - **`employee`**: `User` (@ManyToOne, nullable=false, JoinColumn="employee_id") - **NEW**
    - Constraint: User must have `ROLE_EMPLEADO` (Application logic check).

### `AppointmentDTO`

- **Request**:

    ```java
    public class CreateAppointmentRequest {
        private Long serviceId;
        private Long employeeId; // NEW
        private Long userId; // For now admin selects registered user
        private LocalDateTime date;
    }
    ```

- **Response**:

    ```java
    public class AppointmentResponse {
        private Long id;
        private String customerName;
        private String employeeName; // NEW
        private String serviceName;
        private LocalDateTime date;
        private Integer duration;
        private double price;
        private String status;
    }
    ```

## 2. API Endpoints

### `AppointmentController`

- `GET /api/appointments`
  - Query Params: `enterpriseId`, `startDate` (ISO), `endDate` (ISO).
  - Returns: `List<AppointmentResponse>`.
- `POST /api/appointments`
  - Body: `CreateAppointmentRequest`.
  - Returns: `AppointmentResponse`.

### `UserController` (or `EnterpriseController`)

- Need an endpoint to list employees for the dropdown.
- `GET /api/enterprises/{id}/employees` -> Return users with `ROLE_EMPLEADO` for that enterprise.

## 3. Frontend Architecture

### Components

1. **`CalendarPage`**
    - **Layout**: Full width, premium card.
    - **Libraries**: `react-big-calendar`, `date-fns`.
    - **State**: `currentDate`, `view` (Month/Week/Day), `appointments` (List).
    - **Interactions**:
        - Click slot -> Open `CreateAppointmentModal` (pre-fill date/time).
        - Click event -> Open `ViewAppointmentModal`.

2. **`CreateAppointmentModal`**
    - **Form**: `react-hook-form` + `zod` validation.
    - **Fields**:
        - **Customer**: Select (Mock with list of users or autocomplete if possible, for now simple select).
        - **Employee**: Select (fetch from `/api/enterprises/{id}/employees`).
        - **Service**: Select (fetch from `/api/services`).
        - **Date/Time**: Datetime picker.
    - **Validation**: Required fields. Ensure time slot is available (Backend should validate, Frontend can verify if possible).

3. **`AppointmentCard` (Event Component)**
    - Custom event renderer for the calendar.
    - Shows: Service Name, Customer Name, and Duration.
    - Style: Distinct color per Employee or Service.

### Services

- `appointmentService.ts`:
  - `getAll(params)`
  - `create(data)`
- `userService.ts`:
  - `getEmployees(enterpriseId)`
  - `getCustomers(enterpriseId)` (to populate customer select).

## 4. Implementation Steps

1. **Backend Model**: Add `employee` to `Appointment`.
2. **Backend API**: Implement Controller/Service logic.
3. **Frontend Setup**: Install libs.
4. **Frontend Components**: Build Calendar and Modal.
