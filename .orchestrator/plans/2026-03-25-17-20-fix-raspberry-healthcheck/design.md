# Design: Raspberry Deploy Healthcheck

## Architecture Overview
El script `redeploy.sh` seguira ejecutando `healthcheck.sh` tras recrear el contenedor. La unica diferencia es el objetivo de la comprobacion: en lugar de un endpoint de documentacion opcional, se consultara un endpoint publico y estable del dominio.

## File Structure
```text
deploy/raspberry/
├── README.md
└── scripts/
    └── healthcheck.sh
```

## Dependencies
- No se anaden paquetes.
- Se reutiliza `curl`, ya presente en el flujo actual.

## Testing Strategy
- Validacion de backend existente: `./mvnw test`
- Validacion operativa: comprobar que el script apunta por defecto a `/api/public/enterprises`
