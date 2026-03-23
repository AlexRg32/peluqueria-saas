# 🤜 Guía de Contribución

¡Gracias por tu interés en contribuir a Saloria!

## 🛠 Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas:

- **Java Development Kit (JDK) 17**: Requerido para el backend. (Recomendado: Amazon Corretto o Eclipse Temurin).
- **Node.js 18+**: Requerido para el frontend.
- **Docker & Docker Compose**: Para levantar la base de datos y entorno completo.
- **Git**: Control de versiones.

## 💻 Configuración del Entorno de Desarrollo

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/saloria.git
cd saloria
```

### 2. Base de Datos

Levanta solo la base de datos si quieres correr los servicios localmente.

```bash
docker-compose up -d db
```

### 3. Backend (Spring Boot)

```bash
cd saloria-api
# Ejecutar tests
./mvnw test
# Iniciar aplicación
./mvnw spring-boot:run
```

La API estará disponible en `http://localhost:8080`.

### 4. Frontend (React)

```bash
cd saloria-client
# Instalar dependencias
npm install
# Iniciar servidor de desarrollo
npm run dev
```

La web estará disponible en `http://localhost:5173` (o el puerto que asigne Vite).

## 🧪 Testing

### Backend

Usamos **JUnit 5** y **Mockito**.

- Tests Unitarios: `mvn test`
- Tests de Integración: `mvn verify`

### Frontend

Usamos **Vitest** y **React Testing Library**.

- Ejecutar tests: `npm test`
- Cobertura: `npm run coverage`

## 📝 Estándares de Código

### Git Commit Messages

Seguimos la convención de **Conventional Commits**:

- `feat: añadir nueva vista de calendario`
- `fix: corregir error en cálculo de precios`
- `docs: actualizar readme`
- `style: formateo de código (espacios, comas)`
- `refactor: reestructurar componente sin cambiar lógica`

### Estilo

- **Java**: Google Java Style (aplicado via plugin de Maven si existe, o configuración de IDE).
- **TypeScript**: ESLint + Prettier (configurado en el proyecto).

> [Siguiente: Sistema de Diseño](./09-design-system.md)
