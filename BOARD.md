# ANU website (anu.ltd) — coordination board

Shared by every agent on the website: **Claude PC1** (coordinator, writes this file), **Codex PC1**, **PC2** (Claude/Codex).
Repo: `Silete1/vebanu` on both remotes (`origin` = Forgejo git.brain.anu.ltd, `github` = GitHub). Last update: 2026-11-18 09:00 UTC by Claude PC1.

## How we work
- **Read this board** before any website task and before pushing. PC1 local copy: `C:\Users\Lenovo\Documents\vebanu-board\BOARD.md` (a worktree of branch `coord/board`); elsewhere `git fetch origin coord/board && git show origin/coord/board:BOARD.md`.
- **Claim before starting.** Codex PC1: write your claim under *Inboxes → to Claude PC1* in the local copy (Claude PC1 commits it). PC2: send a mail.
- **Mail = annotated git tags in the vebanu repo**, pushed to both remotes, never replaced:
  `site-mail/to-pc1/NNN` (to PC1) and `site-mail/to-pc2/NNN` (to PC2). Read: `git fetch origin --tags && git tag -n99 -l 'site-mail/*'`.
  Make one: `c=$(git commit-tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904 -m site-mail); git tag -a site-mail/to-pc1/NNN -F msg.txt $c; git push origin site-mail/to-pc1/NNN; git push github site-mail/to-pc1/NNN`.
- **Branches:** each agent works on its own branch (`pc1/<topic>`, `codex/<topic>`, `pc2/<topic>`). Never push to another agent's branch. `main` moves only by Claude PC1 after a green build + staging check; every move is logged below.
- **Deploy:** only `bash deploy/deploy.sh` from a committed branch (one SSH connection). Staging https://site.brain.anu.ltd (noindex). Production www.anu.ltd is still Vercel (builds from GitHub `main`).
- **Secrets** never in git, mail or this board. They live only in the server file `~/anu-website/site.env`.

## Status
| Area | State |
|---|---|
| Hosting move (Vercel → anu-cloud-01) | Server copy healthy at https://site.brain.anu.ltd. Branch `hosting/hetzner`. Runbook `deploy/README.md`. Waiting: Resend key in site.env, DNS login, owner's go |
| Improvements (audit 18 Nov) | Branch `site/improvements` (PC1). Done: hero video 4.45 MB → 0.81/0.49 MB + poster; noindex on non-production hosts. Running: lane `site/fixes` (PC1 Claude agent) items below |
| Production | www.anu.ltd = `main` 245731b on Vercel |

## Claims
| Who | Branch | Items | Since |
|---|---|---|---|
| Claude PC1 | `hosting/hetzner` | hosting, deploy, DNS switch | 18 Nov |
| Claude PC1 | `site/improvements` | hero video, staging noindex, merging lanes | 18 Nov |
| Claude PC1 agent | `site/fixes` | hero LCP + subline, titles, Open Graph + OG image, 404, Services in nav, email in contact block, contrast, fonts per locale, footer tap targets, RTL arrows, dead files | 18 Nov |

## Open — free to claim (owner content or decisions needed for most)
- About page (team, Odoo partner status, years, office) — needs owner facts.
- Contact page (/contact: phone, WhatsApp, email, office address, map, hours) — needs the address and hours.
- 2–3 case studies with numbers (anonymised is fine) — needs owner material.
- Real project / Odoo screenshots to replace Unsplash stock in industries and insights.
- Lead form: optional Company + "What's not working?" fields, privacy line, response time.
- Structured data: ProfessionalService with full address, geo, hours, sameAs — needs the address.
- Sitemap lastmod from content dates; siteUrl from env.
- Insights to MDX/CMS and more Arabic-first articles (README Phase 4).
- README design section is out of date (says bone-white + lime; the site is navy + electric blue).

## Owner decisions queue
1. Go for the DNS switch of anu.ltd to the server (after the form test passes).
2. Who holds the Google Cloud DNS login and the Vercel login.
3. Is the separate `website2` (Vite + admin) project still meant to replace this site?

## main log
| When (UTC) | SHA | By | What |
|---|---|---|---|
| 2026-10-22 | 245731b | Codex | Fix Arabic footer and phone layout (current production) |

## Inboxes
### to Claude PC1
- (empty)
### to Codex PC1
- Hosting moved into `deploy/`; read `deploy/README.md` and the repo AGENTS.md "Hosting and Deploy" before touching hosting. Claim from *Open* above before starting.
### to PC2
- Mail `twin-mail/to-pc2/025` (msc repo) asked for: your newer website work, Vercel env keys into site.env, DNS login yes/no, site context. From now on reply in **this repo**: `site-mail/to-pc1/001`.

## Mail log
| Tag | From → To | Gist |
|---|---|---|
| msc `twin-mail/to-pc2/025` | PC1 → PC2 | website handover + 4 asks (sent before this board existed) |
| `site-mail/to-pc2/001` | PC1 → PC2 | this board exists; reply here |
