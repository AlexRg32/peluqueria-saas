# Design: Deployment Alignment

## Architecture Overview
El estado deseable es simple:

- **Produccion**:
  - Frontend: proyecto Vercel `saloria`
  - Backend: `api.alexrg.es` -> Cloudflare Tunnel -> Raspberry -> contenedor API
  - Base de datos: Supabase `xwnumlcqnrwhgpbrldhf`
- **Staging**:
  - Frontend: un unico proyecto/previsualizacion de Vercel asociado a `staging`
  - Backend: Render staging o Raspberry staging, pero solo uno
  - Base de datos: datasource separado por variables externas

La deuda actual no es de arquitectura funcional sino de **gobernanza de entorno**:

1. nombres e identificadores legacy conviven con los nuevos
2. la promocion de codigo y la promocion de despliegue no coinciden
3. la documentacion mezcla estado actual con estado objetivo

## Control Plane Design
| Concern | Source of Truth deseado | Estado actual |
|--------|--------------------------|---------------|
| Rama productiva | `main` | Vercel `saloria` despliega desde `staging` |
| Rama preprod | `staging` | Existe, pero comparte demasiado contexto con produccion |
| Frontend prod | Proyecto Vercel `saloria` | Activo |
| Frontend staging | Proyecto Vercel dedicado o preview protegido del mismo proyecto | Hay proyecto legacy aparte |
| Backend prod | Raspberry + Cloudflare | Activo |
| Backend staging | Render staging o equivalente definido | Activo en Render, pero no queda claro si seguira asi |
| IaC Render | `render.yaml` vigente y aplicado | Deriva respecto al estado remoto |

## File Structure
La resolucion pasa por estos artefactos de configuracion y documentacion:

```text
render.yaml
deploy/raspberry/docker-compose.prod.yml
deploy/raspberry/.env.prod.example
README.md
DEPLOYMENT.md
docs/07-infraestructura.md
.agent/workflows/ship.md
.agent/workflows/promote.md
```

## Dependencies
- Plataformas externas ya existentes: Vercel, Render, Supabase, Cloudflare Tunnel
- No hacen falta paquetes nuevos

## Testing Strategy
- **Infra smoke checks**:
  - `curl https://saloria.vercel.app`
  - `curl -I https://api.alexrg.es`
  - `curl -I https://peluqueria-saas-staging-fra.onrender.com`
- **Git/deploy alignment checks**:
  - verificar rama conectada en Vercel
  - verificar que `main` es la unica promotora a produccion
- **Docs drift checks**:
  - cada URL publica documentada debe responder como se describe
