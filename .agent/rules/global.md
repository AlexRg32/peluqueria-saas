# General Rules for SaaS Development

Global constraints for all agents in the SaaS Orchestrator Framework.

## 1. Project Management

- **MANDATORY**: Create a directory in `.orchestrator/plans/YYYY-MM-DD-hh-mm-slug/` for any task.
- **MANDATORY**: Follow the 4-phase lifecycle (Investigation, Design, Plan, Implement).
- **LOGGING**: All major decisions must be recorded in the plan's markdown files.

## 2. Git & Submodules

- **COMMITS**: Use Conventional Commits (feat, fix, refactor, docs, chore).
- **NO AUTO-COMMIT**: Never perform `git commit` or `git push` automatically. Only execute these operations when the user explicitly requests it (e.g., using `/ship "message"`).
- **SUBMODULES**:
    1. Update code inside the submodule.
    2. Commit and push inside the submodule.
    3. Update the pointer in the main orchestrator repo.
- **ROOT**: The main repo should ONLY contain orchestration logic, plans, and submodule pointers.

## 3. Technology Stack

- **BACKEND**: Spring Boot (Java) is the standard. Use Maven for dependency management.
- **BACKEND ARCHITECTURE**:
  - **Layered Architecture is MANDATORY**: `Controller → Service → Repository → Database`.
  - **Controllers**: Handlers for HTTP requests/responses ONLY. **Zero business logic**. Coordinate calls to services.
  - **Services**: All business logic (validation, calculations, orchestration) must reside here.
  - **Repositories**: Data access and persistence ONLY. No business logic.
  - **DTOs**: **MANDATORY** for all API communication. Never expose or accept JPA entities directly.
- **API**: REST is the standard for communication.
- **FRONTEND**: React (Vite) with TypeScript.
- **COMPONENTIZATION**: Favor modularity. Whenever logical, viable, and sensible, split React code into separate components rather than monolithic files.
- **DESIGN**: Use **Tailwind CSS** for all styling. Maintain premium visual aesthetics by strictly following the design system defined in `peluqueria-client/src/index.css` (@theme block). Consistently use brand colors, radius, and spacing tokens.

## 4. Security & Quality

- No hardcoded secrets. Use env variables.
- Write tests (TDD) before implementation.
- Defense in depth for all API endpoints.
