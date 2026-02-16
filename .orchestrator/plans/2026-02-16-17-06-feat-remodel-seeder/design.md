# Design - Portfolio Seeding Strategy

## Objective

Provide a "one-click" setup that wipes the database and populates it with rich, realistic data that allows a recruiter/viewer to experience all roles (Admin, Worker, Client) immediately.

## Components

### 1. Unified Seeder (`PortfolioSeeder.java`)

I will consolidate the seeding logic into one place or ensure they work together. I'll probably replace `DataSeeder` content with this new portfolio-focused logic.

### 2. Role-Based Access Examples

- **Admin**: Has full access to the dashboard, stats, and settings. Needs some completed appointments to see graphs.
- **Employee**: Can see their own schedule. Needs appointments assigned specifically to them.
- **Client**: Can see their history and book new ones.

### 3. Data Entities

- **Enterprises**: 1 main "Great Barber" enterprise for most tests, and 1-2 secondary ones to show multi-tenancy.
- **Users**:
  - `admin@peluqueria.com` (ADMIN)
  - `trabajador@peluqueria.com` (EMPLEADO)
  - `cliente@peluqueria.com` (CLIENTE)
- **Appointments**:
  - **Past (COMPLETED)**: Last 30 days, used for analytics.
  - **Current (PENDING)**: Today and tomorrow.
  - **Future (CONFIRMED)**: Next week.
  - **Cancelled (CANCELED)**: A few to show edge cases.

## Database Cleanup

The seeder will start by calling `TRUNCATE` on all repositories only if the property `seed.portfolio=true` is provided. This prevents accidental data loss on every restart.

## Logging

No console logs will be used during the process as requested.
