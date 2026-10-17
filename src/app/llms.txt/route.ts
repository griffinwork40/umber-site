/**
 * Route handler for /llms.txt.
 *
 * Replaces the static public/llms.txt so the version and download URL always
 * reflect the latest GitHub release without a manual file edit.
 *
 * NOTE: The text refers to "474 contrast assertions" — that figure came from
 * an older check script and has not been reverified against the current suite.
 * It is left as-is to avoid introducing new inaccuracies; update it when the
 * theme coverage numbers are re-measured.
 */

import { getLatestRelease } from '@/lib/latest-release'
import { SITE_META } from '@/lib/constants'

export const revalidate = 600

export async function GET() {
  const release = await getLatestRelease()

  const body = `# Goblin Portal

> A native macOS terminal built for AI agents. Swift/AppKit. No Electron.

Goblin Portal is a macOS terminal designed for running AI coding agents. Built with Swift and AppKit, it delivers native performance without Electron overhead. Agent workspaces, a sidebar file tree with git status, measured themes verified across 474 contrast assertions, GPU or CPU rendering, and a built-in editor with 23-language syntax highlighting. Current version: ${release.version} (${new Date(release.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}).

## Product

- [Homepage](${SITE_META.siteUrl}): Feature overview, install instructions, and theme previews
- [Download ${release.version} DMG](${release.dmgUrl}): macOS installer
- [All Releases](${SITE_META.releasesUrl}): Release history and changelogs

## Source

- [GitHub Repository](${SITE_META.repoUrl}): Source code, issues, and contributions

## Agents Supported

- [Agent AFK](https://github.com/griffinwork40/agent-afk): Autonomous agent runtime with daemon, Telegram, and REPL surfaces
- Claude Code: Anthropic's terminal-native coding agent
- Codex: OpenAI's CLI agent for code generation and multi-file edits
- Hermes: Terminal agent framework with tool use and conversation memory

## Optional

- [llms-full.txt](${SITE_META.siteUrl}/llms-full.txt): Expanded reference with all features, keyboard shortcuts, themes, and install steps
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
    },
  })
}
