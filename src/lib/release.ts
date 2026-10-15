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
  version: 'v1.14.1',
  date: 'October 15, 2026',
  highlights: [
    {
      // source: goblin-portal #238 (fix: Return confirms the close alert, v1.14.1)
      title: 'Return Closes — Not Cancels',
      description:
        '⌘W on a tab or window running a process asks you to confirm. Pressing Return (or Enter) now closes it. Previously the default button was Cancel, so Enter did nothing useful. Escape still cancels.',
    },
  ],
}
