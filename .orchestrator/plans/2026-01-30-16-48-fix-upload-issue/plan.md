# Implementation Plan: Fix Upload Issue

## 1. Backend Configuration

- [x] **Increase Limits**: In `peluqueria-api/src/main/resources/application.properties`, add `spring.servlet.multipart.max-file-size=10MB` and `spring.servlet.multipart.max-request-size=10MB`.
- [x] **Add Logging**: In `ServiceOfferingController.java`, add debug logs to `createServiceOffering` to trace request arrival.

## 2. Frontend Fix

- [x] **Axios Header Fix**: In `peluqueria-client/src/services/serviceOfferingService.ts`, remove the explicit `Content-Type: multipart/form-data` header to allow browser to generate boundary.

## 3. Verification

- [ ] **Manual Test**: Restart Backend. Try uploading again. Check both browser network tab (for status) and backend logs.
