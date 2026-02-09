# Deployment Preparation Plan

Prepare the Peluquería SaaS application for deployment on Render (Backend) and Vercel (Frontend).

## Backend (Spring Boot)

1. [ ] Update `application.properties` to use environment variables for DB connection and CORS.
2. [ ] Modify `SecurityConfig.java` to read allowed CORS origins from properties.

## Frontend (React + Vite)

1. [ ] Update `src/lib/axios.ts` to use `import.meta.env.VITE_API_BASE_URL`.
2. [ ] Create/Update `.env` and `.env.example` files.

## Documentation

1. [ ] Create a `DEPLOYMENT.md` guide with steps for Supabase, Render, and Vercel.
