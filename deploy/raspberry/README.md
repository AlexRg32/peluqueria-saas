# Despliegue en Raspberry Pi

Este directorio prepara una **fase 1 segura** para eliminar el cold start de Render:

- **Frontend** sigue en Vercel
- **Backend** pasa a la Raspberry Pi
- **Base de datos** se mantiene primero en Supabase o Postgres externo
- **PostgreSQL local** queda preparado como fase 2 opcional

## Recomendacion operativa

Empieza por mover **solo la API**. En este proyecto eso ya quita el problema del sleep de Render y te evita mezclar en el mismo cambio:

- migracion de red publica
- migracion de secretos
- migracion de datos
- endurecimiento y backups de Postgres

## Estado del host auditado

Revision remota realizada el **2026-03-22** sobre la Raspberry accesible por SSH:

- Arquitectura: `aarch64`
- RAM: `4.0 GiB`
- Disco raiz: `29 GiB` en `mmcblk0` (tarjeta SD)
- Docker: **no instalado** en el momento de la auditoria
- IP LAN observada: `192.168.50.187`

Conclusion:

- La Raspberry **sirve bien para la API**.
- Para alojar **PostgreSQL en serio**, conviene usar **SSD externo** en lugar de la SD.

## Archivos principales

- `docker-compose.prod.yml`: stack de produccion con perfiles
- `.env.prod.example`: variables a copiar en `.env.prod`
- `Caddyfile`: opcion con proxy HTTPS clasico
- `cloudflared/config.yml`: plantilla alternativa para Cloudflare Tunnel
- `scripts/bootstrap-host.sh`: instala Docker en Debian
- `scripts/install-tailscale.sh`: instala Tailscale para acceso remoto privado
- `scripts/redeploy.sh`: hace `git pull` del repo y redeploya la API
- `scripts/backup-postgres.sh`: backup de PostgreSQL local
- `scripts/restore-postgres.sh`: restauracion de PostgreSQL local
- `scripts/healthcheck.sh`: comprobacion rapida de la API

## Perfiles de Docker Compose

- `cloudflare`: recomendado cuando quieres publicar la API sin abrir puertos del router
- `caddy`: util si vas a usar DDNS + port forwarding + TLS local
- `local-db`: activa PostgreSQL local en la Raspberry

## Fase 1 recomendada

1. Instala Docker con `scripts/bootstrap-host.sh`.
2. Clona este repositorio completo en la Raspberry, idealmente en `~/saloria`.
3. Crea `deploy/raspberry/.env.prod` a partir de `deploy/raspberry/.env.prod.example`.
4. Instala Tailscale en la Raspberry:

```bash
./deploy/raspberry/scripts/install-tailscale.sh
sudo tailscale up
tailscale ip -4
```

5. Si usas Cloudflare Tunnel, pega el token remoto en `CLOUDFLARED_TOKEN` dentro de `.env.prod`.
6. Manten `SPRING_DATASOURCE_URL` apuntando a Supabase.
7. Si no quieres depender de Storage externo en esta fase, usa `APP_STORAGE_TYPE=local`.
8. Lanza el primer despliegue:

```bash
./deploy/raspberry/scripts/redeploy.sh
```

9. Si quieres ejecutarlo manualmente sin el script, el comando equivalente es:

```bash
docker compose \
  --env-file deploy/raspberry/.env.prod \
  -f deploy/raspberry/docker-compose.prod.yml \
  --profile cloudflare \
  up -d --build
```

10. Comprueba la API:

```bash
./deploy/raspberry/scripts/healthcheck.sh https://api.tudominio.com
```

Por defecto el script comprueba este endpoint publico:

```bash
curl -fsS https://api.tudominio.com/api/public/enterprises
```

## Acceso remoto recomendado: Tailscale

La recomendacion operativa para acceder a la Raspberry fuera de casa es **Tailscale**. El Cloudflare Tunnel de este repo publica la API HTTP, pero no expone SSH por defecto.

### Ventajas

- No necesitas abrir el puerto `22` en el router.
- GitHub Actions puede entrar por SSH usando la IP privada de Tailscale o el nombre MagicDNS.
- El acceso queda separado de la publicacion de la API, que puede seguir en Cloudflare Tunnel.

### Conexion manual desde tu portatil

Una vez que la Raspberry y tu portatil estan dentro de la misma red Tailscale:

```bash
ssh <usuario>@<ip-tailscale>
```

O si tienes MagicDNS:

```bash
ssh <usuario>@raspberrypi.tailnet-name.ts.net
```

## Auto-deploy desde `main`

El repositorio incluye un workflow de GitHub Actions en `.github/workflows/deploy-raspberry.yml` para redeployar la API cuando hay cambios en:

- `saloria-api/**`
- `deploy/raspberry/**`

### Modelo recomendado

- Un runner **self-hosted** de GitHub Actions vive en la propia Raspberry.
- GitHub construye primero una imagen **linux/arm64** de la API y la publica en **GHCR**.
- La Raspberry ejecuta `deploy/raspberry/scripts/redeploy.sh`, hace `docker pull` de esa imagen y reinicia el stack.
- Tailscale sigue siendo la opcion recomendada para tu acceso SSH manual al host.

### Flujo

1. Haces push a `main`.
2. GitHub encola el workflow `Deploy Raspberry API`.
3. El job `build-api-image` publica una imagen `linux/arm64` en GHCR.
4. El runner self-hosted de la Raspberry ejecuta `deploy/raspberry/scripts/redeploy.sh`.
5. El script hace `git pull --ff-only origin main`, intenta desplegar la imagen ya construida y solo hace build local si ese pull falla.
6. El healthcheck usa por defecto `HEALTHCHECK_PATH=/api/public/enterprises` para no depender de Swagger/OpenAPI en produccion. Si el endpoint cambia, se puede sobrescribir por entorno.

### Preparacion del runner

La Raspberry debe tener un runner registrado para este repositorio. Un ejemplo de instalacion:

```bash
mkdir -p ~/actions-runner-saloria
cd ~/actions-runner-saloria
curl -L -o actions-runner-linux-arm64-2.333.0.tar.gz \
  https://github.com/actions/runner/releases/download/v2.333.0/actions-runner-linux-arm64-2.333.0.tar.gz
tar xzf actions-runner-linux-arm64-2.333.0.tar.gz
sudo ./bin/installdependencies.sh
./config.sh --url https://github.com/AlexRg32/Saloria --token <REGISTRATION_TOKEN> \
  --unattended --replace --name raspberry-alex-runner --labels raspberry,prod
sudo ./svc.sh install alexrg32
sudo ./svc.sh start
```

## Fase 2 opcional: PostgreSQL local

Cuando la fase 1 este estable:

1. Conecta un SSD externo.
2. Ajusta el volumen de `postgres_data` al disco persistente.
3. Cambia `SPRING_DATASOURCE_URL` a `jdbc:postgresql://db:5432/saloria_db`.
4. Arranca con el perfil local:

```bash
DEPLOY_PROFILES=cloudflare,local-db ./deploy/raspberry/scripts/redeploy.sh
```

5. Migra los datos con dump/restore.
6. Programa backups regulares.

## Rollback

Si algo falla tras apuntar Vercel a la Raspberry:

1. Reestablece `VITE_API_BASE_URL` en Vercel hacia la URL actual de Render.
2. Redeploya el frontend.
3. Revisa logs con `docker compose --env-file deploy/raspberry/.env.prod -f deploy/raspberry/docker-compose.prod.yml logs -f app`.

## Notas de seguridad

- No expongas PostgreSQL a Internet.
- No subas `.env.prod` al repositorio.
- Rota el `JWT_SECRET` al salir de Render.
- Si usas Cloudflare Tunnel, evita abrir puertos en el router.
- Cuando recrees el servicio `cloudflared`, usa `--env-file .env.prod` para que Docker Compose lea `CLOUDFLARED_TOKEN`.
- Usa Tailscale para SSH remoto en lugar de abrir el puerto `22` a Internet.
- Si prefieres no usar runner self-hosted, entonces si necesitaras una clave SSH dedicada para GitHub Actions.
