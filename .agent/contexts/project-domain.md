# Project Domain Context

> **Note to the Developer**: This file is the primary source of truth for the AI agents to understand what your application is about. You must describe your core business rules, entities, and flow here. The agents (`@backend`, `@frontend`, `@architect`) are pre-configured to build a **Spring Boot + React** application, but they rely on this file to know *what* to build.

## Project Name

Peluquería SaaS

## Description

A comprehensive SaaS platform built for beauty salons, barbershops, and aesthetic centers to manage appointments, clients (CRM), employees, and analytics. It is built as a Multi-tenant solution to securely support multiple businesses on a single instance.

## Core Entities

- **Empresa (Tenant)**: The salon or business. It owns all related data (services, employees, appointments).
- **Usuario (User)**: Accounts that access the system. Can have roles such as Administrador, Empleado, or Cliente.
- **Servicio (Service)**: Services provided by the Empresa (e.g., 'Corte de Caballero'). Has a price and duration.
- **Cita (Appointment)**: A scheduled block connecting a Cliente with an Empleado for specific Servicio(s) at a specific time.

## Key Business Rules

1. **Multi-tenancy isolation**: All business data (citas, servicios, empleados) MUST be scoped to the specific `Empresa`. Cross-tenant data access is strictly forbidden.
2. **Scheduling constraints**: Appointments can only be booked during the working hours of the selected Empleado and cannot overlap (unless explicitly allowed).
3. **Self-service Booking**: Clients can autonomously book appointments 24/7 via the B2C public booking portal based on real-time availability.

## User Roles & Permissions

- **Administrador (Dueño)**: Full access. Can configure the business, manage employees, create services, view full agendas, and view financial reports.
- **Empleado**: Can view the business agenda and manage appointments, but cannot change business configurations or view financial reports.
- **Cliente (B2C)**: Can book appointments, manage their own profile, and view their past/future appointments.

## Important Technical Decisions (Specific to this project)

- **Backend Stack**: Java 17, Spring Boot 3, PostgreSQL 15, JWT.
- **Frontend Stack**: TypeScript, React 18 (Vite), Tailwind CSS, React Query.
- **Architecture Pattern**: Backend uses standard Layered Architecture (`Controller -> Service -> Repository`). DTOs are mandatory for all API requests/responses. No business logic in Controllers.
- **Infrastructure**: Docker for local dev. Deployment targets are Render & Vercel.
