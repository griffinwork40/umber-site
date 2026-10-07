/**
 * Demo transcript and proof-copy data — structured constants for the
 * ThemePreview agent session and the HeroContent proof row.
 *
 * All display strings that include the assertion count are derived from
 * ASSERTION_COUNT so the figure is defined exactly once.
 *
 * Re-exported from constants.ts so consumers can import from either path.
 */

/**
 * The number of contrast-compliance assertions run against the built-in themes.
 * source: check-theme-contrast.sh run at goblin-portal v1.8.0 printed "ALL-OK  560 assertions passed"
 */
export const ASSERTION_COUNT = 560 as const

/**
 * Structured transcript for the demo agent session shown in ThemePreview.
 * Each entry maps to a rendered line in the terminal mockup.
 *
 * `ansiSlot` refers to the ANSI colour index from the active ThemePalette.ansi
 * array; `text` is the literal string to display.
 *
 * Lines with multiple spans are represented as an array of { ansiSlot, text }
 * segments; a `null` ansiSlot means "use the theme's dim colour (ansi[8])".
 */
export interface TranscriptSegment {
  /** ANSI palette index, or null to use the dim colour (ansi[8]), or 'cursor-bg' for the cursor block */
  ansiSlot: number | null | 'cursor-bg'
  text: string
}

export interface TranscriptLine {
  segments: TranscriptSegment[]
}

export const DEMO_TRANSCRIPT: readonly TranscriptLine[] = [
  // ✓ goblin-portal ~/Projects/goblin-portal (main)
  {
    segments: [
      { ansiSlot: 2, text: '✓' },
      { ansiSlot: null, text: ' goblin-portal ' },
      { ansiSlot: 4, text: '~/Projects/goblin-portal' },
      { ansiSlot: 5, text: ' (main)' },
    ],
  },
  // $ swift run GoblinPortal
  {
    segments: [{ ansiSlot: null, text: '$ swift run GoblinPortal' }],
  },
  // Build complete (0.3s)
  {
    segments: [{ ansiSlot: 2, text: 'Build complete (0.3s)' }],
  },
  // ◆ agent · refactor ThemeValues.swift
  {
    segments: [
      { ansiSlot: 5, text: '◆ agent' },
      { ansiSlot: null, text: ' · refactor ' },
      { ansiSlot: 6, text: 'ThemeValues.swift' },
    ],
  },
  // ● read_file ×4 done
  {
    segments: [
      { ansiSlot: 3, text: '  ● read_file' },
      { ansiSlot: null, text: ' ×4 ' },
      { ansiSlot: 2, text: 'done' },
    ],
  },
  // - let accent = Color(red: …)
  {
    segments: [
      { ansiSlot: 1, text: '  - let accent = Color(red: 0.18, green: 0.82, blue: 0.4)' },
    ],
  },
  // + let accent = palette.accent
  {
    segments: [
      { ansiSlot: 2, text: '  + let accent = palette.accent' },
    ],
  },
  // ✓ 560 assertions passed · 0 failed
  {
    segments: [
      { ansiSlot: 2, text: `✓ ${ASSERTION_COUNT} assertions passed` },
      { ansiSlot: null, text: ' · 0 failed' },
    ],
  },
  // ❯ ▊  (cursor line)
  {
    segments: [
      { ansiSlot: 2, text: '❯ ' },
      { ansiSlot: 'cursor-bg', text: '▊' },
    ],
  },
]

/**
 * Proof-point labels shown in the HeroContent highlights row.
 * The contrast-assertion entry is derived from ASSERTION_COUNT.
 */
export const PROOF_POINTS: readonly string[] = [
  'Swift and AppKit',
  'Signed and notarized',
  `${ASSERTION_COUNT} contrast assertions`,
] as const
