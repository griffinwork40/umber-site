import React from 'react'
import { DEMO_TRANSCRIPT } from '@/lib/constants'
import type { ThemePalette } from '@/lib/constants'
import TerminalMockup from '@/components/ui/TerminalMockup'

/*
 * Live preview of one palette: a short agent session rendered in the theme's
 * own ANSI slots, plus the full 16-colour strip. All colours come from the
 * ThemePalette data (constants.ts); this file holds no colour literals.
 */

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.875rem',
  lineHeight: 1.85,
  color: 'var(--color-fg)',
  whiteSpace: 'pre-wrap',
}

const swatchRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(16, 1fr)',
  gap: 2,
  marginTop: 'var(--space-5)',
  borderRadius: 'var(--radius-2)',
  overflow: 'hidden',
}

/**
 * Theme-tinted frame: sets per-palette CSS custom properties so the static
 * box-shadow rule in polish.css can reference them via color-mix(). No colour
 * literals appear in the returned object — only CSS custom property assignments.
 * The actual box-shadow lives on `.theme-preview-frame` in polish.css.
 */
export function previewFrameStyle(theme: ThemePalette): React.CSSProperties {
  return {
    '--preview-dim': theme.ansi[8],
    '--preview-glow': theme.cursor,
    borderRadius: 'var(--radius-4)',
    overflow: 'hidden',
  } as React.CSSProperties
}

export default function ThemePreview({ theme }: { theme: ThemePalette }) {
  // Per-theme token overrides so TerminalMockup keeps consuming var(--color-*).
  const themeVars: Record<string, string> = {
    '--color-bg': theme.background,
    '--color-fg': theme.foreground,
  }
  const a = theme.ansi
  const dimColor = a[8]

  return (
    <TerminalMockup
      aria-label={`${theme.displayName} theme preview`}
      themeVars={themeVars}
      title={`zsh - ${theme.displayName}`}
    >
      <div style={bodyStyle}>
        {DEMO_TRANSCRIPT.map((line, lineIdx) => (
          <div key={lineIdx}>
            {line.segments.map((seg, segIdx) => {
              let segStyle: React.CSSProperties
              if (seg.ansiSlot === 'cursor-bg') {
                segStyle = { color: a[0], backgroundColor: theme.cursor }
              } else if (seg.ansiSlot === null) {
                segStyle = { color: dimColor }
              } else {
                segStyle = { color: a[seg.ansiSlot] }
              }
              return (
                <span key={segIdx} style={segStyle}>
                  {seg.text}
                </span>
              )
            })}
          </div>
        ))}
      </div>
      <div style={swatchRowStyle} aria-hidden="true">
        {a.slice(0, 16).map((color, i) => (
          <span key={i} style={{ height: 10, backgroundColor: color }} />
        ))}
      </div>
    </TerminalMockup>
  )
}
