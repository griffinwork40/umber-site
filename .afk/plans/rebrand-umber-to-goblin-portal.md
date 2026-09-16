# Rebrand: Umber → Goblin Portal

## Approach

Full text/label rebrand of the Umber landing site to "Goblin Portal". The Umber theme name is preserved as an easter egg. GitHub URLs point to `griffinwork40/goblin-portal`. No new app icon art yet — `icon-1024.png` stays, alt text updates.

## Waves

### Wave 1: Data Hub — `src/lib/constants.ts`
- `SITE_META.title`: `'Umber'` → `'Goblin Portal'`
- `SITE_META.tagline`: update name reference
- `SITE_META.description`: replace "Umber" with "Goblin Portal"
- `SITE_META.repoUrl`: → `griffinwork40/goblin-portal`
- `SITE_META.dmgUrl`: update repo path + DMG filename
- `SITE_META.releasesUrl`: update repo path
- Feature copy (line 43): "Umber switches" → "Goblin Portal switches"
- Install steps: `git clone .../goblin-portal.git`, `cd goblin-portal/app`, `open build/GoblinPortal.app`, xattr
- Showcase image alts: replace "Umber" mentions
- Showcase image paths: `umber-*.png` → `goblin-portal-*.png`
- File comment
- **THEMES[1] stays unchanged** (easter egg)

### Wave 2: Infrastructure
- `tailwind.config.ts`: rename 10 `umber-*` → `gp-*` classes (unused, no cascade)
- `package.json`: `"umber-site"` → `"goblin-portal-site"`
- `src/styles/tokens.css`: update comment

### Wave 3: Components (7 files)
- `SiteHeader.tsx` — wordmark
- `HeroContent.tsx` — icon alt text
- `HeroScreenshot.tsx` — screenshot src path + alt text
- `AgentSection.tsx` — lead copy
- `ThemeShowcase.tsx` — terminal mockup (path, command); keep theme name "umber"
- `InstallSection.tsx` — download button text
- `Footer.tsx` — icon alt text

### Wave 4: Assets
- Rename 3 image files: `umber-screenshot.png`, `umber-workspace.png`, `umber-editor.png` → `goblin-portal-*`

### Wave 5: Tests (6 files)
- Update all assertions referencing "Umber" in heading, alt text, button text, aria-labels
- Keep theme-name test as-is

### Wave 6: Docs
- `AFK.md` — title, description, conventions

### Verification
- `pnpm tsc` + `pnpm test:run` + `pnpm build`
- `grep -ri 'umber' src/ tailwind.config.ts package.json` — only hits should be the theme easter egg

## Risks
- **GitHub URLs assume the repo will be renamed** — download/clone links 404 until `griffinwork40/goblin-portal` exists
- **DMG filename change** — the actual release artifact must also be renamed in the GitHub Release
- **`umber` theme in the Swift app** — site and app theme names will diverge until the Swift app is also renamed

## Alternatives Considered
- **Partial rename (copy only, keep code identifiers)**: Rejected — `umber-*` Tailwind classes are unused, clean break is simpler.
- **Keep `umber` theme name as legacy**: **Accepted** — easter egg preserving heritage.
