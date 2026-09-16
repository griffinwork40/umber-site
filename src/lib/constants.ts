/**
 * Site-wide constants for the Goblin Portal landing page.
 *
 * Hex colour values are drawn verbatim from ThemeValues.swift — the canonical source.
 * This is the ONLY file on the site that may contain hex values; all component files
 * must reference tokens from tokens.css or data from this file.
 */

export const SITE_META = {
  title: 'Goblin Portal',
  tagline: 'The native Mac terminal built for AI agents.',
  description:
    'The native macOS terminal for AI agents — Claude Code, Codex, Hermes, Agent AFK. Swift/AppKit. No Electron.',
  version: 'v0.3.0',
  repoUrl: 'https://github.com/griffinwork40/goblin-portal',
  dmgUrl: 'https://github.com/griffinwork40/goblin-portal/releases/download/v0.3.0/GoblinPortal-v0.3.0.dmg',
  releasesUrl: 'https://github.com/griffinwork40/goblin-portal/releases',
} as const

export interface ReleaseHighlight {
  title: string
  description: string
  configExample?: string
}

export const RELEASE: {
  version: string
  date: string
  highlights: ReleaseHighlight[]
} = {
  version: 'v0.3.0',
  date: 'August 25, 2026',
  highlights: [
    {
      title: 'Community Themes',
      description:
        'Catppuccin Mocha, Nord, and Dracula — ported verbatim from their upstream specs and gated by the contrast harness (474 assertions).',
      configExample: '"preset": "catppuccin-mocha"',
    },
    {
      title: 'Auto Dark / Light',
      description:
        'Follow macOS appearance automatically. Goblin Portal switches between a dark and light palette when System Settings changes.',
      configExample: '"preset": "auto"',
    },
    {
      title: 'Split-Pane Dimming',
      description:
        'Unfocused split panes dim to visually distinguish the active pane. Fully configurable.',
      configExample: '"unfocusedPaneOpacity": 0.85',
    },
    {
      title: 'Typography Controls',
      description:
        'Font dilation for white-on-black text (the same technique Terminal.app uses) and configurable line height.',
      configExample: '"fontThicken": true, "lineHeight": 1.2',
    },
    {
      title: 'Terminal Padding',
      description:
        'Configurable inner margin around terminal content with seamless background color matching.',
      configExample: '"padding": 8',
    },
  ],
}

export interface Feature {
  title: string
  description: string
  icon: string
}

export const FEATURES: Feature[] = [
  {
    title: 'Zero-Overhead Host',
    description:
      'Swift and AppKit — no Electron, no V8, no renderer process. Your agents get the RAM. Launches instantly and stays out of the way.',
    icon: 'apple',
  },
  {
    title: 'Agent Workspaces',
    description:
      'One Space per project root. Multiple agent sessions inside. Switch projects without losing context — real macOS window tabs, not a custom layer.',
    icon: 'tabs',
  },
  {
    title: 'Sidebar File Tree',
    description:
      'Browse files alongside the terminal with git status badges on every row. See what your agent changed without leaving the window.',
    icon: 'sidebar',
  },
  {
    title: 'Measured Themes',
    description:
      'Eight palettes tested for readability — every color verified against contrast standards. Includes Catppuccin Mocha, Nord, and Dracula. Long sessions reading agent output stay legible.',
    icon: 'palette',
  },
  {
    title: 'GPU or CPU Rendering',
    description:
      'Switch between Metal (GPU-accelerated) and Core Text rendering with one config line and ⌘R. High-throughput agent output stays smooth.',
    icon: 'cpu',
  },
  {
    title: 'Agent Status at a Glance',
    description:
      'Background tabs show a green dot when a command succeeds, red when it fails. OSC 133 shell integration — no polling, no tab switching.',
    icon: 'shell',
  },
]

export interface AgentPoint {
  name: string
  description: string
}

export const AGENT_TOOLS: AgentPoint[] = [
  {
    name: 'Claude Code',
    description: 'Anthropic\'s terminal-native coding agent. Runs entirely in your shell.',
  },
  {
    name: 'Codex',
    description: 'OpenAI\'s CLI agent for code generation and multi-file edits.',
  },
  {
    name: 'Agent AFK',
    description: 'Autonomous agent runtime with daemon, Telegram, and REPL surfaces.',
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
    description: 'Bootstrap the vendored SwiftTerm dependency (clones and applies all 7 patches)',
    code: './Scripts/bootstrap-vendor.sh',
    language: 'bash',
  },
  {
    step: 4,
    description: 'Build a release bundle and launch',
    code: './Scripts/make-app-bundle.sh release\nopen build/GoblinPortal.app',
    language: 'bash',
  },
]

export const GATEKEEPER_COMMAND =
  'xattr -dr com.apple.quarantine build/GoblinPortal.app'

export interface KeymapEntry {
  shortcut: string
  description: string
}

export interface KeymapGroup {
  group: string
  entries: KeymapEntry[]
}

export const KEYMAP: KeymapGroup[] = [
  {
    group: 'Spaces & Documents',
    entries: [
      { shortcut: '⌘N', description: 'New Space (window tab)' },
      { shortcut: '⌘T', description: 'New document in current Space' },
      { shortcut: '⌘⇧[', description: 'Previous Space' },
      { shortcut: '⌘⇧]', description: 'Next Space' },
      { shortcut: '⌘⌥←', description: 'Previous document' },
      { shortcut: '⌘⌥→', description: 'Next document' },
      { shortcut: '⌘1–⌘9', description: 'Jump to document by index' },
    ],
  },
  {
    group: 'View & Splits',
    entries: [
      { shortcut: '⌘B', description: 'Toggle sidebar' },
      { shortcut: '⌘⇧\\', description: 'Split pane right' },
      { shortcut: '⌘⇧H/J/K/L', description: 'Focus pane left / down / up / right' },
      { shortcut: '⌃⌘F', description: 'Full screen' },
      { shortcut: '⌘R', description: 'Reload config' },
      { shortcut: '⌘,', description: 'Open Settings' },
    ],
  },
  {
    group: 'Font Size',
    entries: [
      { shortcut: '⌘+', description: 'Zoom in (persists across tabs and relaunches)' },
      { shortcut: '⌘-', description: 'Zoom out' },
      { shortcut: '⌘0', description: 'Reset zoom to config font.size' },
    ],
  },
  {
    group: 'Line Editing',
    entries: [
      { shortcut: '⌘⌫', description: 'Delete to start of line (^U)' },
      { shortcut: '⌘⌦', description: 'Delete to end of line (^K)' },
      { shortcut: '⌘←', description: 'Jump to start of line (^A)' },
      { shortcut: '⌘→', description: 'Jump to end of line (^E)' },
      { shortcut: '⌥←', description: 'Jump back one word' },
      { shortcut: '⌥→', description: 'Jump forward one word' },
    ],
  },
]

export interface EditorFeature {
  title: string
  description: string
  icon: string
}

export const EDITOR_FEATURES: EditorFeature[] = [
  {
    title: 'Syntax Highlighting',
    description:
      '23 languages out of the box — Swift, TypeScript, Python, Rust, Go, Markdown, and more. Tree-sitter grammars with scope-aware token coloring.',
    icon: 'syntax',
  },
  {
    title: 'Command Palette & Symbols',
    description:
      '⌘⇧P fuzzy-filters every app command. ⌘⇧O jumps to symbols. ⌘L goes to a line number. All keyboard-driven, no mouse required.',
    icon: 'command',
  },
  {
    title: 'Code Folding & Navigation',
    description:
      'Indent-based fold and unfold with ⌘⌥[ and ⌘⌥]. Sticky scroll keeps the enclosing scope visible. Bracket pair highlighting.',
    icon: 'fold',
  },
  {
    title: 'Multi-Cursor Editing',
    description:
      '⌘D selects the next occurrence. Full multi-cursor support for parallel edits across a file — the same muscle memory as VS Code.',
    icon: 'cursor',
  },
]

export interface ShowcaseItem {
  title: string
  description: string
  bullets: string[]
  image: string
  imageAlt: string
}

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    title: 'Agent workspaces in action',
    description:
      'Each project gets its own Space with a full file tree, git status, and as many terminal tabs as you need. Your agents see the same directory structure you do.',
    bullets: [
      'Sidebar follows the focused shell\'s working directory automatically',
      'Git status badges on every file — staged, modified, untracked, deleted',
      'Double-click any file to open it in the built-in editor',
    ],
    image: '/images/goblin-portal-workspace.png',
    imageAlt: 'Goblin Portal workspace showing a project file tree with multiple terminal tabs and git status indicators',
  },
  {
    title: 'Edit without leaving the terminal',
    description:
      'Open files from the sidebar directly into a syntax-highlighted editor tab. Review what your agent wrote, make a quick fix, and get back to the terminal — no app switching.',
    bullets: [
      'Syntax highlighting for 23 languages with tree-sitter grammars',
      'Line numbers, indent guides, and a column guide at 80 characters',
      'Auto-indent, bracket matching, and indent-rainbow coloring',
    ],
    image: '/images/goblin-portal-editor.png',
    imageAlt: 'Goblin Portal editor tab showing syntax-highlighted TypeScript alongside the terminal',
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
 * Eight theme palettes, hex values verbatim from ThemeValues.swift.
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
]
