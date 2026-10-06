import React from 'react'
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

/** Theme-tinted frame: hairline in the palette's dim slot, glow in its cursor colour. */
export function previewFrameStyle(theme: ThemePalette): React.CSSProperties {
  return {
    borderRadius: 'var(--radius-4)',
    overflow: 'hidden',
    boxShadow: [
      `0 0 0 1px color-mix(in srgb, ${theme.ansi[8]} 45%, transparent)`,
      '0 30px 90px var(--color-shadow)',
      `0 0 120px color-mix(in srgb, ${theme.cursor} 22%, transparent)`,
    ].join(', '),
  }
}

export default function ThemePreview({ theme }: { theme: ThemePalette }) {
  // Per-theme token overrides so TerminalMockup keeps consuming var(--color-*).
  const themeVars: Record<string, string> = {
    '--color-bg': theme.background,
    '--color-fg': theme.foreground,
  }
  const a = theme.ansi
  const dim: React.CSSProperties = { color: a[8] }

  return (
    <TerminalMockup
      aria-label={`${theme.displayName} theme preview`}
      themeVars={themeVars}
      title={`zsh - ${theme.displayName}`}
    >
      <div style={bodyStyle}>
        <div>
          <span style={{ color: a[2] }}>✓</span>
          <span> goblin-portal </span>
          <span style={{ color: a[4] }}>~/Projects/goblin-portal</span>
          <span style={{ color: a[5] }}> (main)</span>
        </div>
        <div style={dim}>$ swift run GoblinPortal</div>
        <div style={{ color: a[2] }}>Build complete (0.3s)</div>
        <div>
          <span style={{ color: a[5] }}>◆ agent</span>
          <span style={dim}> · refactor </span>
          <span style={{ color: a[6] }}>ThemeValues.swift</span>
        </div>
        <div>
          <span style={{ color: a[3] }}>  ● read_file</span>
          <span style={dim}> ×4 </span>
          <span style={{ color: a[2] }}>done</span>
        </div>
        <div>
          <span style={{ color: a[1] }}>  - let accent = Color(red: 0.18, green: 0.82, blue: 0.4)</span>
        </div>
        <div>
          <span style={{ color: a[2] }}>  + let accent = palette.accent</span>
        </div>
        <div>
          <span style={{ color: a[2] }}>✓ 474 assertions passed</span>
          <span style={dim}> · 0 failed</span>
        </div>
        <div>
          <span style={{ color: a[2] }}>❯ </span>
          <span style={{ color: a[0], backgroundColor: theme.cursor }}>▊</span>
        </div>
      </div>
      <div style={swatchRowStyle} aria-hidden="true">
        {a.slice(0, 16).map((color, i) => (
          <span key={i} style={{ height: 10, backgroundColor: color }} />
        ))}
      </div>
    </TerminalMockup>
  )
}
