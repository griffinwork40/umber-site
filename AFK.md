# Umber Site

Landing page for [Umber](https://github.com/griffinwork40/umber), a native macOS terminal built for AI agents. Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS. Deployed on Vercel.

Single-page marketing site — hero, feature showcase, theme preview, editor section, install steps, keymap reference, and footer. No backend, no API routes.

## Commands

```bash
pnpm dev          # Next.js dev server
pnpm build        # Production build
pnpm start        # Serve production build
pnpm lint         # ESLint (src/**/*.{ts,tsx})
pnpm test         # Vitest (watch mode)
pnpm test:run     # Vitest (single run)
pnpm tsc          # Type-check (no emit)
```

## Architecture

| Path | Purpose |
|---|---|
| `src/app/layout.tsx` | Root layout — metadata, skip-nav, viewport |
| `src/app/page.tsx` | Single page — composes all sections top-to-bottom |
| `src/app/globals.css` | Reset, base styles, mobile responsive overrides |
| `src/components/` | Section components, one directory per section |
| `src/components/ui/` | Shared primitives — Badge, Button, CodeBlock, TerminalMockup |
| `src/lib/constants.ts` | **All site data** — features, themes, keymap, install steps, meta. Hex colours are from `ThemeValues.swift` in the Umber app repo |
| `src/styles/tokens.css` | Design tokens (colours, spacing, radii, fonts, motion) |
| `src/styles/signature.css` | Visual signature system — signal-field, earned-path, scope-rule, contour/elevated fields |
| `src/test/setup.ts` | Vitest setup (jsdom + testing-library) |
| `public/images/` | Product screenshots and app icon |

### Section components

Each section lives in its own directory under `src/components/`:

`header/` → `hero/` → `agents/` → `features/` → `editor/` → `themes/` → `install/` → `keymap/` → `footer/`

Tests are colocated: `FeaturesSection.test.tsx` sits next to `FeaturesSection.tsx`.

## Conventions

- **No hex values in component files.** All colours come from CSS custom properties in `tokens.css` or Tailwind `umber-*` classes. The only file that may contain hex is `lib/constants.ts` (theme palettes sourced from `ThemeValues.swift`).
- **CSS custom properties for design tokens**, extended into Tailwind via `tailwind.config.ts`. Components use `var(--token)` in inline styles or `umber-*` Tailwind classes.
- **Inline styles over utility classes** for layout — `React.CSSProperties` objects. Media queries live in `globals.css` as responsive utility classes (Tailwind can't express all breakpoint overrides inline).
- **Signature CSS classes** (`signal-field`, `earned-path`, `scope-rule`, `deep-field`, `elevated-field`, `contour-layer`, `contour-frame`) are pure CSS — no JS, no images.
- **`@/*` path alias** maps to `./src/*` (tsconfig + vitest).
- **Strict TypeScript** — `strict: true` in tsconfig.
- **`prefers-reduced-motion`** respected — motion tokens go to `0ms`/`0s`.
- Images are unoptimized (`next.config.mjs`) for static export compatibility.
