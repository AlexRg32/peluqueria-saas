# Investigation: Fix Appointment Concurrency

## 1. Request Analysis

The user reports an issue where multiple appointments can be created at the same time for the same employee ("prevent creating 2 appointments at the same time"). This indicates a lack of server-side validation for appointment overlaps.

## 2. Current State

- **Backend**:
  - `AppointmentService.create` blindly saves new appointments.
  - `AppointmentRepository` lacks queries to detect overlaps.
  - `Appointment` entity stores `date` (start time) but not `endTime`. End time is derived from `ServiceOffering.duration`.
- **Frontend**:
  - `CreateAppointmentModal` submits creation requests without pre-validation of conflicts.

## 3. Root Cause

No validation exists to check if (`newStart` < `existingEnd`) and (`newEnd` > `existingStart`) for the same employee.

## 4. Proposed Solution

1. **Repository Layer**:
    - Add a method to fetch appointments for a specific employee within a specific time range (e.g., the target day).
    - Alternatively, add a JPQL query that directly checks for overlaps if possible, but calculating end time (start + duration) in SQL/JPQL dynamically can be DB-specific.
    - **Decision**: Fetch all appointments for the employee on the target day and filter in memory (Java) for simplicity and DB-agnosticism, as daily appointment volume is low (~20-50 max).

2. **Service Layer**:
    - In `create()`:
        - Fetch the `ServiceOffering` to get the `duration`.
        - Calculate `requestStart` and `requestEnd`.
        - Fetch existing appointments for the employee on that day.
        - Iterate through existing appointments:
            - Calculate `existingStart` and `existingEnd` (from *their* service duration).
            - Check for overlap: `requestStart < existingEnd && requestEnd > existingStart`.
        - If overlap found, throw a custom exception (e.g., `RuntimeException` "Time slot not available").

3. **Frontend**:
    - Ensure the failure response (400/409) is displayed as a toast or validation error in `CreateAppointmentModal`.

## 5. Artifacts to Modify

- `peluqueria-api/src/main/java/com/peluqueria/repository/AppointmentRepository.java`
- `peluqueria-api/src/main/java/com/peluqueria/service/AppointmentService.java`
- (Optional) `peluqueria-client` to improve error handling if not already generic.

## 6. Verification Plan

- Create an appointment at T1 with Duration D1.
- Attempt to create another appointment at T1 (overlap). -> Expect Fail.
- Attempt to create another appointment at T1 + D1 (adjacent). -> Expect Success.
- Attempt to create another appointment at T1 + D1/2 (partial overlap). -> Expect Fail.
