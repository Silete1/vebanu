#!/usr/bin/env bash
# Runs ON anu-cloud-01 (called by deploy/deploy.sh). Builds the release, starts it behind Traefik, checks it.
# Persistent state lives outside the source copy, in ~/anu-website:
#   site.env  secrets (RESEND_API_KEY, ASSESSMENT_*; SANITY_* optional), chmod 600, never in git
#   hosts     the Traefik host rule, e.g. Host(`site.brain.anu.ltd`) || Host(`anu.ltd`) || Host(`www.anu.ltd`)
set -euo pipefail
RELEASE="$1"
HOME_DIR="$HOME/anu-website"
SRC="$HOME_DIR/src"
cd "$SRC/deploy"

[ -f "$HOME_DIR/hosts" ] || echo 'Host(`site.brain.anu.ltd`)' > "$HOME_DIR/hosts"
if [ ! -f "$HOME_DIR/site.env" ]; then
  printf 'ASSESSMENT_TO_EMAIL=info@anu.ltd\n# RESEND_API_KEY=\n# ASSESSMENT_FROM_EMAIL="ANU Website <website@anu.ltd>"\n' > "$HOME_DIR/site.env"
  chmod 600 "$HOME_DIR/site.env"
fi
cp "$HOME_DIR/site.env" site.env

export RELEASE
export SITE_HOSTS="$(cat "$HOME_DIR/hosts")"
# the resolver name Coolify gave Traefik
export CERT_RESOLVER="$(docker inspect coolify-proxy --format '{{join .Args " "}}' | grep -o 'certificatesresolvers\.[a-zA-Z0-9_-]*' | head -1 | cut -d. -f2)"
CERT_RESOLVER="${CERT_RESOLVER:-letsencrypt}"
echo "release=$RELEASE resolver=$CERT_RESOLVER hosts=$SITE_HOSTS"

docker compose build --pull web
docker compose up -d web
echo "$RELEASE" >> "$HOME_DIR/releases"

for i in $(seq 1 30); do
  state="$(docker inspect anu-website-web-1 --format '{{.State.Health.Status}}' 2>/dev/null || true)"
  [ "$state" = healthy ] && break
  sleep 2
done
echo "container health: $state"

# through Traefik, for each host in the rule
for h in $(grep -o 'Host(`[^`]*`)' "$HOME_DIR/hosts" | sed 's/Host(`\(.*\)`)/\1/'); do
  code="$(curl -s -o /dev/null -w '%{http_code}' --resolve "$h:443:127.0.0.1" "https://$h/en" -k || true)"
  echo "https://$h/en -> $code"
done

# keep the newest 3 release images (rollback: RELEASE=<old> docker compose up -d web)
docker images anu-website --format '{{.Tag}}' | grep -v latest | sort -r | tail -n +4 | xargs -r -I{} docker rmi "anu-website:{}" >/dev/null 2>&1 || true
docker image prune -f --filter label=com.docker.compose.project=anu-website >/dev/null 2>&1 || true
echo "releases kept: $(docker images anu-website --format '{{.Tag}}' | tr '\n' ' ')"
