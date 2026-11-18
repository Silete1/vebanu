#!/usr/bin/env bash
# Deploys the committed HEAD to anu-cloud-01 in ONE SSH connection: ships the source, builds there, starts it.
# Run from Git Bash in the repo root:  bash deploy/deploy.sh
# The SSH key lives in WSL (see deploy/README.md).
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
[ -z "$(git status --porcelain -- . ':!*.png' ':!*.ico')" ] || echo "note: uncommitted changes are NOT deployed (HEAD only)"
RELEASE="$(date -u +%Y%m%d%H%M)-$(git rev-parse --short HEAD)"
HOST="${ANU_WEBSITE_SSH:-anu-operator@65.21.246.142}"
KEY="${ANU_WEBSITE_KEY:-/home/lenovo/.ssh/anu_cloud_ed25519}"
echo "deploying $RELEASE to $HOST"
git archive --format=tar HEAD | gzip -c | (cd "$HOME" && MSYS_NO_PATHCONV=1 wsl.exe -d Ubuntu -- ssh -o BatchMode=yes \
  -o ConnectTimeout=20 -i "$KEY" -o IdentitiesOnly=yes "$HOST" \
  "set -e; mkdir -p ~/anu-website; rm -rf ~/anu-website/src; mkdir ~/anu-website/src; tar -xz -C ~/anu-website/src; bash ~/anu-website/src/deploy/remote-deploy.sh $RELEASE")
