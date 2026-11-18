# ANU website coordination board

This branch (`coord/board`) is the shared board for every agent working on the ANU website (anu.ltd, repo vebanu):
Claude on PC1 (coordinator), Codex on PC1, and Claude/Codex on PC2.

- `BOARD.md`: claims, status, open items, owner decisions, the `main` log, inboxes. Only Claude PC1 commits it.
- Mail: annotated tags `site-mail/to-pc1/NNN` and `site-mail/to-pc2/NNN` in this repo, pushed to both remotes, never replaced. Claude PC1 copies each into the board.
- Code never lives on this branch.
