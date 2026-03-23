# Design: Saloria Rebrand

## Architecture Overview
The rebrand is a cross-cutting metadata change, not a feature change. It touches four layers:

1. **Brand Surface**
   - README, docs, page titles, manifest, UI fallback copy.
2. **Application Identity**
   - Spring app name, Maven coordinates/descriptions, frontend package name.
3. **Code Namespace**
   - Java package root and application class naming.
4. **Deployment Identity**
   - Render blueprint service names, repo references, deployment docs, local compose/container naming where appropriate.

## Data Model
No schema changes.

## API Contracts
No endpoint changes expected.

## Component Design
### Component Tree
No structural UI redesign required. Only brand copy and metadata updates in existing components.

### State Management
- Local state: unchanged.
- Server state: unchanged.

## File Structure
```text
.
├── README.md
├── docs/*
├── docker-compose.yml
├── render.yaml
├── deploy/raspberry/*
├── peluqueria-api/
│   ├── pom.xml
│   ├── src/main/resources/application.properties
│   └── src/{main,test}/java/com/peluqueria -> com/saloria
└── peluqueria-client/
    ├── package.json
    ├── index.html
    ├── public/manifest.json
    └── src/**/* brand strings
```

## Dependencies
- Suggested new packages: none.
- Existing packages to use: existing build/test toolchain only.

## Testing Strategy
- Unit: backend Maven tests, frontend Vitest suite if rename affects visible UI assertions.
- Integration: targeted search for stale brand strings after edits.
- Smoke: confirm frontend metadata/title/manifest and backend package compilation.
