# Investigación: Refactor de Autenticación para Clientes y Empresas

## 1. Análisis del Requerimiento

El usuario desea separar completamente la experiencia de autenticación para Clientes y para Dueños de Empresa (Profesionales). No se usará un toggle, sino páginas y flujos separados.

## 2. Estado Actual

- **Backend**: `AuthenticationService` requiere `enterpriseName` en el registro y asigna `ROLE_ADMIN` por defecto.
- **Frontend**: Existen `/login` y `/register` que actualmente sirven para empresas.

## 3. Propuesta de Arquitectura

### 3.1 Backend (`peluqueria-api`)

- **DTO**: Modificar `RegisterRequest` para que `enterpriseName` sea opcional.
- **Service**: Modificar `AuthenticationService.register`:
  - Si `enterpriseName` está presente -> Crear Empresa + Usuario `ADMIN`.
  - Si `enterpriseName` es nulo/vacío -> Usuario `CLIENTE`, empresa `null`.

### 3.2 Frontend (`peluqueria-client`)

- **Rutas de Clientes**:
  - `/auth/login`: Login para clientes (estilo marketplace).
  - `/auth/register`: Registro para clientes (solo nombre, email, password).
- **Rutas Pro (Empresas)**:
  - `/pro/login`: Login para profesionales.
  - `/pro/register`: Registro para profesionales (pide datos de empresa).
- **Lógica de Redirección**:
  - Centralizar en `AuthContext` o tras completar el login.
  - `ADMIN` -> `/admin/dashboard`.
  - `CLIENTE` -> `/` (Marketplace) o un futuro `/perfil`.

## 4. Próximos Pasos (Design)

- Definir el diseño visual de las nuevas páginas de auth para clientes.
- Asegurar que el `AuthContext` no explote cuando el usuario no tiene empresa (manejo de branding por defecto).
