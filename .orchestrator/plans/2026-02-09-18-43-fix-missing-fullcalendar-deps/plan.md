# Plan: Fix Missing FullCalendar Dependencies

## Problem Statement

The application fails to start because `@fullcalendar/*` dependencies are missing from `node_modules`, although they are listed in `package.json`.

## Tasks

- [x] Run `npm install` in `peluqueria-client` directory.
- [x] Verify that `@fullcalendar` packages exist in `node_modules`.
- [x] Run `npm run dev` to verify that the application starts without import errors.
