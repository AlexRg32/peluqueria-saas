# Plan de Implementación: Autenticación Separada

## Fase 1: Backend (API)

- [ ] Modificar `com.peluqueria.dto.RegisterRequest` para hacer `enterpriseName` opcional.
- [ ] Actualizar `com.peluqueria.service.AuthenticationService.register` para manejar la lógica de roles (ADMIN vs CLIENTE) basada en la presencia de `enterpriseName`.
- [ ] Verificar que `extraClaims` en el JWT manejen valores nulos para la empresa.

## Fase 2: Refactor Frontend (Pro)

- [ ] Renombrar `src/features/auth/pages/LoginPage.tsx` a `ProLoginPage.tsx` y mover a subcarpeta `pro`.
- [ ] Renombrar `src/features/auth/pages/RegisterPage.tsx` a `ProRegisterPage.tsx` y mover a subcarpeta `pro`.
- [ ] Actualizar `LoginForm` y `RegisterForm` actuales para que se llamen `ProLoginForm` y `ProRegisterForm`.

## Fase 3: Nuevas Páginas Frontend (Clientes)

- [ ] Crear `ClientLoginForm.tsx` y `ClientRegisterForm.tsx` con validaciones simplificadas (sin empresa).
- [ ] Crear `ClientLoginPage.tsx` y `ClientRegisterPage.tsx` integradas visualmente con el Marketplace.

## Fase 4: Routing y Navegación

- [ ] Configurar las nuevas rutas en `App.tsx`:
  - Clientes: `/auth/login`, `/auth/register`
  - Pro: `/pro/login`, `/pro/register`
- [ ] Implementar la lógica de redirección basada en el rol del usuario tras un login exitoso.
- [ ] Actualizar los links de "Inicia sesión" y "Regístrate" en el `Navbar` del Marketplace y en el `ProfessionalCTA`.

## Fase 5: Verificación

- [ ] Probar registro de un nuevo cliente (sin empresa).
- [ ] Probar registro de una nueva empresa (con empresa).
- [ ] Verificar que el cliente es redirigido al Marketplace y el administrador al panel de control.
