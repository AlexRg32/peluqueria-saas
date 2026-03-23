# 📑 Contratos de API (API Contract)

Este documento detalla los endpoints expuestos por el backend de **Saloria**. Sirve como contrato de integración para el desarrollo del Client-Side (Frontend o Apps Móviles).

> **Nota de Seguridad**: Todos los endpoints que no sean explícitamente públicos requieren la inclusión de un token JWT válido en las cabeceras de la petición: `Authorization: Bearer <JWT_TOKEN>`.
> Además, tienen **protección contra IDOR automática**: Se verifica rigurosamente mediante `SecurityService` que el ID del usuario o el ID de la empresa en cada endpoint corresponda legítimamente al contexto de la empresa del token JWT proporcionado.

---

## 🔒 1. Autenticación (`AuthController`)

**Base Path:** `/auth`

### Registrar nueva empresa y administrador

- **Método:** `POST /auth/register`
- **Autorización:** *Público*
- **Descripción:** Crea una nueva empresa junto con su cuenta de administrador inicial en un solo paso.
- **Body Esperado:** Objeto `RegisterRequest` (Datos de empresa + Usuario Admin).
- **Respuesta:** `AuthResponse` (Contiene `access_token`).

### Iniciar sesión

- **Método:** `POST /auth/login`
- **Autorización:** *Público*
- **Descripción:** Autentica a un usuario usando email y contraseña, y devuelve el token JWT de acceso.
- **Body Esperado:** Objeto `AuthRequest` (`email`, `password`).
- **Respuesta:** `AuthResponse` (Contiene `access_token` y detalles del usuario).

---

## 🌍 2. Público (`PublicController`)

**Base Path:** `/api/public`
**Propósito:** Endpoints de acceso 100% público requeridos para el "Client Portal" (reservas de clientes sin cuenta previa).

### Obtener empresa por Slug

- **Método:** `GET /api/public/enterprises/slug/{slug}`
- **Descripción:** Recupera la información pública de una empresa a partir de su identificador único (slug).
- **Respuesta:** `EnterpriseResponse`.

### Listar servicios de empresa

- **Método:** `GET /api/public/enterprises/{id}/services`
- **Descripción:** Obtiene el catálogo completo de servicios activos que ofrece una empresa.
- **Respuesta:** Lista de `ServiceOfferingResponse`.

### Listar empleados de empresa

- **Método:** `GET /api/public/enterprises/{id}/employees`
- **Descripción:** Obtiene la lista de empleados para que el usuario pueda reservar citas con ellos.
- **Respuesta:** Lista de `UserResponse`.

---

## 👥 3. Usuarios y Empleados (`UserController`)

**Base Path:** `/api/users`

### Listar usuarios de una empresa

- **Método:** `GET /api/users/{enterpriseId}`
- **Autorización:** `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`
- **Descripción:** Obtiene la lista de todos los usuarios (empleados/admins) asociados al ID de una empresa.
- **Respuesta:** Lista de `UserResponse`.

### Crear nuevo usuario

- **Método:** `POST /api/users`
- **Autorización:** `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`
- **Descripción:** Permite a un administrador registrar a un nuevo empleado dentro de su empresa.
- **Body Esperado:** Entidad `User`.
- **Respuesta:** `UserResponse`.

### Actualizar usuario

- **Método:** `PUT /api/users/{id}`
- **Autorización:** `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`
- **Descripción:** Actualiza los datos personales, rol o información profesional de un usuario existente.
- **Body Esperado:** Entidad `User`.
- **Respuesta:** `UserResponse`.

### Eliminar usuario

- **Método:** `DELETE /api/users/{id}`
- **Autorización:** `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`
- **Descripción:** Realiza un borrado lógico (soft delete) del usuario desvinculándolo del panel activo.

---

## 🏢 4. Empresas (`EnterpriseController`)

**Base Path:** `/api/enterprises`

### Listar todas las empresas

- **Método:** `GET /api/enterprises`
- **Descripción:** Obtiene un directorio de todas las empresas afiliadas a la plataforma.

### Crear nueva empresa internamente

- **Método:** `POST /api/enterprises`
- **Autorización:** `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`
- **Body:** Entidad `Enterprise`.

### Detalles de empresa

- **Método:** `GET /api/enterprises/{id}`
- **Respuesta:** `EnterpriseResponse`.

### Actualizar empresa

- **Método:** `PUT /api/enterprises/{id}`
- **Autorización:** `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`
- **Body:** Entidad `Enterprise`.

### Empleados internos

- **Método:** `GET /api/enterprises/{id}/employees`
- **Descripción:** Obtiene empleados internos de la empresa.

---

## 📊 5. Dashboard y Métricas (`DashboardController`)

**Base Path:** `/api/dashboard`

### Obtener métricas rápidas

- **Método:** `GET /api/dashboard/stats/{enterpriseId}`
- **Autorización:** `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`
- **Descripción:** Calcula total de citas del día, total de ingresos estimados del mes y estadísticas demográficas.
- **Respuesta:** `DashboardStatsDTO`.

---

## ✂️ 6. Servicios Ofrecidos (`ServiceOfferingController`)

**Base Path:** `/api/services`

### Listar catálogo de la empresa

- **Método:** `GET /api/services/{enterpriseId}`
- **Respuesta:** Lista de `ServiceOfferingResponse`.

### Crear nuevo servicio

- **Método:** `POST /api/services`
- **Autorización:** `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`
- **Descripción:** Crea un nuevo servicio (soporta subida de imágenes via multipart).
- **Body/Form-data:** `service` (JSON string) e `image` (MultipartFile opcional).
- **Respuesta:** `ServiceOfferingResponse`.

### Detalle de servicio

- **Método:** `GET /api/services/{enterpriseId}/{id}`
- **Respuesta:** `ServiceOfferingResponse`.

### Eliminar servicio

- **Método:** `DELETE /api/services/{enterpriseId}/{id}`
- **Autorización:** `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`
- **Descripción:** Borra un servicio existente.

---

## 📅 7. Citas y Facturación (`AppointmentController`)

**Base Path:** `/api/appointments`

### Crear cita internamente

- **Método:** `POST /api/appointments`
- **Autorización:** `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`
- **Body:** `CreateAppointmentRequest`.

### Mis Citas

- **Método:** `GET /api/appointments/me`
- **Descripción:** Lista las próximas citas del usuario autenticado.

### Listar todas las citas

- **Método:** `GET /api/appointments?enterpriseId={id}`
- **Descripción:** Recupera todas las reservas registradas en una empresa.

### Citas por empleado

- **Método:** `GET /api/appointments/employee/{employeeId}`
- **Descripción:** Útil en el modo vista de calendario, lista citas de un empleado específico.

### Checkout (Pagar Cita)

- **Método:** `POST /api/appointments/{id}/checkout`
- **Autorización:** `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`
- **Body:** `{"paymentMethod": "CASH | CARD | TRANSFER"}`
- **Descripción:** Cambia el estado de la cita a COMPLETADA y registra el pago.

### Transacciones

- **Método:** `GET /api/appointments/transactions?enterpriseId={id}&start={isoDate}&end={isoDate}`
- **Autorización:** `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`
- **Descripción:** Filtro de citas pasadas y cobradas para historial y contabilidad.

### Resumen de facturación (Billing)

- **Método:** `GET /api/appointments/billing-summary?enterpriseId={id}`
- **Autorización:** `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`
- **Descripción:** Suma el total ingresado a partir de las citas cobradas.
- **Respuesta:** `BillingSummaryDTO`.

---

## ⏳ 8. Horarios de Trabajo (`WorkingHourController`)

**Base Path:** `/api/working-hours`

### Horario de la empresa

- **Método:** `GET /api/working-hours/enterprise/{enterpriseId}`
- **Descripción:** Devuelve los horarios de apertura globales.
- **Respuesta:** Lista de `WorkingHourDTO`.

### Horario de empleado

- **Método:** `GET /api/working-hours/user/{userId}`
- **Descripción:** Consulta las horas laborables específicas de un empleado.

### Guardar horarios masivamente (Batch)

- **Método:** `PUT /api/working-hours/batch`
- **Descripción:** Reemplaza o inserta jornada laboral en lote.
- **Body:** Lista de `WorkingHourDTO`.

---

## 🤵 9. Clientes (`CustomerController`)

**Base Path:** `/api/customers`

### Listar Clientes

- **Método:** `GET /api/customers/enterprise/{enterpriseId}`
- **Descripción:** Listado paginado/completo de clientes de la empresa.
- **Respuesta:** Lista de `CustomerResponse`.

### Expediente y Detalles de Cliente

- **Método:** `GET /api/customers/{id}`
- **Descripción:** Obtiene los detalles de contacto e historial de citas vinculadas.
- **Respuesta:** `CustomerDetailResponse`.

### Actualizar Cliente

- **Método:** `PATCH /api/customers/{id}`
- **Descripción:** Actualiza datos parciales del cliente, como notas internas o etiquetas.
- **Body:** `UpdateCustomerRequest`.
- **Respuesta:** `CustomerResponse`.
