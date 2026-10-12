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
  version: 'v1.14.0',
  date: 'October 12, 2026',
  highlights: [
    {
      // source: goblin-portal #235 (TitlebarStyle.swift, SpaceWindowController+Titlebar.swift, check-titlebar-layout.sh;
      // measured 41 rows compact vs 39 standard, 1100x680 window, sidebar visible), built on #234 (safe-area layout), v1.14.0
      title: 'A Compact Titlebar',
      description:
        'Set "titlebar": "compact" in config.json and the terminal moves up into the titlebar band wherever nothing else needs it, which gives a default-size window two more rows. It stays clear of the traffic lights, the sidebar toggle, the native tab bar and the config warning banner, and ⌘R switches an open window either way. In compact mode the window title is hidden and the band over the terminal no longer drags the window. The default titlebar is unchanged.',
      configExample: '"titlebar": "compact"',
    },
  ],
}
