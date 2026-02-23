# 👁️ Visión General del Proyecto

## Propuesta de Valor

**Peluquería SaaS** es una plataforma de gestión integral (SaaS) diseñada específicamente para salones de belleza, barberías y estéticas. Su objetivo principal es digitalizar y optimizar las operaciones diarias de estos negocios, permitiendo a los dueños centrarse en sus clientes mientras el software se encarga de la administración.

A diferencia de soluciones genéricas, esta plataforma está construida con un enfoque **Multi-tenant**, lo que significa que una única instancia del software puede servir a múltiples empresas de forma segura y aislada.

## ✨ Funcionalidades Clave

### Para el Negocio (B2B)

- **Gestión de Agenda y Citas**: Calendario interactivo con soporte para múltiples empleados y recursos.
- **CRM de Clientes**: Historial de visitas, preferencias y datos de contacto.
- **Gestión de Empleados**: Control de turnos, comisiones y rendimiento.
- **Catálogo de Servicios**: Configuración flexible de duración y precios.
- **Dashboard de Analítica**: Métricas clave en tiempo real (ingresos, ocupación, nuevos clientes).

### Para el Cliente Final (B2C)

- **Portal de Reservas Online**: Interfaz autogestionable para reservar citas 24/7.
- **Perfil de Cliente**: Gestión de citas futuras y pasadas.

## 🛠 Stack Tecnológico

El proyecto utiliza un stack moderno y robusto, priorizando el tipado estático y la escalabilidad.

### Backend

- **Lenguaje**: Java 17
- **Framework**: Spring Boot 3 (Web, Data JPA, Security)
- **Base de Datos**: PostgreSQL 15
- **Seguridad**: JWT (JSON Web Tokens)

### Frontend

- **Lenguaje**: TypeScript
- **Framework**: React 18 (Vite)
- **Estilos**: Tailwind CSS
- **Estado/Data**: React Query / Context API

### Infraestructura

- **Contenedores**: Docker & Docker Compose para desarrollo local.
- **Entornos de Despliegue**:
  - **Staging**: Render (API/DB) + Vercel (Frontend) para pruebas.
  - **Producción**: Render (API) + Supabase (DB) + Vercel (Frontend) para uso real.

---

> [Siguiente: Guía de Usuario](./02-guia-usuario.md)
