/**
 * Site-wide constants for the Goblin Portal landing page.
 *
 * Hex colour values are drawn verbatim from ThemeValues.swift (the canonical source).
 * This is the ONLY file on the site that may contain hex values; all component files
 * must reference tokens from tokens.css or data from this file.
 *
 * Demo transcript, release notes, keymap and editor data live in sibling files
 * (demo.ts, release.ts, keymap.ts, editor.ts) and are re-exported below so every
 * import of '@/lib/constants' keeps working. Split to stay under the 350-LOC limit.
 */

export {
  DEMO_TRANSCRIPT,
  PROOF_POINTS,
} from './demo'
export type { TranscriptSegment, TranscriptLine } from './demo'
import { ASSERTION_COUNT } from './demo'
export { ASSERTION_COUNT }

export const SITE_META = {
  siteUrl: 'https://goblinportal.app',
  title: 'Goblin Portal',
  seoTitle: 'Goblin Portal: a Mac terminal for AI agents',
  tagline: 'A Mac terminal that takes AI agents seriously.',
  description:
    'A native macOS terminal for AI agents. Run Claude Code, Codex, Hermes and Agent AFK in Swift and AppKit, not Electron. Free and MIT licensed.',
  // source: v1.12.0 release assets (GoblinPortal-v1.12.0.dmg = 2,594,612 bytes; binary is arm64-only,
  // LSMinimumSystemVersion 14.0; Developer ID signed + notarized + stapled, checked with spctl/stapler)
  downloadSize: '2.5 MB',
  requirements: 'macOS 14+ · Apple silicon',
  license: 'MIT',
  version: 'v1.12.0',
  repoUrl: 'https://github.com/griffinwork40/goblin-portal',
  dmgUrl: 'https://github.com/griffinwork40/goblin-portal/releases/download/v1.12.0/GoblinPortal-v1.12.0.dmg',
  releasesUrl: 'https://github.com/griffinwork40/goblin-portal/releases',
} as const

export { RELEASE } from './release'
export type { ReleaseHighlight } from './release'
export { KEYMAP } from './keymap'
export type { KeymapEntry, KeymapGroup } from './keymap'
export { EDITOR_FEATURES, SHOWCASE_ITEMS } from './editor'
export type { EditorFeature, ShowcaseItem } from './editor'

export interface Feature {
  title: string
  description: string
  icon: string
}

export const FEATURES: Feature[] = [
  {
    title: 'Zero-Overhead Host',
    description:
      'Swift and AppKit. No Electron, no V8, no renderer process. The RAM your terminal was quietly consuming goes back to your agent.',
    icon: 'apple',
  },
  {
    title: 'Agent Workspaces',
    description:
      'One Space per project, as many agent sessions inside as you like. Real macOS window tabs, not a reimplemented version of them, and every Space reopens where you left it.',
    icon: 'tabs',
  },
  {
    // source: Renderer.swift (default .metal since v1.5); vendored patch 0010 (display-link pacing)
    title: 'Metal by Default',
    description:
      'GPU rendering out of the box, paced to the display instead of a free-running timer, so a 60 fps spinner actually gets 60 frames. Core Text is one config line away.',
    icon: 'cpu',
  },
  {
    // source: SmoothScroll.swift / SmoothScrollModel.swift (v1.5.0)
    title: 'Scrolls Like a Mac App',
    description:
      'Pixel-smooth trackpad scrolling with real momentum, carried by the OS events rather than a homemade timer. Ten thousand lines of agent output feel like a web page, not a slideshow.',
    icon: 'shell',
  },
  {
    // source: PreferencesWindow.swift (PR #69); ⌘R live reload (AppDelegate.swift)
    title: 'Settings, Both Ways',
    description:
      'A real Settings window on ⌘, that writes plain JSON, and ⌘R reloads either one live. Click or edit, whichever you trust more.',
    icon: 'command',
  },
]

export interface AgentPoint {
  name: string
  description: string
}

export const AGENT_TOOLS: AgentPoint[] = [
  {
    name: 'Agent AFK',
    description: 'Autonomous agent runtime with daemon, Telegram, and REPL surfaces.',
  },
  {
    name: 'Claude Code',
    description: 'Anthropic\'s terminal-native coding agent. Runs entirely in your shell.',
  },
  {
    name: 'Codex',
    description: 'OpenAI\'s CLI agent for code generation and multi-file edits.',
  },
  {
    name: 'Hermes',
    description: 'Terminal agent framework with tool use and conversation memory.',
  },
]

export interface InstallStep {
  step: number
  description: string
  code: string
  language: string
}

export const INSTALL_STEPS: InstallStep[] = [
  {
    step: 1,
    description: 'Clone the repository',
    code: 'git clone https://github.com/griffinwork40/goblin-portal.git',
    language: 'bash',
  },
  {
    step: 2,
    description: 'Enter the app directory',
    code: 'cd goblin-portal/app',
    language: 'bash',
  },
  {
    step: 3,
    description: 'Bootstrap the vendored SwiftTerm dependency (clones and applies all 12 patches)',
    code: './Scripts/bootstrap-vendor.sh',
    language: 'bash',
  },
  {
    step: 4,
    description: 'Build a release bundle and launch',
    code: './Scripts/make-app-bundle.sh release\nopen "build/Goblin Portal.app"',
    language: 'bash',
  },
]

export interface ThemePalette {
  name: string
  displayName: string
  background: string
  foreground: string
  cursor: string
  selection: string
  ansi: string[]
  isDefault: boolean
}

/**
 * Ten theme palettes, hex values verbatim from ThemeValues.swift
 * (Gruvbox Dark and Rosé Pine from ThemeValues+CommunityPresets.swift).
 * This is the canonical source on the site for all theme colours.
 */
export const THEMES: ThemePalette[] = [
  {
    name: 'classic-repaired',
    displayName: 'Classic Repaired',
    background: '#000000',
    foreground: '#CBCCCD',
    cursor: '#A1A8FD',
    selection: '#262952',
    ansi: [
      '#000000', '#C23621', '#25BC24', '#ADAD27',
      '#818AFC', '#D338D3', '#33BBC8', '#CBCCCD',
      '#818383', '#FC391F', '#31E722', '#EAEC23',
      '#A1A8FD', '#F935F8', '#14F0F0', '#FFFFFF',
    ],
    isDefault: false,
  },
  {
    name: 'umber',
    displayName: 'Umber',
    background: '#19120D',
    foreground: '#E5DFD6',
    cursor: '#FF9B5A',
    selection: '#453021',
    ansi: [
      '#342C26', '#EF7F74', '#8AE49E', '#D7AA32',
      '#739EF0', '#FFACE9', '#42CBC8', '#D3CDC5',
      '#AAA19B', '#FDAAA0', '#B4FCC3', '#F7D179',
      '#9DBEFC', '#FFD2F2', '#80E5E2', '#F9F6F2',
    ],
    isDefault: true,
  },
  {
    name: 'afk-dark',
    displayName: 'AFK Dark',
    background: '#0D1117',
    foreground: '#C9D1D9',
    cursor: '#E67E4C',
    selection: '#264F78',
    ansi: [
      '#161B22', '#F85149', '#9CB04A', '#E5C07B',
      '#5BA8FF', '#9F7CE0', '#56B5A8', '#C9D1D9',
      '#484F58', '#F85149', '#A8E060', '#E67E4C',
      '#5BA8FF', '#F08AC4', '#5FE0C0', '#ECEFF4',
    ],
    isDefault: false,
  },
  {
    name: 'afk-light',
    displayName: 'AFK Light',
    background: '#FFFFFF',
    foreground: '#1F2328',
    cursor: '#0969DA',
    selection: '#B6E3FF',
    ansi: [
      '#24292F', '#CF222E', '#116329', '#4D2D00',
      '#0969DA', '#8250DF', '#1B7C83', '#6E7781',
      '#57606A', '#A40E26', '#1A7F37', '#633C01',
      '#218BFF', '#A475F9', '#3192AA', '#8C959F',
    ],
    isDefault: false,
  },
  {
    name: 'tokyo-night',
    displayName: 'Tokyo Night',
    background: '#1A1B26',
    foreground: '#C0CAF5',
    cursor: '#C0CAF5',
    selection: '#283457',
    ansi: [
      '#15161E', '#F7768E', '#9ECE6A', '#E0AF68',
      '#7AA2F7', '#BB9AF7', '#7DCFFF', '#A9B1D6',
      '#414868', '#F7768E', '#9ECE6A', '#E0AF68',
      '#7AA2F7', '#BB9AF7', '#7DCFFF', '#C0CAF5',
    ],
    isDefault: false,
  },
  {
    name: 'catppuccin-mocha',
    displayName: 'Catppuccin Mocha',
    background: '#1E1E2E',
    foreground: '#CDD6F4',
    cursor: '#F5E0DC',
    selection: '#45475A',
    ansi: [
      '#45475A', '#F38BA8', '#A6E3A1', '#F9E2AF',
      '#89B4FA', '#F5C2E7', '#94E2D5', '#BAC2DE',
      '#585B70', '#F38BA8', '#A6E3A1', '#F9E2AF',
      '#89B4FA', '#F5C2E7', '#94E2D5', '#A6ADC8',
    ],
    isDefault: false,
  },
  {
    name: 'nord',
    displayName: 'Nord',
    background: '#2E3440',
    foreground: '#D8DEE9',
    cursor: '#D8DEE9',
    selection: '#434C5E',
    ansi: [
      '#3B4252', '#BF616A', '#A3BE8C', '#EBCB8B',
      '#81A1C1', '#B48EAD', '#88C0D0', '#E5E9F0',
      '#4C566A', '#BF616A', '#A3BE8C', '#EBCB8B',
      '#81A1C1', '#B48EAD', '#8FBCBB', '#ECEFF4',
    ],
    isDefault: false,
  },
  {
    name: 'dracula',
    displayName: 'Dracula',
    background: '#282A36',
    foreground: '#F8F8F2',
    cursor: '#F8F8F2',
    selection: '#44475A',
    ansi: [
      '#21222C', '#FF5555', '#50FA7B', '#F1FA8C',
      '#BD93F9', '#FF79C6', '#8BE9FD', '#F8F8F2',
      '#6272A4', '#FF6E6E', '#69FF94', '#FFFFA5',
      '#D6ACFF', '#FF92DF', '#A4FFFF', '#FFFFFF',
    ],
    isDefault: false,
  },
  {
    name: 'gruvbox-dark',
    displayName: 'Gruvbox Dark',
    background: '#282828',
    foreground: '#EBDBB2',
    cursor: '#EBDBB2',
    selection: '#665C54',
    ansi: [
      '#282828', '#CC241D', '#98971A', '#D79921',
      '#458588', '#B16286', '#689D6A', '#A89984',
      '#928374', '#FB4934', '#B8BB26', '#FABD2F',
      '#83A598', '#D3869B', '#8EC07C', '#EBDBB2',
    ],
    isDefault: false,
  },
  {
    name: 'rose-pine',
    displayName: 'Rosé Pine',
    background: '#191724',
    foreground: '#E0DEF4',
    cursor: '#E0DEF4',
    selection: '#403D52',
    ansi: [
      '#26233A', '#EB6F92', '#31748F', '#F6C177',
      '#9CCFD8', '#C4A7E7', '#EBBCBA', '#E0DEF4',
      '#6E6A86', '#EB6F92', '#31748F', '#F6C177',
      '#9CCFD8', '#C4A7E7', '#EBBCBA', '#E0DEF4',
    ],
    isDefault: false,
  },
]
