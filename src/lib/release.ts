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
  version: 'v1.12.0',
  date: 'October 10, 2026',
  highlights: [
    {
      // source: goblin-portal #206 (ShellDirectory.swift, SidebarViewController+Directory.swift)
      title: 'The Sidebar Follows the Right Folder',
      description:
        'With tmux, the sidebar tracks the active pane directory through window and pane switches. Over ssh or mosh it stops following and shows a quiet note ("remote: host" or "following paused") instead of opening a remote path locally. A remote OSC 7 report is never treated as a local path.',
    },
    {
      // source: goblin-portal #206 (TerminalActions.swift, SidebarViewController+Actions.swift)
      title: 'Typing Actions Only Work in a Shell',
      description:
        'Insert Path, cd Here, Send Path (⌘⇧C), and Run in Terminal (⌘⇧R) now check what is in front before sending. If vim, an agent, ssh, or a script is running, they refuse with a beep. Send Path and Run in Terminal also grey out in the menu.',
    },
    {
      // source: goblin-portal #206, closes #158 (FileTreeViewController+Refresh.swift)
      title: 'No Empty Frame on cd',
      description:
        'The file tree lists folders off the main thread. The previous tree stays on screen until the new listing lands, so there is no empty frame when you change directory. A reveal requested mid-load is queued, not lost.',
    },
  ],
}
