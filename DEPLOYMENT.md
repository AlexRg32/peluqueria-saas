# 🚀 Guía de Despliegue - Peluquería SaaS

Esta guía detalla los pasos para desplegar la aplicación de forma gratuita.

## 1. Base de Datos (PostgreSQL en Supabase)

1. Ve a [Supabase](https://supabase.com/) y crea un nuevo proyecto.
2. En la configuración del proyecto, busca la sección **Database** y copia la **URI de conexión**.
   - Ejemplo: `postgresql://postgres:password@db.xxxx.supabase.co:5432/postgres`

## 2. Backend (Spring Boot en Render)

1. Crea una cuenta en [Render](https://render.com/).
2. Crea un nuevo **Web Service** y conecta tu repositorio de GitHub.
3. Elige el directorio `/peluqueria-api`.
4. Render detectará automáticamente el Dockerfile o puedes usar el build nativo:
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/*.jar`
5. **Variables de Entorno** (Environment Variables):
   - `SPRING_DATASOURCE_URL`: La URI que copiaste de Supabase.
   - `SPRING_DATASOURCE_USERNAME`: `postgres` (o el que definieras).
   - `SPRING_DATASOURCE_PASSWORD`: Tu contraseña de Supabase.
   - `CORS_ALLOWED_ORIGINS`: La URL que te dé Vercel (ej: `https://tu-app.vercel.app`).

## 3. Frontend (React en Vercel)

1. Ve a [Vercel](https://vercel.com/) y crea un nuevo proyecto.
2. Conecta tu repositorio de GitHub y selecciona la carpeta `/peluqueria-client`.
3. **Build Settings**: Vercel detectará que es Vite. No cambies nada.
4. **Environment Variables**:
   - `VITE_API_BASE_URL`: La URL que te dé Render (ej: `https://peluqueria-api.onrender.com`).

---

## 🔄 Flujo de Actualización

A partir de ahora, cada vez que hagas `git push origin main`, tanto el Frontend como el Backend se actualizarán automáticamente sin que tengas que hacer nada más.
