#!/usr/bin/env bash

set -euo pipefail

if ! command -v apt-get >/dev/null 2>&1; then
  echo "This bootstrap script expects a Debian-based host."
  exit 1
fi

sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg git

if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

sudo usermod -aG docker "${USER}"

mkdir -p "${HOME}/saloria/deploy"

cat <<'EOF'
Docker is installed (or already present).
Log out and back in before using Docker without sudo.
Suggested next steps:
  1. Copy deploy/raspberry into ~/saloria/deploy
  2. Create ~/saloria/deploy/.env.prod from .env.prod.example
  3. Run docker compose --profile cloudflare up -d --build
EOF
