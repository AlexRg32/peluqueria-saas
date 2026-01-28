# SaaS Orchestrator Rules (Peluqueria SaaS)

Global constraints and workflow for the Peluqueria SaaS project.

## 1. Project Management

- **DIRECTORY STRUCTURE**: All tasks must have a dedicated plan directory in `.orchestrator/plans/YYYY-MM-DD-hh-mm-slug/`.
- **LIFECYCLE**: Follow the 4-phase lifecycle for every task:
    1. **Investigation**: Understand the problem and current state.
    2. **Design**: Define the solution and architecture.
    3. **Plan**: Detailed steps and checkboxes.
    4. **Implement**: Code the solution.
- **ARTIFACT SYNC**: When updating ANY `plan.md` file, use `ArtifactMetadata` with `ArtifactType: 'implementation_plan'`.

## 2. Git & Submodules

- **COMMITS**: Use [Conventional Commits](https://www.conventionalcommits.org/) (feat, fix, refactor, docs, chore).
- **SUBMODULES**:
    1. Update code inside the submodule.
    2. Commit and push inside the submodule.
    3. Update the pointer in the main orchestrator repo.
- **ROOT**: The main repo should ONLY contain orchestration logic, plans, and submodule pointers. (Note: Current project uses directories `peluqueria-api` and `peluqueria-client`, conversion to submodules to be discussed).

## 3. Technology Stack

- **BACKEND**: Spring Boot (Java).
- **FRONTEND**: React with TypeScript & TailwindCSS.
- **DESIGN**: Premium visual aesthetics, smooth transitions, and modern UI.

## 4. Security & Quality

- **ENVVARS**: No hardcoded secrets. Use environment variables.
- **TDD**: Write tests before implementation when possible.
- **SECURITY**: Defense in depth for all API endpoints.
