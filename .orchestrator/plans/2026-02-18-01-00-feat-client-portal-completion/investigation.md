# Investigation: Client Portal Completion

## Goal

Complete the Client Portal (Marketplace) by implementing the Barbershop Profile page and Appointment History, ensuring a seamless booking flow.

## Current State Analysis

### Backend (`peluqueria-api`)

1. **Missing `PublicController`:** The `PublicController` mentioned in user metadata seems missing from disk. It's needed for public access to enterprise data.
2. **`Enterprise` Model:** Lacks a `slug` field, which is required for the requested `/b/:slug` URL structure.
    - *Action:* Add `slug` field (unique) to `Enterprise`.
3. **`AppointmentResponse` DTO:** Lacks enterprise context (ID, Name).
    - *Action:* Add `enterpriseId` and `enterpriseName` to `AppointmentResponse`.
4. **Endpoints:**
    - Start with `GET /api/public/enterprises/slug/{slug}` to fetch enterprise details publicly.
    - Update `GET /api/appointments/me` to include enterprise details.

### Frontend (`peluqueria-client`)

1. **Routing:**
    - `/b/:slug` -> `BarbershopProfilePage` (currently a placeholder).
    - `/citas` -> `AppointmentsPage` (currently a placeholder).
2. **Mock/Missing Components:**
    - `BarbershopProfilePage`: Needs to fetch enterprise by slug, show services/workers, and initiate booking.
    - `AppointmentsPage`: Needs to list past/upcoming appointments.
    - Booking Flow: Needs to integrity with the profile page (likely reusing existing booking components or creating a specialized flow).

## Architecture & Implementation Plan

### Phase 1: Backend Foundation

1. **Modify `Enterprise` Entity:**
    - Add `private String slug;` with `@Column(unique = true)`.
    - Update repository to `findBySlug`.
2. **Enhance `AppointmentResponse`:**
    - Add `enterpriseId`, `enterpriseName`, `enterpriseSlug`.
    - Update `AppointmentService` mapper.
3. **Create `PublicController`:**
    - `GET /api/public/enterprises/slug/{slug}`: Return generic details + services + valid workers.
4. **Tests:**
    - Create `PublicControllerTest`.
    - Update `AppointmentControllerTest`.

### Phase 2: Frontend Implementation

1. **Types & Services:**
    - Update `Enterprise` type to include `slug`.
    - Create `PublicService` (frontend) to fetch public enterprise data.
2. **`BarbershopProfilePage`:**
    - Show header (Logo, Name, Description).
    - Show Services List.
    - Show Gallery (if available) / Workers.
    - "Reservar" button triggering the Booking Modal (pre-selecting enterprise).
3. **`AppointmentsPage` (History):**
    - Show list of appointments with "Re-schedule" or "Cancel" options.
    - Group by Past/Upcoming.

### Phase 3: "Recuerda los Test"

- Ensure backend tests cover new endpoints.
- Ensure frontend has basic unit tests for new pages.

## Questions/Assumptions

- We assume `ddl-auto` is set to `update` to handle the new `slug` column.
- We will generate slugs for existing enterprises based on name if they are null (might need a startup task or manual update).
