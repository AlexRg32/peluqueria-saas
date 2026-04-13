# Design: Raspberry API Autostart

## Architecture Overview
La disponibilidad tras un apagado depende de dos capas:

1. **Host layer**: la Raspberry debe arrancar el servicio Docker al boot.
2. **Container layer**: Docker debe relanzar `app`, `cloudflared`/`caddy` y `db` si fueron creados previamente.

## Deployment Behavior
| Layer | Evidence | Expected behavior |
|------|----------|-------------------|
| Docker Compose services | `restart: unless-stopped` en compose | Reinicio automatico tras reboot del host |
| Initial deployment | `redeploy.sh` ejecuta `docker compose up -d --build` | Crea o actualiza los contenedores una primera vez |
| Host bootstrap | `bootstrap-host.sh` instala Docker | El repo asume Docker operativo en la Raspberry |
| CI/CD | Workflow self-hosted ejecuta `redeploy.sh` | Los cambios futuros se despliegan sin SSH manual |

## File Structure
deploy/raspberry/
├── docker-compose.prod.yml
├── README.md
└── scripts/
    ├── bootstrap-host.sh
    └── redeploy.sh

## Testing Strategy
- Operacional: reiniciar la Raspberry y comprobar si responden la API y el tunnel.
- Verificacion del host: comprobar estado de Docker con `systemctl`.
- Verificacion de contenedores: comprobar `docker ps`.
