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
    // source: SourceControlViewController.swift (+Actions), PR #132; ⌃⇧G AppMenu.swift:306-308
    title: 'Source Control',
    description:
      '⌃⇧G opens a real Source Control panel: stage, unstage, discard (it asks first), commit with ⌘Enter, push and pull. A first push sets the upstream for you.',
    icon: 'sidebar',
  },
  {
    // source: DiffViewerPane.swift, DiffViewerPane+Highlighting.swift
    title: 'Side-by-Side Diffs',
    description:
      'Click a changed file and get a side-by-side diff with synchronized scrolling. The agent\'s work, laid out for judgment.',
    icon: 'fold',
  },
  {
    // source: FileViewerPane+Highlighting.swift:7-17, SyntaxLanguage.swift (23 groups)
    title: 'Syntax Highlighting',
    description:
      '23 languages from a regex tokenizer, not tree-sitter. It may mis-color a raw string literal. It will never ship a grammar binary nobody can read.',
    icon: 'syntax',
  },
  {
    // source: CommandPalette.swift, SymbolOutline.swift, FileViewerPane+Navigation.swift, +MultiSelect.swift
    title: 'Palette, Symbols, Multi-Cursor',
    description:
      '⌘⇧P for every command, ⌘⇧O for symbols, ⌘L for a line, ⌘D for the next occurrence. Same muscle memory as VS Code, without VS Code.',
    icon: 'command',
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
    // source: ShellDirectory.swift (kernel cwd), FileTreeViewController+FileOps.swift,
    // FileOperationPolicy.swift, SpaceViewController+FileMutation.swift (v1.7.0)
    title: 'The sidebar does the bookkeeping',
    description:
      'The file tree follows the focused shell\'s working directory by asking the kernel, so no dotfile can break it. Git status on every row, branch and ahead/behind on top.',
    bullets: [
      'New file, rename, move and duplicate, all inline',
      'Move to Trash always asks first, and nothing is ever deleted outright',
      'Open tabs follow a rename or a move, and a tab with unsaved changes is never closed',
    ],
    image: '/images/goblin-portal-workspace.png',
    imageAlt: 'Goblin Portal workspace showing a project file tree with multiple terminal tabs and git status indicators',
  },
  {
    title: 'Edit without leaving the terminal',
    description:
      'Open a file into an editor tab next to your terminals. Review what your agent wrote, make the fix, get back to work.',
    bullets: [
      'Syntax highlighting for 23 languages, no grammar bundles',
      'Line numbers, indent guides, and a column guide at 80 characters',
      'Auto-indent, bracket matching, and indent-rainbow coloring',
    ],
    image: '/images/goblin-portal-editor.png',
    imageAlt: 'Goblin Portal editor tab showing syntax-highlighted TypeScript alongside the terminal',
  },
]
