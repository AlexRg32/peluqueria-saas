# ☁️ Infraestructura y Despliegue

La aplicación es un sistema **cloud-native** preparado para escalar horizontalmente mediante contenedores Docker.

## ✅ Estado Verificado del Despliegue

> Última verificación manual: **2026-03-23**

La infraestructura activa de la aplicación queda así:

| Capa | Entorno | Plataforma | Identificador / URL | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | Producción | Vercel | `saloria.vercel.app` | Activo |
| **Backend** | Producción | Raspberry Pi + Cloudflare Tunnel | `https://api.alexrg.es` | Activo |
| **Base de Datos** | Producción | Supabase | `peluqueria-saas` (`xwnumlcqnrwhgpbrldhf`) | Activo |
| **Infra Legacy** | Legacy | Render | `peluqueria-saas-prod-fra` | **OBSOLETO / INACTIVO** |

### Resumen Ejecutivo

- **Producción real**:
  - Frontend en **Vercel**
  - Backend en **Raspberry Pi** publicado mediante **Cloudflare Tunnel**
  - Base de datos en **Supabase Frankfurt**
- **Modelo de despliegue**:
  - Solo existe una rama de integración soportada: **`main`**
  - No se mantiene un entorno dedicado de preproducción
- **Infra legacy**: el servicio en Render ha sido **descontinuado** y ya no se usa ni se mantiene.

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
    build: ./saloria-api
    ports: ["8080:8080"]
    depends_on: [db]
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/saloria_db
      - SPRING_DATASOURCE_USERNAME=postgres
      - SPRING_DATASOURCE_PASSWORD=postgres
      - CORS_ALLOWED_ORIGINS=http://localhost:3000
      
  client:
    build: 
      context: ./saloria-client
      args:
        - VITE_API_BASE_URL=http://localhost:8080
    ports: ["3000:80"]
    depends_on: [app]
```

### Comandos Útiles

- **Arrancar**: `docker-compose up --build`
- **Tirar abajo**: `docker-compose down`
- **Logs**: `docker-compose logs -f app`

## 💻 Desarrollo Local

El proyecto soporta dos formas principales de desarrollo:

### 1. Stack completo en Docker

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`
- PostgreSQL: `localhost:5433`

### 2. Desarrollo mixto

- Base de datos en Docker: `docker-compose up -d db`
- Backend con Spring Boot: `./mvnw spring-boot:run`
- Frontend con Vite: `npm run dev`
- En este modo, el frontend suele correr en `http://localhost:5173`

## ⚙️ Configuración Real de Despliegue

El backend **no** usa archivos separados `application-prod.properties` ni variantes por rama.
Actualmente, la aplicación se despliega con un único flujo hacia producción y se diferencia por:

- rama desplegada (`main`)
- variables de entorno del host activo
- URL del frontend que se conecta al backend público
- configuración de base de datos y storage

Las variables más importantes son:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`
- `CORS_ALLOWED_ORIGINS`
- `APP_API_BASE_URL`
- `APP_STORAGE_TYPE`
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `SUPABASE_BUCKET`

## 🌍 Entorno de Despliegue

El proyecto mantiene un unico entorno soportado para despliegue continuo:

| Característica | Producción |
| :--- | :--- |
| **Rama Git** | `main` |
| **Base de Datos** | Supabase |
| **Backend API** | Raspberry Pi + Cloudflare Tunnel |
| **Frontend** | Vercel |
| **Propósito** | Uso real y releases continuos |

### 1. Base de Datos

- **Producción**: La base activa identificada para esta app en Supabase es `peluqueria-saas` con `project_ref` `xwnumlcqnrwhgpbrldhf`.
- **Compatibilidad**: El backend soporta URLs JDBC normales y también URLs estilo `postgres://` o `postgresql://`, incluidas configuraciones de Supabase.

### 2. Backend API

La ruta activa usa una Raspberry Pi con Docker Compose y Cloudflare Tunnel.

- **Variables de Entorno Críticas**:
  - `SPRING_DATASOURCE_URL`: String de conexión JDBC de Supabase o PostgreSQL externo.
  - `JWT_SECRET`: Clave secreta de producción.
  - `CORS_ALLOWED_ORIGINS`: URLs permitidas del frontend público y dominios asociados.
- **Acceso remoto recomendado**: Tailscale para SSH privado al host, manteniendo Cloudflare Tunnel solo para exponer la API HTTP.

### 4. Configuración del Monorepo (Importante)

Al ser un monorepo, cualquier despliegue cloud alternativo requiere configuraciones específicas para encontrar el código del backend:

- **Root Directory**: Debe establecerse en `saloria-api`.
- **Dockerfile Path**: Debe resolverse dentro del `rootDir`, por lo que el path relativo debe ser `./Dockerfile` (si está en la raíz de `saloria-api`).

#### Troubleshooting: Error de Lectura de Dockerfile

Si el despliegue falla con: `error: failed to solve: failed to read dockerfile: open Dockerfile: no such file or directory`, verifica que el **Root Directory** en el dashboard de Render no esté vacío.

### 5. Render Blueprint (`render.yaml`)

El proyecto mantiene un `render.yaml` mínimo para un posible despliegue cloud alternativo desde `main`.

```yaml
services:
  - type: web
    name: saloria-prod-fra
    runtime: docker
    rootDir: saloria-api # Crucial para el monorepo
    region: frankfurt
```

Si Render vuelve a usarse como backend activo, se recomienda editar este archivo en lugar de usar el dashboard manual.

### 3. Frontend

Desplegado en Vercel.

- **Variables de Entorno**:
  - `VITE_API_BASE_URL`: URL del backend público.

### 4. Storage de Archivos

La aplicación soporta dos estrategias:

- **Local filesystem**: modo por defecto en desarrollo, usando la carpeta `uploads/`
- **Supabase Storage**: modo opcional para despliegues persistentes mediante `APP_STORAGE_TYPE=supabase`

Esto evita el problema de pérdida de archivos cuando se usa filesystem local dentro de contenedores efímeros.

## 🚀 Estrategia de Ramas y CI/CD

El flujo de trabajo sigue un modelo **main-only**:

1. **Desarrollo**: Se crean ramas `feat/`, `fix/`, etc. a partir de `main`.
2. **Integración**: Al terminar una tarea, se integra en `main` mediante el comando `/ship`.
3. **Despliegue**: La producción despliega automáticamente desde `main`.
4. **Pipeline real observado**:
   - **Vercel**: despliegue automático asociado al proyecto y sus aliases de producción.
   - **Raspberry Pi**: workflow `.github/workflows/deploy-raspberry.yml` corre en un runner self-hosted del propio host y ejecuta `deploy/raspberry/scripts/redeploy.sh`.
   - **Repositorio**: el redeploy de la API solo se dispara cuando cambian `saloria-api/**`, `deploy/raspberry/**` o el propio workflow.

## 🧭 Notas Operativas Importantes

- El despliegue soportado depende principalmente de **variables de entorno externas** y no de perfiles Spring versionados por archivo.
- El frontend de producción público es `saloria.vercel.app`.
- El backend de producción público es `api.alexrg.es`.
- El servicio antiguo de Render está suspendido por el usuario y no debe confundirse con la ruta activa.

## 🍓 Opción Self-Hosted: Raspberry Pi

El repositorio incluye una alternativa de despliegue self-hosted para mover el backend a una Raspberry Pi sin cambiar la arquitectura funcional de la app.

### Objetivo recomendado

- **Fase 1**: mover solo el backend a la Raspberry Pi y mantener **Supabase** como base de datos.
- **Fase 2**: mover PostgreSQL a la Raspberry solo cuando el despliegue de la API este estable y haya almacenamiento persistente adecuado.

### Motivo

Esta estrategia elimina el cold start de Render sin meter en el mismo cambio:

- migracion de red publica
- migracion de datos
- cambios de storage
- backups y recuperacion de PostgreSQL

### Archivos de despliegue

La configuracion se encuentra en [`deploy/raspberry/README.md`](../deploy/raspberry/README.md) e incluye:

- `docker-compose.prod.yml`
- `.env.prod.example`
- `Caddyfile`
- `cloudflared/config.yml`
- scripts de bootstrap, instalacion de Tailscale, redeploy, healthcheck y backup/restore

### Consideraciones operativas

- **No exponer PostgreSQL** a Internet.
- **Cloudflare Tunnel** es la opcion preferida si el router o el ISP complican el port forwarding.
- **Tailscale** es la opcion recomendada para acceso SSH remoto privado a la Raspberry.
- Si PostgreSQL vive en Raspberry, conviene **SSD externo** en lugar de tarjeta SD.
- El frontend en Vercel solo necesita cambiar `VITE_API_BASE_URL` al nuevo dominio HTTPS de la API.
- La Raspberry debe tener el repositorio clonado localmente para que Docker Compose pueda construir `saloria-api` desde el monorepo.

> [Siguiente: Guía de Contribución](./08-guia-contribucion.md)
