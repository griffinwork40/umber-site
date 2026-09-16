/**
 * Site-wide constants for the Goblin Portal landing page.
 *
 * Hex colour values are drawn verbatim from ThemeValues.swift (the canonical source).
 * This is the ONLY file on the site that may contain hex values; all component files
 * must reference tokens from tokens.css or data from this file.
 */

export const SITE_META = {
  title: 'Goblin Portal',
  tagline: 'A Mac terminal that takes AI agents seriously.',
  description:
    'The native macOS terminal for AI agents. Claude Code, Codex, Hermes, Agent AFK. Swift/AppKit. No Electron.',
  version: 'v1.1.0',
  repoUrl: 'https://github.com/griffinwork40/goblin-portal',
  dmgUrl: 'https://github.com/griffinwork40/goblin-portal/releases/download/v1.1.0/GoblinPortal-v1.1.0.dmg',
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
  version: 'v1.1.0',
  date: 'September 16, 2026',
  highlights: [
    {
      title: '$EDITOR Support',
      description:
        'GoblinPortal --wait opens a file and blocks until you close it. Set EDITOR="GoblinPortal --wait" and use Goblin Portal with git commit, crontab -e, and any tool that honors $EDITOR.',
      configExample: 'EDITOR="GoblinPortal --wait"',
    },
    {
      title: 'Vertical Splits',
      description:
        '⌘⇧- splits the current pane down. Up to 4 panes per tab. ⌘⇧H/J/K/L moves focus between them. Fully wired in the v2 architecture.',
      configExample: undefined,
    },
    {
      title: 'SwiftTerm Engine',
      description:
        'Ghostty removed. SwiftTerm is the sole rendering engine — smaller binary, simpler codebase, one rendering path to maintain.',
      configExample: undefined,
    },
    {
      title: 'New Icon',
      description:
        'Acid-green >_ on dark blue-purple with a layered portal bloom: tight green inner glow and a magenta outer halo. The warm-ember Umber icon is retired.',
      configExample: undefined,
    },
    {
      title: 'Full Goblin Portal Rename',
      description:
        'The app was formerly called Umber. v1.1.0 completes the rename with UserDefaults migration — existing preferences carry over automatically.',
      configExample: undefined,
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
      'Swift and AppKit. No Electron, no V8, no renderer process. The RAM your terminal was quietly consuming goes back to your agent.',
    icon: 'apple',
  },
  {
    title: 'Agent Workspaces',
    description:
      'One Space per project root. Multiple agent sessions inside. Switch projects without losing context. Real macOS window tabs, not a reimplemented version of them.',
    icon: 'tabs',
  },
  {
    title: 'Sidebar File Tree',
    description:
      'Browse files alongside the terminal with git status badges on every row. See what your agent changed without opening a second app.',
    icon: 'sidebar',
  },
  {
    title: 'Measured Themes',
    description:
      'Eight built-in palettes, each verified against contrast standards across 474 assertions. Catppuccin Mocha, Nord, Dracula, and more. All of them legible.',
    icon: 'palette',
  },
  {
    title: 'SwiftTerm Rendering',
    description:
      'One engine, not two. SwiftTerm drives every terminal pane — Metal GPU-accelerated or Core Text, toggled with one config line and ⌘R. Smaller binary, one rendering path to maintain.',
    icon: 'cpu',
  },
  {
    title: 'Agent Status at a Glance',
    description:
      'Green dot when a command succeeds, red when it fails. OSC 133 shell integration does the tracking. No polling, no tab switching, no guessing.',
    icon: 'shell',
  },
  {
    title: '$EDITOR Support',
    description:
      'GoblinPortal --wait opens a file and blocks until you close it. Set EDITOR="GoblinPortal --wait" to use Goblin Portal with git commit, crontab -e, and any tool that respects $EDITOR.',
    icon: 'wait',
  },
  {
    title: 'Vertical Splits',
    description:
      '⌘⇧- splits down. ⌘⇧\\ splits right. Up to 4 panes per tab. ⌘⇧H/J/K/L moves focus. Split your agent sessions without opening a second window.',
    icon: 'split',
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
      { shortcut: '⌘1-⌘9', description: 'Jump to document by index' },
    ],
  },
  {
    group: 'View & Splits',
    entries: [
      { shortcut: '⌘B', description: 'Toggle sidebar' },
      { shortcut: '⌘⇧\\', description: 'Split pane right' },
      { shortcut: '⌘⇧-', description: 'Split pane down' },
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
      '23 languages out of the box. Swift, TypeScript, Python, Rust, Go, Markdown, and more. Tree-sitter grammars with scope-aware token coloring.',
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
      '⌘D selects the next occurrence. Full multi-cursor support for parallel edits across a file. Same muscle memory as VS Code, without VS Code.',
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
      'Git status badges on every file: staged, modified, untracked, deleted',
      'Double-click any file to open it in the built-in editor',
    ],
    image: '/images/goblin-portal-workspace.png',
    imageAlt: 'Goblin Portal workspace showing a project file tree with multiple terminal tabs and git status indicators',
  },
  {
    title: 'Edit without leaving the terminal',
    description:
      'Open files from the sidebar directly into a syntax-highlighted editor tab. Review what your agent wrote, make a quick fix, get back to work.',
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
