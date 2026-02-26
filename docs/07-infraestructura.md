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

## 🌍 Entornos de Despliegue

El proyecto cuenta con dos entornos totalmente aislados para garantizar la estabilidad de la producción.

| Característica | **Staging** (Pre-producción) | **Production** (Producción) |
| :--- | :--- | :--- |
| **Rama Git** | `staging` | `main` |
| **Base de Datos** | PostgreSQL (Render) | PostgreSQL (Supabase) |
| **Backend API** | Render (Staging Project) | Render (Production Project) |
| **Frontend** | Vercel (Staging Deployment) | Vercel (Production Deployment) |
| **Propósito** | Pruebas y validación | Uso por clientes reales |

### 1. Base de Datos

- **Staging**: Ubicada en Render para pruebas rápidas y datos de prueba.
- **Producción**: Ubicada en Supabase para alta disponibilidad y backups gestionados.
- **Seguridad**: Solo permiten conexiones SSL y el acceso está restringido a las IPs de los servicios de Render.

### 2. Backend API

Desplegado en Render mediante contenedores.

- **Variables de Entorno Críticas**:
  - `SPRING_DATASOURCE_URL`: String de conexión JDBC (específico de cada entorno).
  - `JWT_SECRET`: Clave secreta (debe ser distinta en cada entorno).
  - `CORS_ALLOWED_ORIGINS`: URLs permitidas del frontend correspondiente.

### 4. Configuración del Monorepo (Importante)

Al ser un monorepo, Render requiere configuraciones específicas para encontrar el código del backend:

- **Root Directory**: Debe establecerse en `peluqueria-api`.
- **Dockerfile Path**: Render lo buscará dentro del `rootDir`, por lo que el path relativo debe ser `./Dockerfile` (si está en la raíz de `peluqueria-api`).

#### Troubleshooting: Error de Lectura de Dockerfile

Si el despliegue falla con: `error: failed to solve: failed to read dockerfile: open Dockerfile: no such file or directory`, verifica que el **Root Directory** en el dashboard de Render no esté vacío.

### 5. Render Blueprints (`render.yaml`)

El proyecto utiliza **Infrastructure as Code (IaC)** mediante el archivo `render.yaml` en la raíz para unificar la configuración de los entornos.

```yaml
services:
  - type: web
    name: peluqueria-saas-prod-fra
    runtime: docker
    rootDir: peluqueria-api # Crucial para el monorepo
    # ... resto de la configuración
```

Para aplicar cambios globales a la infraestructura, se recomienda editar este archivo en lugar de usar el dashboard manual.

### 3. Frontend

Desplegado en Vercel.

- **Variables de Entorno**:
  - `VITE_API_BASE_URL`: URL del backend (Staging o Producción).

## 🚀 Estrategia de Ramas y CI/CD

El flujo de trabajo sigue el modelo de promoción de entornos:

1. **Desarrollo**: Se crean ramas `feat/`, `fix/`, etc. a partir de `staging`.
2. **Promoción a Staging**: Al terminar una tarea, se integra en `staging` mediante el comando `/ship`.
3. **Validación**: Los cambios se prueban en el entorno de Staging.
4. **Promoción a Producción**: Una vez validados, los cambios se integran de `staging` a `main` (Despliegue automático a producción).
5. **Pipeline**:
   - **Commit a staging/main**: Dispara GitHub Actions.
   - **Lint & Test**: Ejecuta `npm test` y `./mvnw test`.
   - **Build & Deploy**: Crea imágenes Docker y las despliega en el servicio correspondiente de Render.

> [Siguiente: Guía de Contribución](./08-guia-contribucion.md)
