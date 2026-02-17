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

## 🌍 Entornos de Producción

En producción, los componentes se desacoplan para mejor rendimiento y escalabilidad.

### 1. Base de Datos (Cloud SQL)

Recomendado usar un servicio gestionado como **Supabase** o **AWS RDS**.

- **Seguridad**: Solo permitir conexiones SSL.
- **Acceso**: IP restringida a los servicios backend.

### 2. Backend API (Container Platform)

Desplegado en servicios PaaS como **Render**, **Railway** o **AWS ECS**.

- **Variables de Entorno Críticas**:
  - `SPRING_DATASOURCE_URL`: String de conexión JDBC.
  - `JWT_SECRET`: Clave secreta larga para firmar tokens.
  - `CORS_ALLOWED_ORIGINS`: URLs permitidas (frontend).

### 3. Frontend (Static Hosting/CDN)

Desplegado en redes globales como **Vercel** o **Netlify**.

- **Optimizaciones**: Gzip/Brotli, Caché en el borde (Edge Caching).
- **Variables de Entorno**:
  - `VITE_API_BASE_URL`: URL del backend en producción.

## 🚀 Pipeline CI/CD

El flujo de entrega continua recomendado es:

1. **Commit a `main`**: Dispara GitHub Actions.
2. **Lint & Test**: Ejecuta `npm test` y `./mvnw test`.
3. **Build**: Crea imágenes Docker `peluqueria-api:latest`.
4. **Deploy**: Sube la imagen a ECR/Docker Hub y actualiza el servicio en Render.

> [Siguiente: Guía de Contribución](./08-guia-contribucion.md)
