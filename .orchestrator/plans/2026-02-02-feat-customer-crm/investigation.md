# Investigation: Customer CRM Section

## Overview

The goal is to implement a comprehensive Customer Management (CRM) section for the salon admin. This section will allow admins to manage customer information, view appointment history, track pending appointments, and maintain internal notes.

## Current State Analysis

- **Model**: `Customer.java` exists with `name`, `phone`, `email`, `visitsCount`, and `internalNotes`.
- **Relationships**:
  - `Customer` -> `Enterprise` (Many-to-One)
  - `Customer` -> `User` (Optional, for registered users)
  - `Appointment` -> `Customer` (Many-to-One)
- **Controller**: `CustomerController.java` exists but only has an endpoint for fetching customers by enterprise.
- **Service**: `CustomerService.java` exists.
- **Frontend**: No dedicated customer management UI yet.

## Requirements breakdown

1. **Customer List View**:
   - Searchable list of all customers for the enterprise.
   - Quick stats (total visits, last visit).
2. **Customer Detail View**:
   - Contact Info (Name, Phone, Email - editable).
   - Appointment History:
     - Pending Appointments (Filter by date > now).
     - Past Appointments (Filter by date < now).
   - Internal Notes: A text area to save specific customer preferences or history.
3. **Frontend Integration**:
   - New Sidebar item: "Clientes".
   - Responsive design for mobile/desktop.

## Proposed Presentation Options

### Option 1: Master-Detail Layout (Recommended for efficiency)

- **Structure**: A searchable sidebar/list of customers on the left, and a full profile view on the right.
- **Pros**: Very fast navigation; no need to leave the page to check multiple customers.
- **Visuals**: Use a "Profile Header" with an avatar (initials), quick action buttons (Call/WhatsApp/Email), and stats cards.

### Option 2: Table with Bottom/Side Drawer

- **Structure**: A clean table view. Clicking a customer slides in a drawer from the right.
- **Pros**: Familiar spreadsheet-like interface; good for bulk overview.
- **Visuals**: Modern MUI DataGrid with custom cell rendering for status and actions.

### Option 3: Dedicated Profile Page

- **Structure**: Clicking a customer in a list navigates to `/admin/customers/:id`.
- **Pros**: Maximum space for history and notes; feels like a "CRM".
- **Visuals**: Timeline component for appointments, separated sections for info and notes.

## Technical Tasks

### Backend

- [ ] Implement `getCustomerDetails` in `CustomerService` (fetch customer + summary of appointments).
- [ ] Add endpoint `GET /api/customers/{id}/details`.
- [ ] Update `Customer` PATCH/PUT endpoints to allow editing info and notes.
- [ ] (Optional) Add `lastVisit` field or calculate it dynamically.

### Frontend

- [ ] Create `CustomerService.ts`.
- [ ] Create `Customers.tsx` page.
- [ ] Implement Customer List (with search/pagination).
- [ ] Implement Customer Details component (Tabs for Info, Appointments, Notes).
- [ ] Add "Clientes" to navigation.

## Design Inspiration

- **Aesthetics**: Glassmorphism cards for stats, clean typography (Inter), and a "Timeline" view for appointments similar to medical or CRM software.
- **Micro-animations**: Smooth transitions when switching customers or opening the drawer.
