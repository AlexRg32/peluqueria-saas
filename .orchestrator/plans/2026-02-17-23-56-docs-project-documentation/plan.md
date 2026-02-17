# Plan de Documentación del Proyecto

## Objetivo

Documentar exhaustivamente el proyecto "Peluquería SaaS" desde la experiencia de usuario hasta la infraestructura técnica, siguiendo la estructura de directorios y contenido detallada a continuación.

## Tareas

- [ ] **Crear estructura de directorios `docs/`**
  - Crear carpeta `docs/` en la raíz del proyecto.
  - Crear subcarpetas si es necesario (e.g. `docs/img` para diagramas si no son mermaid renderizados inline).

- [ ] **Redactar `docs/00-index.md` (Índice General)**
  - Introducción al documento.
  - Enlaces a todas las secciones.
  - Diagrama de arquitectura de alto nivel (C4 Level 1).

- [ ] **Redactar `docs/01-vision-general.md` (Visión del Negocio)**
  - Propuesta de valor ("SaaS Multi-tenant para peluquerías").
  - Funcionalidades clave (Gestión citas, CRM, Finanzas).
  - Stack tecnológico resumido.

- [ ] **Redactar `docs/02-guia-usuario.md` (Experiencia de Usuario)**
  - Roles de usuario (Admin, Empleado, Cliente final).
  - Flujos principales:
    - Registro de Negocio (Onboarding).
    - Gestión de Citas (Calendario).
    - Portal del Cliente (Reserva online).
  - Capturas de pantalla (placeholder) o descripciones visuales detalladas.

- [ ] **Redactar `docs/03-arquitectura-tecnica.md` (Diseño del Sistema)**
  - Patrón de arquitectura (Layered Monolith).
  - Diagrama de componentes (C4 Level 2).
  - Decisiones de diseño clave (ADRs):
    - Uso de Spring Boot vs Node.js.
    - React + Vite vs Next.js.
    - PostgreSQL + Docker.

- [ ] **Redactar `docs/04-backend.md` (Estructura y Lógica Servidor)**
  - Estructura de paquetes (`com.peluqueria.*`).
  - Capas: Controller -> Service -> Repository.
  - Modelado de Datos (Entidades JPA).
  - Seguridad (Spring Security, JWT Filter).
  - Manejo de Errores (ControllerAdvice).
  - API Endpoints principales.

- [ ] **Redactar `docs/05-frontend.md` (Estructura y Lógica Cliente)**
  - Estructura de carpetas (`src/features`, `src/components`).
  - Gestión de Estado (Context vs Zustand/Redux si aplica).
  - Enrutamiento (React Router).
  - Sistema de Diseño (Tailwind CSS, UI Components).
  - Integración con API (Axios/Fetch wrappers).

- [ ] **Redactar `docs/06-base-de-datos.md` (Persistencia)**
  - Diagrama ER (Entidad-Relación).
  - Tablas principales y sus relaciones.
  - Estrategia de Multi-tenancy (Columna `tenant_id` vs Schema vs Database).

- [ ] **Redactar `docs/07-infraestructura.md` (DevOps)**
  - Docker Compose setup detallado.
  - Variables de entorno explicadas.
  - Pipeline de CI/CD (GitHub Actions si existe, o flujo manual).
  - Guía de despliegue (Render/Vercel/Supabase).

- [ ] **Redactar `docs/08-guia-contribucion.md` (Developer Experience)**
  - Setup local (Requisitos: JDK 17, Node 18, Docker).
  - Correr tests (Backend & Frontend).
  - Estándares de código (Checkstyle/ESLint).

## Criterios de Éxito

- La documentación debe ser clara, concisa y visualmente atractiva (uso de Markdown avanzado).
- Debe cubrir tanto el aspecto funcional ("qué hace") como el técnico ("cómo lo hace").
- Debe estar actualizada con el estado actual del código.
