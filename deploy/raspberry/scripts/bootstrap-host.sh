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

mkdir -p "${HOME}/saloria"

cat <<'EOF'
Docker is installed (or already present).
Log out and back in before using Docker without sudo.
Suggested next steps:
  1. Clone the repo into ~/saloria (or pull the latest changes if it already exists)
  2. Create ~/saloria/deploy/raspberry/.env.prod from .env.prod.example
  3. Optional but recommended: run ~/saloria/deploy/raspberry/scripts/install-tailscale.sh
  4. Run ~/saloria/deploy/raspberry/scripts/redeploy.sh
EOF
