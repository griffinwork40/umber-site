/**
 * Keyboard shortcut reference.
 * Source: goblin-portal app/Sources/GoblinPortal/KeyBindings.swift, AppMenu.swift, AppMenu+Window.swift and
 * AppMenu+Navigate.swift (v1.12.0).
 * Re-exported from src/lib/constants.ts; split out to keep that file under the 350-LOC limit.
 */

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
      { shortcut: '⌘⇧A', description: 'Choose window: fuzzy-search every Space and tab' },
      { shortcut: '⌘⇧P', description: 'Command palette: every menu action, searchable' },
      { shortcut: '⌘K', description: 'Clear buffer: screen and scrollback of the focused pane' },
    ],
  },
  {
    group: 'View & Splits',
    entries: [
      { shortcut: '⌘B', description: 'Toggle sidebar' },
      { shortcut: '⌘⇧E', description: 'Show Explorer (file tree)' },
      { shortcut: '⌃⇧G', description: 'Show Source Control' },
      { shortcut: '⌘⇧\\', description: 'Split pane right' },
      { shortcut: '⌘⇧-', description: 'Split pane down' },
      { shortcut: '⌘⇧H/J/K/L', description: 'Focus pane left / down / up / right' },
      { shortcut: '⌃⌘F', description: 'Full screen' },
      { shortcut: '⌘R', description: 'Reload config' },
      { shortcut: '⌘,', description: 'Open Settings' },
      { shortcut: '⌘M', description: 'Minimize window' },
      { shortcut: '⌥⌘H', description: 'Hide other apps' },
      { shortcut: '⌘?', description: 'Help (opens the README)' },
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
