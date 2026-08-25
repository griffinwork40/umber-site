# Plan: Add Screenshots and Editor Feature Section

**Created:** 2026-08-21
**Status:** In progress
**Branch:** main

## Objective

Add the provided screenshots and comprehensive editor/feature information to the Umber landing page. The current site omits the editor entirely and has only one product screenshot.

## Current State

- Next.js 14 App Router deployed to Vercel. Single commit `53d08dd`.
- 6 sections: Hero → Agents → Features → Themes → Install → Keymap.
- One product screenshot in the hero (720×472 `umber-screenshot.png`).
- All copy lives in `src/lib/constants.ts`. CSS uses design-token + visual-signature system.
- Every component stays ≤350 LOC.

## Available Assets

Two Retina screenshots at `~/Desktop/umber-sc/` (2784×2012 each):
1. Cursor IDE showing agent-afk project skill directory — illustrates agent workspace use case.
2. Cursor IDE showing umber-site constants.ts — illustrates editor/dev workflow.

## Feature Coverage Gap

The Umber project has significantly more features than the landing page showcases:
- **Editor/File Viewer** — syntax highlighting (23 langs), code folding, symbol outline (⌘⇧O), command palette (⌘⇧P), multi-cursor (⌘D), go-to-line, sticky scroll, auto-indent, bracket matching, indent rainbow. Zero editor features on the site.
- **Split Panes** — only a bullet in Agents section.
- **Shell Integration** — OSC 7 cwd following, tab status dots, kernel fallback. One bullet.
- **Two-Level Tab Model** — Spaces + Documents. Only hinted at.
- **Native macOS Integration** — .app bundle, geometry restore, update checker, VoiceOver. Barely mentioned.
- **Performance & Correctness** — scrollback reflow fix, tmux fix, Metal shipping. Not on site.

## Concrete Steps

### 1. Copy and optimize screenshots into `public/images/`
- Rename to `umber-workspace.png`, `umber-editor.png`
- Optimize with `sips` to 1400px wide (web-ready @2x)

### 2. New section: Editor (between Features and Themes)
- New `src/components/editor/EditorSection.tsx`
- H2: "More than a terminal"
- Subhead positioning the built-in editor
- Screenshot image
- 4-card feature grid: Syntax Highlighting, Command Palette & Symbols, Code Folding & Navigation, Multi-Cursor Editing

### 3. Add editor feature data to `constants.ts`
- New `EditorFeature` interface and `EDITOR_FEATURES` array

### 4. Create FeatureShowcase component
- `src/components/features/FeatureShowcase.tsx`
- Screenshot + text alternating layout for visual feature treatment
- Used in the Features section to pair one screenshot with key selling points

### 5. Update page assembly and navigation
- `src/app/page.tsx` — import and render `EditorSection`
- `src/components/header/SiteHeader.tsx` — add "Editor" nav link
- `src/app/globals.css` — mobile responsive rules for new sections

### 6. Tests
- Add `EditorSection.test.tsx`
- Run full test suite

## New Files
| File | Purpose | LOC Est. |
|---|---|---|
| `src/components/editor/EditorSection.tsx` | Editor feature section | ~90 |
| `src/components/editor/EditorSection.test.tsx` | Tests | ~30 |
| `src/components/features/FeatureShowcase.tsx` | Screenshot + text layout | ~80 |
| `public/images/umber-workspace.png` | Optimized screenshot | binary |
| `public/images/umber-editor.png` | Optimized screenshot | binary |

## Modified Files
| File | Change |
|---|---|
| `src/lib/constants.ts` | Add `EDITOR_FEATURES` data |
| `src/app/page.tsx` | Import and render `EditorSection` |
| `src/components/header/SiteHeader.tsx` | Add "Editor" nav item |
| `src/app/globals.css` | Mobile responsive rules for editor section |

## Risks
1. **Screenshot content** — Screenshots show Cursor IDE, not Umber. User explicitly said "these pics."
2. **Image weight** — 1.5–2MB PNGs. Optimize to ~400KB each at 1400px wide.
3. **350-LOC ceiling** — All files stay well under.

## Alternatives Considered
- Single long features section with inline images — rejected; editor deserves its own section.
- Full page redesign — rejected; current structure is clean, changes are additive.
- Using screenshots only in the hero — rejected; wastes opportunity for feature-specific visuals.
