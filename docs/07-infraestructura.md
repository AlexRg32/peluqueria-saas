# ☁️ Infraestructura y Despliegue

La aplicación es un sistema **cloud-native** preparado para escalar horizontalmente mediante contenedores Docker.

## 🐳 Docker (Entorno Local)

Para el desarrollo y pruebas locales, se orquesta el sistema completo con `docker-compose`.

```yaml
version: '3'
services:
  db:
    image: postgres:15
    ports: ["5433:5432"]
    volumes: [postgres_data:/var/lib/postgresql/data]
    
  app:
    build: ./peluqueria-api
    ports: ["8080:8080"]
    depends_on: [db]
    environment:
      - DATABASE_URL=jdbc:postgresql://db:5432/peluqueria_db
      
  client:
    build: ./peluqueria-client
    ports: ["3000:80"]
    depends_on: [app]
```

### Comandos Útiles

- **Arrancar**: `docker-compose up --build`
- **Tirar abajo**: `docker-compose down`
- **Logs**: `docker-compose logs -f app`

## 🌍 Entornos y Despliegue (Staging & Producción)

Para una gestión profesional y segura, el sistema debe estar dividido en dos entornos completamente independientes. **Nunca se debe desarrollar o probar directamente contra el entorno de Producción.**

### 1. Entorno de Staging (Pre-producción)

Es una réplica exacta del entorno de producción pero con datos de prueba. Aquí se validan las nuevas funcionalidades antes de lanzarlas a los clientes reales.

*Estrategia para evitar costes (Límite de 2 proyectos en Supabase Free):*

- **Base de Datos (Neon / Render PostgreSQL / ElephantSQL)**: Ya que Supabase gratuito limita a 2 proyectos, puedes alojar temporalmente tu base de datos de Staging en una alternativa 100% gratuita como **Neon.tech** (Serverless Postgres) o crear un servicio gratuito en el propio **Render**.
- **Backend API (Render Staging)**: Web service conectado a la base de datos de Staging. Escucha la rama `staging`.
- **Frontend (Vercel Staging)**: Entorno "Preview" de Vercel conectado al Backend Staging. Escucha la rama `staging`.

### 2. Entorno de Producción

Es el entorno real que usan los clientes. Debe ser altamente estable.

- **Base de Datos (Supabase Prod)**: Tu proyecto principal (`peluqueria-saas`). Solo almacena datos reales. Copias de seguridad automáticas activadas.
- **Backend API (Render Prod)**: Tu web service principal (`peluqueria-saas`). Escucha la rama `main`.
- **Frontend (Vercel Prod)**: Tu sitio web principal (`peluqueria-saas`). Escucha la rama `main`.

---

## 🚀 Flujo de Trabajo Profesional (Git Branching)

El ciclo de vida del código sigue una estrategia basada en **GitHub Flow** adaptada para dos entornos, conviviendo con tu entorno local Docker:

1. **Desarrollo (Local + Docker)**:
   - Se crea una nueva rama desde `staging` para trabajar en una tarea: `git checkout -b feat/nueva-funcion`.
   - El desarrollo se prueba localmente conectándose a tu base de datos PostgreSQL en Docker.

2. **Validación (Pull Request a Staging)**:
   - Se abre un Pull Request (PR) en GitHub empujando los cambios de la rama `feat/nueva-funcion` a la rama `staging`.
   - Al unirse (Merge) a `staging`, Render y Vercel despliegan la aplicación automáticamente.
   - Verificas en tu URL de Staging que todo funciona correctamente interconectado con la base de datos de prueba de Supabase.

3. **Lanzamiento a Producción (Release a Main)**:
   - Cuando todos los cambios en Staging son validados y estabilizados, se crea un **Pull Request de `staging` hacia `main`**.
   - Al aprobarse y hacer Merge a `main`, Vercel y Render despliegan la versión final a los clientes reales usando la BD principal de Supabase.

> [Siguiente: Guía de Contribución](./08-guia-contribucion.md)
