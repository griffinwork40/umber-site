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
  version: 'v1.8.0',
  date: 'October 7, 2026',
  highlights: [
    {
      // source: goblin-portal #160 (StarterConfig.swift, check-starter-config.sh), #161 (PreferencesDiff.swift)
      title: 'Your Config File Is Actually Read',
      description:
        'The starter config.json that ⌘, writes was not valid JSON, so every setting in it was quietly ignored. It parses now, and the Settings window\'s Apply writes only the keys you changed instead of switching your renderer back to Core Text.',
    },
    {
      // source: goblin-portal #164 (AppMenu+Window.swift, GoblinPortalTerminalView+Clear.swift), #165 (check-palette-covers-menu.sh)
      title: 'The Menus a Mac App Should Have',
      description:
        'Minimize (⌘M), Zoom, Hide Others (⌥⌘H), a Help menu (⌘?), and Clear Buffer (⌘K), which wipes the focused pane\'s screen and scrollback. Every menu action is also in the ⌘⇧P command palette, and a gate script checks that none go missing.',
    },
    {
      // source: goblin-portal #162 (SpaceWindowController+InitialFrame.swift), #163 (PaneDimming.swift, APCA Lc 45 floor)
      title: 'A Sensible First Window and Readable Splits',
      description:
        'The first window opens at 1100×680, centred, and a cramped 500×532 frame saved by older versions is repaired. Unfocused split panes dim only as far as keeps their text readable, measured for every built-in theme.',
    },
  ],
}
