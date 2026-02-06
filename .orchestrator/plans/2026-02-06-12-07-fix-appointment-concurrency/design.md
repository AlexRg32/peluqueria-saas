# Design: Appointment Concurrency Control

## 1. Backend Design

### Repository

**File**: `AppointmentRepository.java`

- **Method**: `List<Appointment> findByEmployeeIdAndDateBetween(Long employeeId, LocalDateTime start, LocalDateTime end);`
- **Purpose**: Retrieve all appointments for the target employee on the target day to perform in-memory collision detection.

### Service

**File**: `AppointmentService.java`

- **Logic**:
    1. Determine `appointmentDate` (Start Time) from request.
    2. Determine `duration` from `ServiceOffering`.
    3. Calculate `endTime` (`start + duration`).
    4. Fetch existing appointments for the employee for the *whole day* (`00:00` to `23:59`).
    5. Iterate w/ conflict check:

       ```java
       boolean hasConflict = existingAppointments.stream().anyMatch(existing -> {
           LocalDateTime existingStart = existing.getDate();
           LocalDateTime existingEnd = existingStart.plusMinutes(existing.getService().getDuration());
           return requestStart.isBefore(existingEnd) && requestEnd.isAfter(existingStart);
       });
       ```

    6. Throw `RuntimeException("Employee is not available at this time")` if conflict exists.

## 2. Frontend Design

### Component

**File**: `CreateAppointmentModal.tsx`

- **Logic**:
  - The `onSubmit` handler already exists.
  - Needs to catch errors from the API call.
  - If the error message indicates a conflict (or generic 400/500), display a user-friendly error (e.g., using a toast or setting a form error).
  - *Note*: Currently the user didn't explicitly ask for UI UX improvements, but error feedback is critical for the "fix" to be usable.

## 3. Data Flow

1. User submits form -> 2. `AppointmentService` validates -> 3. If Valid, Save. Else, Throw Error -> 4. Frontend receives error -> 5. User notified.
