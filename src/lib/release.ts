/**
 * Release highlights for the current Goblin Portal version.
 * Re-exported from src/lib/constants.ts; split out to keep that file under the 350-LOC limit.
 */

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
  version: 'v1.7.0',
  date: 'October 6, 2026',
  highlights: [
    {
      title: 'VS Code-Style File Management',
      description:
        'The sidebar now manages files, not just displays them. New File and New Folder with inline naming, inline rename via Return or F2 (including case-only renames), Move to Trash via ⌘⌫ behind a confirmation, drag-to-move within the tree, and Cut / Copy / Paste / Duplicate — all without ever silently overwriting a file.',
    },
    {
      title: 'Source Control Gets Its Own Tab',
      description:
        'The sidebar now has an Explorer / Source Control switcher. ⌘⇧E opens the file tree; ⌃⇧G opens Source Control. The tab is absent outside a git repo, so it only appears when it is useful.',
    },
    {
      title: 'Open Tabs Follow Renames and Moves',
      description:
        'Renaming, moving, or trashing a file updates every open editor tab that was pointing at it. A tab with unsaved changes is never silently lost: it stays open and Goblin Portal tells you where the file went.',
    },
  ],
}
