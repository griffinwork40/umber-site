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
      // source: goblin-portal #206 (feat: sidebar follows tmux, honest over ssh, guarded typing, async tree — v1.12.0)
      title: 'The Sidebar Follows tmux and ssh',
      description:
        'The directory sidebar now tracks your active tmux pane and stays honest over ssh, showing the remote path when it can read it and nothing when it cannot. Typing actions are guarded so keystrokes never go to a process that is not the shell.',
    },
    {
      // source: goblin-portal #202 (close confirmation, exited shell keeps tab, Dock attention — v1.11.0), #203 (5000-line scrollback — v1.11.0)
      title: 'Never Lose Agent Output',
      description:
        'Closing a tab with a running process now asks first. An exited shell keeps its tab and scrollback so you can read the output before it disappears. Goblin Portal bounces the Dock icon when a long-running agent finishes in the background. Default scrollback raised from 1,000 to 5,000 lines.',
    },
    {
      // source: goblin-portal #153 (ligatures — v1.10.0), #151 (combining marks — v1.10.0), #152 (fontThicken — v1.10.0)
      title: 'Ligature Control and Rendering Fixes',
      description:
        'Set "ligatures": false in config.json to stop fonts like JetBrains Mono from joining -> and =>. Combining marks after wide CJK characters now land over the right cell. The font-thicken setting is gone on macOS 15 where it was already a no-op.',
    },
    {
      // source: goblin-portal #214 (prefer kernel cwd over stale OSC 7 — v1.12.2), #211 (NSLocalNetworkUsageDescription — v1.12.1), #216 (honest fontThicken warning — v1.12.2)
      title: 'Directory Follow and LAN Access Fixes',
      description:
        'Directory follow now prefers the kernel-resolved working directory over a stale shell OSC 7 report, so cd X && cmd no longer leaves the sidebar pointing at the wrong folder. Programs run in the terminal can now reach the local network without a silent denial.',
    },
  ],
}
