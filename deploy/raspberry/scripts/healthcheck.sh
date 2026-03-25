#!/usr/bin/env bash

set -euo pipefail

BASE_URL="${1:-${APP_API_BASE_URL:-http://localhost:8080}}"
HEALTHCHECK_PATH="${HEALTHCHECK_PATH:-/api/public/enterprises}"

if [[ "${HEALTHCHECK_PATH}" != /* ]]; then
  HEALTHCHECK_PATH="/${HEALTHCHECK_PATH}"
fi

TARGET_URL="${BASE_URL%/}${HEALTHCHECK_PATH}"

curl -fsS "${TARGET_URL}" >/dev/null
echo "Healthcheck OK for ${TARGET_URL}"
