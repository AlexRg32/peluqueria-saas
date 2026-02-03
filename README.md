# ✂️ Peluquería SaaS - Sistema de Gestión Multi-cliente (Proyecto en desarrollo)

Una plataforma SaaS profesional de nivel empresarial diseñada para gestionar múltiples peluquerías y barberías de forma eficiente. Construida con un backend robusto en **Spring Boot** y un frontend dinámico en **React**.

![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![Docker](https://img.shields.io/badge/Docker-Listo-blue)

## 🌟 Resumen

Este proyecto es una aplicación multi-empresa (multi-tenant) que permite a dueños de negocios gestionar sus empresas (barberías o salones de belleza), servicios, empleados y citas. Incluye un CRM completo para la gestión de clientes y un dashboard basado en datos para obtener información clave del negocio.

## 🚀 Funcionalidades Principales

- **🏢 Multi-tenancy**: Aislamiento completo de datos entre diferentes empresas/salones.
- **📅 Calendario Interactivo**: Gestión de citas con una interfaz intuitiva.
- **📊 Dashboard de Negocio**: Estadísticas en tiempo real sobre ingresos, citas y servicios más populares.
- **👥 Gestión de Empleados**: Control de horarios, jornadas laborales y asignación de servicios.
- **🛠️ Catálogo de Servicios**: Oferta de servicios personalizada con precios y duraciones dinámicas.
- **🎨 Branding Dinámico**: Soporte para colores de marca e identidad visual específica por empresa.
- **🔐 Acceso Seguro**: Autenticación basada en JWT con control de acceso por roles (ADMIN, EMPLOYEE, CLIENTE).

## 🛠️ Stack Tecnológico

### Backend

- **Java 17 / Spring Boot 3**
- **Spring Security** (Autenticación JWT)
- **Spring Data JPA** (PostgreSQL)
- **Maven** para la gestión de dependencias

### Frontend

- **React 18** (Vite)
- **Tailwind CSS** para el diseño
- **Recharts** para la visualización de datos
- **Lucide React** para la iconografía

### Infraestructura

- **Docker & Docker Compose**
- **PostgreSQL 15**

---

## 🏗️ Arquitectura y Buenas Prácticas

El proyecto sigue estándares de arquitectura de la industria para asegurar escalabilidad y mantenibilidad:

1. **Arquitectura por Capas**: Separación clara entre Controladores, Servicios y Repositorios.
2. **Patrón DTO**: Desacoplamiento de la capa de API de las entidades de base de datos para mayor seguridad y flexibilidad.
3. **Manejo Global de Excepciones**: Gestión centralizada de errores para respuestas de API consistentes.
4. **Soft Deletes**: Prevención de pérdida de datos mediante borrado lógico.
5. **Lógica de Dominio**: Lógica de negocio encapsulada en servicios para mantener controladores limpios.

---

## 🚦 Primeros Pasos

### Requisitos Previos

- Docker & Docker Compose
- Node.js (para desarrollo local del frontend)
- JDK 17+ (para desarrollo local del backend)

### 🐳 Inicio Rápido (Docker)

La forma más fácil de ejecutar el proyecto completo es usando Docker Compose:

```bash
docker-compose up --build
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080](http://localhost:8080)
- **Base de Datos (Postgres)**: `localhost:5433`

### 💻 Configuración de Desarrollo Local

#### 1. Base de Datos

Ejecuta una instancia de PostgreSQL o usa la que proporciona docker-compose.

#### 2. Backend (`/peluqueria-api`)

```bash
cd peluqueria-api
./mvnw spring-boot:run
```

#### 3. Frontend (`/peluqueria-client`)

```bash
cd peluqueria-client
npm install
npm run dev
```

---

## 🧪 Datos de Prueba (Seeding)

Para ver la aplicación en acción con datos realistas (citas, clientes, estadísticas), el sistema incluye un mecanismo de carga de datos inicial.

> *Nota: Actualmente configurado para cargarse automáticamente al iniciar en modo desarrollo.*

---

## 📈 Roadmap (Próximas Funcionalidades)

Este proyecto está en desarrollo activo. Funcionalidades planificadas:

- [ ] 🌐 **Portal del Cliente**: Vista pública para descubrir peluquerías, ver disponibilidad y reservar citas online.
- [ ] � **Pasarela de Pagos**: Integración con Stripe para el cobro de depósitos o pagos completos.
- [ ] 📧 **Sistema de Notificaciones**: Envío automático de confirmaciones y recordatorios por Email y SMS/WhatsApp.
- [ ] � **Facturación Automática**: Generación de tickets y facturas en formato PDF tras cada servicio.
- [ ] 📱 **Aplicación Móvil**: Aplicación nativa para que los clientes gestionen sus citas desde el móvil.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
