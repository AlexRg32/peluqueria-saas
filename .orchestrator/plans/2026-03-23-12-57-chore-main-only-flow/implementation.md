# Implementation Log: Main-Only Flow

> Started: 2026-03-23T12:57:39+01:00

- Actualizadas guias internas del repo para eliminar el flujo `staging -> main`.
- Adaptados los workflows `forge`, `ship` y `pr` al modelo `main-only`.
- Eliminado el workflow `promote`.
- Simplificado `render.yaml` a un unico servicio enlazado a `main`.
- Reescrita la documentacion de despliegue para reflejar un unico entorno soportado.
- Cambiado el default branch remoto a `main`.
- Eliminada la rama `staging` local y remota.
- Verificado por `rg` que no quedan referencias operativas a `staging` en archivos del proyecto.
- Pendiente externo: sigue existiendo el proyecto Vercel `saloria-staging`, pero no hay capacidad de borrado con los MCPs disponibles en este turno.
