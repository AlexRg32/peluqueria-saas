#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
REPO_DIR=$(cd -- "${SCRIPT_DIR}/../../.." && pwd)
DEPLOY_DIR="${REPO_DIR}/deploy/raspberry"
ENV_FILE="${ENV_FILE:-${DEPLOY_DIR}/.env.prod}"
GIT_REMOTE="${GIT_REMOTE:-origin}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
DEPLOY_PROFILES="${DEPLOY_PROFILES:-cloudflare}"
SKIP_GIT_PULL="${SKIP_GIT_PULL:-0}"
HEALTHCHECK_ATTEMPTS="${HEALTHCHECK_ATTEMPTS:-20}"
HEALTHCHECK_INTERVAL="${HEALTHCHECK_INTERVAL:-3}"
DEFAULT_LOCAL_IMAGE="saloria-api:raspberry"
PREFERRED_APP_IMAGE="${SALORIA_API_IMAGE:-${DEFAULT_LOCAL_IMAGE}}"
ALLOW_LOCAL_BUILD_FALLBACK="${ALLOW_LOCAL_BUILD_FALLBACK:-1}"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Missing env file: ${ENV_FILE}"
  exit 1
fi

if [[ ! -d "${REPO_DIR}/.git" ]]; then
  echo "Repository not found at ${REPO_DIR}. Clone the repo on the Raspberry first."
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "${ENV_FILE}"
set +a

if [[ "${SKIP_GIT_PULL}" != "1" ]]; then
  current_branch=$(git -C "${REPO_DIR}" branch --show-current)

  if [[ "${current_branch}" != "${DEPLOY_BRANCH}" ]]; then
    git -C "${REPO_DIR}" checkout "${DEPLOY_BRANCH}"
  fi

  git -C "${REPO_DIR}" pull --ff-only "${GIT_REMOTE}" "${DEPLOY_BRANCH}"
fi

profile_args=()
for profile in ${DEPLOY_PROFILES//,/ }; do
  if [[ -n "${profile}" ]]; then
    profile_args+=(--profile "${profile}")
  fi
done

compose_cmd() {
  docker compose \
    --env-file "${ENV_FILE}" \
    -f "${DEPLOY_DIR}/docker-compose.prod.yml" \
    "${profile_args[@]}" \
    "$@"
}

run_compose_build() {
  compose_cmd up -d --build --remove-orphans
}

run_compose_with_image() {
  compose_cmd up -d --no-build --remove-orphans
}

login_registry_if_configured() {
  local registry="${GHCR_REGISTRY:-ghcr.io}"

  if [[ -z "${GHCR_USERNAME:-}" || -z "${GHCR_TOKEN:-}" ]]; then
    return 0
  fi

  echo "${GHCR_TOKEN}" | docker login "${registry}" --username "${GHCR_USERNAME}" --password-stdin
}

deploy_with_local_build() {
  export SALORIA_API_IMAGE="${DEFAULT_LOCAL_IMAGE}"

  if ! run_compose_build; then
    echo "Docker Compose build failed on Raspberry. Cleaning builder state and retrying once without BuildKit..."
    docker buildx stop >/dev/null 2>&1 || true
    docker buildx rm --all-inactive --force >/dev/null 2>&1 || true
    docker builder prune --all --force >/dev/null 2>&1 || true

    COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 run_compose_build
  fi
}

deploy_with_prebuilt_image() {
  export SALORIA_API_IMAGE="${PREFERRED_APP_IMAGE}"

  echo "Deploying prebuilt image: ${SALORIA_API_IMAGE}"
  login_registry_if_configured
  docker pull "${SALORIA_API_IMAGE}"
  run_compose_with_image
}

if [[ "${PREFERRED_APP_IMAGE}" != "${DEFAULT_LOCAL_IMAGE}" ]]; then
  if ! deploy_with_prebuilt_image; then
    if [[ "${ALLOW_LOCAL_BUILD_FALLBACK}" != "1" ]]; then
      echo "Prebuilt image deploy failed and local fallback is disabled."
      exit 1
    fi

    echo "Prebuilt image deploy failed. Falling back to local Docker build on the Raspberry..."
    deploy_with_local_build
  fi
else
  deploy_with_local_build
fi

for attempt in $(seq 1 "${HEALTHCHECK_ATTEMPTS}"); do
  if "${DEPLOY_DIR}/scripts/healthcheck.sh" "${APP_API_BASE_URL:-http://localhost:8080}"; then
    exit 0
  fi

  if [[ "${attempt}" -lt "${HEALTHCHECK_ATTEMPTS}" ]]; then
    sleep "${HEALTHCHECK_INTERVAL}"
  fi
done

echo "Healthcheck failed after ${HEALTHCHECK_ATTEMPTS} attempts."
exit 1
