# Goblin Portal Site

Landing page for [Goblin Portal](https://github.com/griffinwork40/goblin-portal), a native macOS terminal built for AI agents.

Built with Next.js 14 (App Router), React 18, TypeScript, and Tailwind CSS. Deployed on Vercel.

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm test:run     # run tests once
pnpm tsc          # type-check
pnpm lint         # eslint
```

## Structure

Single-page marketing site: hero, features, agent section, editor showcase, theme previews, install steps, keymap reference, and footer.

All site data (features, themes, install steps, metadata) lives in `src/lib/constants.ts`. Design tokens are in `src/styles/tokens.css`. No backend, no API routes.

## Icon Generation

The app icon is procedurally generated with Pillow (no design tool needed):

```bash
python3 scripts/make-goblin-icon.py                # regenerate icon-1024.png
python3 scripts/make-goblin-icon.py --favicons     # + full favicon set
python3 scripts/make-goblin-icon.py --variant prompt  # >_ glyph variant
```

## License

MIT
