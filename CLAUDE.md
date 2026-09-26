# CLAUDE.md

The rules for coding agents on this repo live in **AGENTS.md**, which is shared with other AI tools. Claude Code loads it through the import below. Put shared rules in AGENTS.md, not here.

@AGENTS.md

## Claude Code specifics

- **Read on demand.** These docs are not auto-loaded, to keep context small. Open the relevant one before a change of that kind:
  - [ARCHITECTURE.md](ARCHITECTURE.md): structure, auth or deployment changes
  - [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md): any UI or graph work
  - [PRD.md](PRD.md): scope or feature changes
- **Talk to the owner** in casual Bahasa Melayu with English technical terms, with short progress updates. The owner is a teacher, so describe actions in terms of the Vercel or Firebase screens they will click.
- **Branch → PR → `main`.** Merging to `main` deploys production (`econwebsite.vercel.app`), so merge only with the owner's go-ahead. Keep commit messages and PR descriptions in Malay.
- **Verify like a user.** For UI or graph changes, open the page in a headless browser at 390 px **and** desktop, in light **and** dark mode, with no console errors and no horizontal scroll. Look at a screenshot before you say it's done.
- **Access control is sensitive.** Ask before changing who can sign in, publishing exam material (e.g. the hidden Terengganu paper), or deleting Vercel or Firebase projects.
