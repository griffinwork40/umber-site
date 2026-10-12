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
  version: 'v1.13.0',
  date: 'October 11, 2026',
  highlights: [
    {
      // source: goblin-portal #227 (T2.5, NotificationPermissionPolicy.swift, check-notification-permission.sh, v1.13.0)
      title: 'No Permission Prompt at Launch',
      description:
        'Goblin Portal no longer asks for notification permission the moment it opens. It asks the first time it has something to tell you: a long command finishing in a background tab, or a notification from a tool running in the terminal. The notification that triggered the request is still delivered once you allow it. Dock bounces and badges never needed permission and work either way.',
    },
    {
      // source: goblin-portal #224 (DirectoryListing.sorted, FileTreeViewController+Loading.swift, check-child-sorting.sh, v1.13.0)
      title: 'Sorting Moved Off the Main Thread',
      description:
        'When the sidebar reloads a folder in the background, it now sorts the entries in the background as well, so the main thread only has to show the result. Folders still come first, hidden files still come last, and expanded folders and your selection survive the reload.',
    },
    {
      // source: goblin-portal #226 (TmuxDirectory.swift socket uid check, GOBLIN_PORTAL_DIAG nil reasons, closes #209, v1.13.0)
      title: 'Safer tmux Following',
      description:
        'The sidebar now only follows tmux servers whose socket belongs to you, so a socket left by another user in a shared directory is ignored. When following pauses, launching from a terminal with GOBLIN_PORTAL_DIAG=1 prints the reason, for example a tmux started with its own -S socket.',
    },
  ],
}
