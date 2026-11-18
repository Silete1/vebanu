# Hosting anu.ltd on anu-cloud-01

The site runs on ANU's Hetzner server `anu-cloud-01` (65.21.246.142) as one Docker container behind Coolify's
Traefik (`coolify-proxy`, which owns ports 80/443 and gets Let's Encrypt certificates). Vercel stays as it is until
the DNS is switched, so either one can serve the site.

| File | What it is |
|---|---|
| `Dockerfile` | Next.js standalone build, Node 24 alpine, port 3000, health check |
| `docker-compose.yml` | project `anu-website` on the `coolify` network, Traefik labels, http→https, gzip, anu.ltd→www |
| `hosts` | the Traefik host rule, one line. The only thing to change at the switch |
| `deploy.sh` | run on your PC: ships the committed HEAD over one SSH connection, builds and starts it on the server |
| `remote-deploy.sh` | runs on the server: build, start, health check, check each host through Traefik, keep 3 releases |

## Deploy

```bash
# Git Bash, repo root, changes committed (only HEAD is shipped)
bash deploy/deploy.sh
```

It needs the WSL key `/home/lenovo/.ssh/anu_cloud_ed25519` for `anu-operator@65.21.246.142` (override with
`ANU_WEBSITE_KEY` / `ANU_WEBSITE_SSH`). It prints `container health: healthy` and `https://<host>/en -> 200` per host.

Staging address (works now, any time): **https://site.brain.anu.ltd/en** (`*.brain.anu.ltd` already points at the server).

## Secrets (server only, never in git)

`~/anu-website/site.env` on the server, `chmod 600`. It's created on the first deploy with only `ASSESSMENT_TO_EMAIL`.
Until `RESEND_API_KEY` is set, the assessment form answers "unavailable" and sends nothing.

```
RESEND_API_KEY=re_...                      # copy from Vercel → project → Settings → Environment Variables
ASSESSMENT_FROM_EMAIL="ANU Website <...>"  # the same value as on Vercel
ASSESSMENT_TO_EMAIL=info@anu.ltd
# SANITY_PROJECT_ID= / SANITY_DATASET=    # only if Field Notes come from Sanity
```

After changing it, run `bash deploy/deploy.sh` again (or, on the server, `cd ~/anu-website/src/deploy && cp ../../site.env . && docker compose up -d web`).

## Switch anu.ltd from Vercel to the server

1. Put the secrets in `site.env` (above), and send one test from the form on the staging address.
2. In the DNS (anu.ltd uses Google Cloud DNS, `ns-cloud-c1..c4.googledomains.com`): lower the TTL of `anu.ltd` and
   `www.anu.ltd` to 300 a day before, if you can.
3. Edit `deploy/hosts` to
   ``Host(`site.brain.anu.ltd`) || Host(`anu.ltd`) || Host(`www.anu.ltd`)``,
   commit, and run `bash deploy/deploy.sh`. Nothing changes for visitors yet: DNS still points at Vercel.
4. Change the DNS records:
   - `anu.ltd` A → `65.21.246.142` (replaces Vercel's `76.76.21.21`)
   - `www.anu.ltd` → A `65.21.246.142`, or CNAME `anu.ltd.` (replaces the Vercel CNAME)
5. When `nslookup www.anu.ltd` gives 65.21.246.142, open https://www.anu.ltd and https://anu.ltd (it should land on
   www). Traefik gets the certificates on the first visit, so the first few seconds can show a certificate warning.
6. Keep the Vercel project for a week as the fallback, then remove its domains.

Rollback: point the two DNS records back at Vercel (`76.76.21.21`, and `cname.vercel-dns.com` for www).
On the server, to undo a bad release: `cd ~/anu-website/src/deploy && RELEASE=<older tag> SITE_HOSTS="$(cat hosts)" docker compose up -d web`
(`docker images anu-website` lists the 3 kept tags).

Memory: the container is capped at 512 MB.
