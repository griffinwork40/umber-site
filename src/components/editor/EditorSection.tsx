import React from 'react'
import { EDITOR_FEATURES, SHOWCASE_ITEMS } from '@/lib/constants'
import FeatureShowcase from '@/components/features/FeatureShowcase'
import Icon from '@/components/ui/Icon'

const sectionStyle: React.CSSProperties = {
  padding: 'var(--space-12) var(--space-6)',
  backgroundColor: 'var(--color-bg)',
  position: 'relative',
}

const innerStyle: React.CSSProperties = {
  maxWidth: 1100,
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
}

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: 'var(--space-4)',
  color: 'var(--color-fg)',
}

const subheadStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  marginBottom: 'var(--space-10)',
  fontSize: '1rem',
  maxWidth: 640,
  lineHeight: 1.7,
}

const showcaseStackStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-12)',
  marginBottom: 'var(--space-12)',
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: 'var(--space-5)',
}

const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-3)',
  padding: 'var(--space-5)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
}

const iconWrapStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 'var(--radius-2)',
  backgroundColor: 'var(--color-bg)',
  border: '1px solid var(--color-border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.125rem',
  flexShrink: 0,
}

const cardTitleStyle: React.CSSProperties = {
  fontSize: '0.9375rem',
  fontWeight: 600,
  color: 'var(--color-fg)',
  lineHeight: 1.3,
}

const cardDescStyle: React.CSSProperties = {
  fontSize: '0.8125rem',
  color: 'var(--color-muted)',
  lineHeight: 1.6,
  margin: 0,
}


export default function EditorSection() {
  return (
    <section id="editor" className="earned-path contour-layer" style={sectionStyle}>
      <div style={innerStyle}>
        <h2 style={headingStyle}>More than a terminal</h2>
        <p style={subheadStyle}>
          Open files from the sidebar into editor tabs that sit alongside your
          terminals. Syntax highlighting, code folding, symbol outline, multi-cursor —
          enough to review and edit without switching apps.
        </p>

        <div style={showcaseStackStyle}>
          {SHOWCASE_ITEMS.map((item, i) => (
            <FeatureShowcase key={item.title} item={item} reversed={i % 2 === 1} />
          ))}
        </div>

        <div style={gridStyle} className="editor-grid">
          {EDITOR_FEATURES.map((feature) => (
            <article key={feature.title} style={cardStyle}>
              <div style={iconWrapStyle}>
                <Icon name={feature.icon} size={18} style={{ color: 'var(--color-accent)' }} />
              </div>
              <h3 style={cardTitleStyle}>{feature.title}</h3>
              <p style={cardDescStyle}>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
