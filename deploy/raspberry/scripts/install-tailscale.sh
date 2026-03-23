#!/usr/bin/env bash

set -euo pipefail

if ! command -v apt-get >/dev/null 2>&1; then
  echo "This installer expects a Debian-based host."
  exit 1
fi

curl -fsSL https://tailscale.com/install.sh | sh

cat <<'EOF'
Tailscale is installed.

Next steps on the Raspberry:
  1. Run: sudo tailscale up
  2. Approve/sign in from the browser if prompted
  3. Check the device IP with: tailscale ip -4
  4. Use that IP (or the MagicDNS hostname) as RASPBERRY_HOST in GitHub Actions
EOF
