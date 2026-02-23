# Investigación: Comandos de Construcción (Build)

## Contexto de la Aplicación

La aplicación `peluqueria-saas` consta de tres partes principales:

1. **Backend (`peluqueria-api`)**: Construido con Java 17, Spring Boot 3 y Maven.
2. **Frontend (`peluqueria-client`)**: Construido con React 18, Vite y Node.js.
3. **Infraestructura Docker**: Contenedores orquestados con `docker-compose`.

## Comandos de Construcción y Ejecución

Dependiendo de cómo desees levantar la aplicación (desarrollo local o producción), aquí tienes los comandos que debes usar:

### 1. Sistema Completo usando Docker (Recomendado)

Levanta la base de datos, el backend y el frontend simultáneamente:

```bash
docker-compose up --build
```

* **Frontend**: <http://localhost:3000>
* **Backend API**: <http://localhost:8080>
* **Base de Datos**: localhost:5433

---

### 2. Backend Independiente (API en Spring Boot)

Si deseas construir y empaquetar solo el backend (generar el archivo `.jar`):

```bash
cd peluqueria-api
./mvnw clean package
```

Si deseas **ejecutarlo en modo desarrollo**:

```bash
cd peluqueria-api
./mvnw spring-boot:run
```

---

### 3. Frontend Independiente (React + Vite)

Si deseas construir el frontend para producción (genera la carpeta `dist`):

```bash
cd peluqueria-client
npm run build
```

Si deseas **ejecutarlo en modo desarrollo**:

```bash
cd peluqueria-client
npm install
npm run dev
```

## Conclusión

Para el entorno completo, **`docker-compose up --build`** es la forma más rápida y sencilla de hacer build y levantar todo el ecosistema. Si estás desarrollando módulos de manera independiente, utiliza `./mvnw` para Java/Spring y `npm scripts` para React.
