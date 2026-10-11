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
  version: 'v1.12.2',
  date: 'October 11, 2026',
  highlights: [
    {
      // source: goblin-portal #206 (feat: sidebar follows tmux, honest over ssh, guarded typing, async tree, v1.12.0)
      title: 'The Sidebar Follows tmux and ssh',
      description:
        'The sidebar now follows your active tmux pane through window switches, pane switches and cd. Over ssh it pauses and names the remote host instead of guessing, and a remote path is never opened as a local one. Insert Path, cd Here and the other shell-directed actions refuse to type into vim, an agent REPL or an ssh session.',
    },
    {
      // source: goblin-portal #202 (close confirmation, exited shell keeps tab, Dock attention, v1.11.0), #203 (5000-line scrollback, v1.11.0), #208 (restart in the right directory, v1.12.2)
      title: 'Never Lose Agent Output',
      description:
        'Closing a tab, a split, a window or the app with a running process now asks first, once, naming the jobs. A shell that exits keeps its tab and scrollback, says why it exited, and Return starts a fresh shell in the same directory, even after cd X && exec cmd. A bell or notification from a background tab bounces the Dock and badges it. Default scrollback is now 5,000 lines, up from 1,000.',
    },
    {
      // source: goblin-portal #153 (ligatures, v1.10.0), #151 (combining marks, v1.10.0), #152 (fontThicken, v1.10.0)
      title: 'Ligature Control and CJK Rendering',
      description:
        'Set "ligatures": false in config.json to stop fonts like JetBrains Mono from joining -> and =>, in both renderers. Combining marks after wide CJK characters now draw over the character they belong to. The Font Thicken control left Settings, because it has no effect on macOS 15 and later.',
    },
    {
      // source: goblin-portal #166 T1.5 (config-warnings banner, v1.9.0, a9d41188), #211 (NSLocalNetworkUsageDescription, v1.12.1)
      title: 'Config Errors You Can See, and LAN Access',
      description:
        'A mistake in config.json now shows a banner in the window, so a launch from Finder or the Dock no longer ignores your settings in silence. Programs you run in the terminal can reach your local network instead of being quietly denied.',
    },
  ],
}
