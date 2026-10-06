'use client'

import React, { useState } from 'react'
import { THEMES, ASSERTION_COUNT } from '@/lib/constants'
import ThemePreview, { previewFrameStyle } from './ThemePreview'
import Badge from '@/components/ui/Badge'

const sectionStyle = {
  backgroundColor: 'var(--color-surface)',
  padding: 'var(--space-11) var(--space-6)',
  position: 'relative',
  '--local-accent': 'var(--accent-themes)',
} as React.CSSProperties

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.75rem',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: 'var(--local-accent)',
  marginBottom: 'var(--space-3)',
}

const innerStyle: React.CSSProperties = {
  maxWidth: 1100,
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
}

const headingStyle: React.CSSProperties = {
  fontSize: 'var(--text-h2)',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  marginBottom: 'var(--space-4)',
  color: 'var(--color-fg)',
}

const subheadStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  marginBottom: 'var(--space-8)',
  fontSize: '1rem',
}

const tabListStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--space-2)',
  marginBottom: 'var(--space-6)',
  flexWrap: 'wrap',
}

const getTabStyle = (isActive: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  padding: 'var(--space-2) var(--space-4)',
  borderRadius: 'var(--radius-3)',
  backgroundColor: isActive ? 'var(--color-selection)' : 'var(--color-bg)',
  color: isActive ? 'var(--color-fg)' : 'var(--color-muted)',
  cursor: 'pointer',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.875rem',
  fontWeight: isActive ? 600 : 400,
  transition: 'color 150ms ease, background-color 150ms ease, border-color 150ms ease',
})

export default function ThemeShowcase() {
  const defaultTheme = THEMES.find((t) => t.isDefault) ?? THEMES[0]
  const [activeTheme, setActiveTheme] = useState(defaultTheme.name)

  const current = THEMES.find((t) => t.name === activeTheme) ?? THEMES[0]

  return (
    <section id="themes" className="earned-path" style={sectionStyle}>
      <div style={innerStyle}>
        <div style={labelStyle}>color</div>
        <h2 style={headingStyle}>Measured themes</h2>
        <p style={subheadStyle}>
          Eight palettes ship out of the box. Each one has been run through {ASSERTION_COUNT} contrast
          assertions, because {'"'}it looks fine{'"'} is not a QA strategy.
        </p>

        {/* Tab list */}
        <div role="tablist" aria-label="Theme selector" style={tabListStyle} className="theme-tabs">
          {THEMES.map((theme) => (
            <button
              key={theme.name}
              role="tab"
              aria-selected={theme.name === activeTheme}
              aria-controls={`theme-panel-${theme.name}`}
              id={`theme-tab-${theme.name}`}
              onClick={() => setActiveTheme(theme.name)}
              style={getTabStyle(theme.name === activeTheme)}
              type="button"
            >
              {theme.displayName}
              {theme.isDefault && (
                <Badge>default</Badge>
              )}
            </button>
          ))}
        </div>

        {/* Theme panel */}
        <div
          id={`theme-panel-${current.name}`}
          role="tabpanel"
          aria-labelledby={`theme-tab-${current.name}`}
          style={previewFrameStyle(current)}
          className="theme-preview-frame"
        >
          <ThemePreview theme={current} />
        </div>
      </div>
    </section>
  )
}
