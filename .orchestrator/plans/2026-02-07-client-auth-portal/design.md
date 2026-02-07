# Diseño: Autenticación Separada (Clientes vs Profesionales)

## 1. Cambios en Backend

### 1.1 DTO `RegisterRequest`

- Nombre de la empresa marcado como opcional.

### 1.2 `AuthenticationService`

- Lógica:

  ```java
  public AuthResponse register(RegisterRequest request) {
      if (request.getEnterpriseName() != null && !request.getEnterpriseName().isBlank()) {
          // Flujo Admin
          // ... crear empresa ...
          // ... user.setRole(Role.ADMIN) ...
      } else {
          // Flujo Cliente
          // ... user.setRole(Role.CLIENTE) ...
          // ... user.setEnterprise(null) ...
      }
  }
  ```

## 2. Cambios en Frontend

### 2.1 Nueva Estructura de Archivos

- `src/features/auth/pages/client/ClientLoginPage.tsx`
- `src/features/auth/pages/client/ClientRegisterPage.tsx`
- `src/features/auth/pages/pro/ProLoginPage.tsx` (renombrar el actual)
- `src/features/auth/pages/pro/ProRegisterPage.tsx` (renombrar el actual)

### 2.2 Componentes de Formulario

- `src/features/auth/components/ClientLoginForm.tsx`
- `src/features/auth/components/ClientRegisterForm.tsx`
- `src/features/auth/components/ProLoginForm.tsx` (refactor del actual)
- `src/features/auth/components/ProRegisterForm.tsx` (refactor del actual)

### 2.3 Redirección Post-Login

- En el componente que maneje el éxito del login (o en `AuthContext`), implementar:

  ```typescript
  const handleSuccess = (user) => {
    if (user.role === 'ADMIN') navigate('/admin');
    else navigate('/');
  }
  ```

## 3. Estética (UI/UX)

- **Profesional**: Usar el tema actual (oscuro, elegante, azul/slate).
- **Cliente**: Un diseño más "vibrante" o integrado con el Marketplace, quizás usando más claridad o colores de la marca principal de la plataforma.
