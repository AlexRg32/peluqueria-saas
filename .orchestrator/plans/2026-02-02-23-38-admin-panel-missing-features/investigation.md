# Investigation: Missing Features for Admin Panel

## Objective

Analyze the current state of the "Peluquería SaaS" admin panel and identify missing features or UX improvements necessary for a premium, production-ready product.

## Current Status Analysis

### 1. Existing Features

- **Authentication**: Login, Register (with Role-based access).
- **Enterprise Management**: Basic info, branding (colors, logo, banner), social links.
- **Service Management**: CRUD for services (prices, durations).
- **CRM (Customers)**: Basic listing and creation.
- **User/Employee Management**: Listing and basic editing.
- **Appointment Management**: Visual calendar with basic creation.
- **Technical Base**: Spring Boot API + React Vite, DTO pattern, layered architecture.

### 2. Gaps & Opportunities (The "What's Missing?")

#### A. Dashboard & Analytics (High Priority)

- **Current State**: None. The user lands on "/" and gets redirected to "/empresas".
- **Missing**:
  - **KPI Cards**: Appointments today, growth % vs previous week, Revenue of the month.
  - **Charts**: Sales over time, Most requested services, Employee performance (appointments handled).
  - **Activity Feed**: Recent appointments or cancellations.

#### B. Advanced Scheduling & Operations (Medium-High Priority)

- **Current State**: Primitive calendar.
- **Missing**:
  - **Status Management UI**: Ability to mark an appointment as "Completed", "Canceled", or "No Show" from the calendar or a list.
  - **Filters**: View calendar by specific Employee (currently shows all for the enterprise).
  - **Shift Management**: UI to configure `WorkingHour` for each employee (breaks, lunch time, etc.).
  - **Conflict Resolution**: Preventing double-booking (check if logic exists in backend).

#### C. CRM & Customer Experience (Medium Priority)

- **Current State**: Basic list.
- **Missing**:
  - **Customer Detail Page**: History of visits, total spent, preferred services.
  - **Notes/Tags**: Important info for the barber (e.g., "likes very short", "allergy to hairspray").
  - **Automated Reminders**: Integration with WhatsApp/SMS/Email (at least the logic/hooks).

#### D. Financials & Billing (Medium Priority)

- **Current State**: `price` field in `Appointment` but no usage.
- **Missing**:
  - **Quick Billing**: Button to generate a "Sale" from a completed appointment.
  - **Daily Closure**: Total cash vs. card reports for at the end of the day.
  - **Expense Tracking**: Subtracting rent, materials, or salaries to see net profit.

#### E. Branding & UX Polish (Aesthetic Priority)

- **Current State**: Functional but can be more "Premium".
- **Missing**:
  - **Dark Mode Support**: Essential for modern SaaS.
  - **Micro-interactions**: Better loading states, skeleton screens, and transitions between views.
  - **Public Booking Page**: A specific page for customers to book without logging into the admin panel.

## Technical Feasibility & Next Steps

1. **Dashboard Controller/Service**: Create a dedicated service in `peluqueria-api` to aggregate data (Revenue, Appointment counts).
2. **UI Refactoring**: Add a "Dashboard" sidebar item and set it as the default home page.
3. **Calendar Enhancement**: Integrate Status updates and Employee filtering.

## Potential Implementation Roadmap

1. **Phase 1**: Interactive Dashboard (KPIs + Revenue Chart).
2. **Phase 2**: Operational Excellence (Status management, Employee filters).
3. **Phase 3**: Financial basic reporting.

---
*Created by @architect*
