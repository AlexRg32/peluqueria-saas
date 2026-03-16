# 🧠 Manual del Sistema de IA (Spring/React Stack)

Este sistema de orquestación funciona como un **equipo profesional**, garantizando código riguroso mediante Separación de Responsabilidades y flujos que planifican antes de programar para tu pila tecnológica.

---

## 👥 1. El Equipo (Agentes)

*(Los invocas con `@nombre` o los flujos los usan solos)*:

* 📐 **`@architect`**: Toma las decisiones de alto nivel (Modelos de BBDD, rutas REST, seguridad).
* 🗺️ **`@doc-planner`**: Divide el diseño en un plan de tareas rastreables y gestiona la documentación técnica (`Markdown`, `OpenAPI`).
* ⚙️ **`@backend`**: Pica el código Java/Spring Boot. (Obliga al uso de Arquitectura en Capas y DTOs).
* 🎨 **`@frontend`**: Pica el código React/Tailwind. (Asegura enfoque "Mobile-first").

---

## 🚀 2. Manual de Uso (Workflows)

Usa los comandos con `/` en el chat para trabajar en 4 fases principales (o flujos):

### 🕵️ FASE 0 - Auditar: `@[/audit]`

**Objetivo:** Escanear proactivamente el proyecto en busca de deuda técnica y vulnerabilidades.

* La IA revisa que el código cumple con las guías de estilo de Spring/React, patrones de arquitectura y seguridad (sin modificar nada).
* Genera un reporte detallado en `.orchestrator/audits/` priorizando los hallazgos (🔴 Críticos, 🟡 Moderados, 🔵 Menores).
* **Tú decides:** Lees el reporte y usas `@[/forge]` o `@[/think]` sobre los puntos concretos que quieras mejorar.

### 💡 FASE 1 - Diseñar: `@[/think] [Idea o Feature]`

**Objetivo:** Planificar sin tocar una sola línea de código.

* La IA escanea tu proyecto y genera tu estrategia en la carpeta `.orchestrator/plans/`.
* Te entregará una *Investigación*, un *Diseño* (BBDD/APIs) y un *Plan de Tareas*.
* **Tú decides:** Lees el plan de la carpeta. Si falla algo, se lo pides corregir. Si te gusta, sigues a la Fase 2.

### ⚒️ FASE 2 - Construir: `@[/forge] execute`

**Objetivo:** Picar código basado en el plan consensuado.

* Busca automáticamente el último plan creado por el `/think`.
* **Crea una rama Git segura basada en `staging`** (nunca programa en `main` ni en `staging`).
* Empieza a transformar las tareas del plan en código (`@backend` y `@frontend`), probando que el sistema compile.
* *Tip: Si se corta la conexión o paras, escribe otra vez `@[/forge] execute` y seguirá por la tarea exacta donde se quedó.*

### 📦 FASE 3 - Entregar: `@[/ship] "Mensaje breve"`

**Objetivo:** Hacer Commit de forma profesional y publicar en `staging` (Pre-Producción).

* Analiza el código modificado.
* Formatea tu mensaje con reglas estrictas ("Conventional Commits" -> ej. `feat: mensaje`).
* Hace *Push* a `staging` para validación en preproducción.
* Cuando staging esté validado, usa `@[/promote]` para promover de `staging` a `main` (Producción).

*(Atajo: Puedes usar `@[/forge] arregla el botón rojo` si es un cambio minúsculo y quieres que lo piense y lo haga todo del tirón asumiendo el riesgo).*

---

## 🎒 3. Reglas de Oro Internalizadas

1. **Nunca se programa en ramas de integración (`main` o `staging`)**: Se automatiza la creación de ramas feature desde `staging`.
2. **DTOs Inamovibles**: Los controladores REST de Spring Boot siempre se comunican en *DTOs*, jamás devuelven *Entities* reales.
3. **El Diseño Manda**: La IA está obligada a documentar arquitecturas y diagramas actualizados en la carpeta `docs/` antes de dar una feature por cerrada.
4. **Contexto de Proyecto**: Para ayudar a los agentes a entender tu lógica de negocio específica, mantén actualizado el documento en la carpeta `contexts/` o en los archivos principales de `docs/`.

---

## 💉 4. Inyección en Nuevos Proyectos

Esta carpeta `.agent` está diseñada para ser agnóstica al negocio. Para usar este mismo "equipo de agentes" en un nuevo proyecto Spring/React, tienes dos opciones:

### Opción A: Plantilla desde GitHub (Recomendado para empezar de cero)
1. Convierte el repositorio donde guardas esta carpeta en un **Template Repository** en los ajustes de GitHub.
2. Cada vez que inicies un proyecto, dale a "Use this template". Tendrás los agentes listos desde el commit inicial.

### Opción B: Script Global (Recomendado para proyectos ya creados)
Si ya has hecho un `git init` y quieres traerte los agentes, añade este alias a tu `~/.zshrc` o `~/.bashrc`:

```bash
# Inyectar agentes IA en el directorio actual
alias inject-agents="cp -r /Ruta/A/Tu/Repositorio/Central/.agent ./"
```
Sustituye `/Ruta/A/Tu/Repositorio/Central` por donde tengas guardado este proyecto en tu disco duro. Luego, en cualquier carpeta de proyecto, simplemente ejecuta `inject-agents`.

**⚠️ IMPORTANTE**: Tras inyectar los agentes en un nuevo proyecto, **lo primero que debes hacer** es editar el archivo `.agent/contexts/project-domain.md` para explicarle a los agentes de qué va tu nueva aplicación.
