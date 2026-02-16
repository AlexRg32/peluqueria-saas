# Plan - Fix Foreign Key Constraint Error

The application is failing to start correctly (specifically failing to apply DDL updates) because existing data violates referential integrity. We need to clean up these orphan records.

## Problem

Hibernate attempts to execute:

- `alter table if exists appointments add constraint ... foreign key (employee_id) references app_users`
- `alter table if exists appointments add constraint ... foreign key (service_id) references service_offerings`
- `alter table if exists working_hours add constraint ... foreign key (user_id) references app_users`

These fail because:

- `appointments` has `employee_id=12` (not in `app_users`)
- `appointments` has `service_id=16` (not in `service_offerings`)
- `working_hours` has `user_id=4` (not in `app_users`)

## Proposed Changes

We will clean the database using `psql` via Docker.

### Tasks

- [x] Task 1: Clean orphan appointments referencing non-existent employees.
- [x] Task 2: Clean orphan appointments referencing non-existent services.
- [x] Task 3: Clean orphan working hours referencing non-existent users.
- [x] Task 4: Verify and inform user to restart.
