# Guidelines & Clean Code Findings

## Findings

1. `GET /api/working-hours/enterprise/{enterpriseId}` y `GET /api/working-hours/user/{userId}` siguen teniendo side effects persistentes: si no existen filas, las crean en lectura mediante `initializeHours(...)`.
   - Referencias:
     - `saloria-api/src/main/java/com/saloria/service/WorkingHourService.java:31-50`
     - `saloria-api/src/main/java/com/saloria/service/WorkingHourService.java:114-128`

2. El flujo de perfil cliente sigue siendo una versión mínima funcional, no una pantalla de perfil real. La propia ruta y componente siguen nombrados como placeholder.
   - Referencias:
     - `saloria-client/src/App.tsx:53-56`
     - `saloria-client/src/pages/ProfilePlaceholder.tsx:9-135`

3. Queda un stub visible en routing para `SUPER_ADMIN` en lugar de una pantalla real de gestión global.
   - Referencia:
     - `saloria-client/src/App.tsx:90-93`

4. La política de contraseña no está alineada entre frontend y backend para alta profesional.
   - Frontend acepta 4 caracteres:
     - `saloria-client/src/features/auth/components/pro/ProRegisterForm.tsx:12-13`
   - Backend exige 8:
     - `saloria-api/src/main/java/com/saloria/dto/RegisterRequest.java:24-29`

5. Los tests del frontend pasan, pero hay ruido recurrente por el mock de `framer-motion` (`whileInView` propagado al DOM), lo que reduce señal en CI.
   - Evidencia:
     - `npm test` OK, pero con warnings de React sobre `whileInView`
   - Referencia de uso:
     - `saloria-client/src/features/client-portal/components/SalonCard.tsx:58`
