/**
 * Editor and workspace showcase data.
 * Re-exported from src/lib/constants.ts; split out to keep that file under the 350-LOC limit.
 */

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
