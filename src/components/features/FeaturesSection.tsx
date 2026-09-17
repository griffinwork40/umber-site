import React from 'react'
import { FEATURES } from '@/lib/constants'

const sectionStyle = {
  padding: 'var(--space-11) var(--space-6)',
  backgroundColor: 'var(--color-bg)',
  position: 'relative',
  '--local-accent': 'var(--accent-features)',
} as React.CSSProperties

const innerStyle: React.CSSProperties = {
  maxWidth: 1100,
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.75rem',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: 'var(--local-accent)',
  marginBottom: 'var(--space-3)',
}

const headingStyle: React.CSSProperties = {
  fontSize: '2rem',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  marginBottom: 'var(--space-4)',
  color: 'var(--color-fg)',
  letterSpacing: '-0.02em',
}

const subheadStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  marginBottom: 'var(--space-9)',
  fontSize: '1rem',
}

/* ── Hero: full-width prose callout, no card chrome ──────────────────────── */
const heroStyle: React.CSSProperties = {
  borderLeft: '2px solid var(--local-accent)',
  paddingLeft: 'var(--space-6)',
  marginBottom: 'var(--space-9)',
}

const heroTitleStyle: React.CSSProperties = {
  fontSize: '1.375rem',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  color: 'var(--color-fg)',
  letterSpacing: '-0.01em',
  marginBottom: 'var(--space-3)',
}

const heroDescStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: 'var(--color-muted)',
  lineHeight: 1.7,
  margin: 0,
  maxWidth: 600,
}

/* ── Compact list: secondary capabilities ────────────────────────────────── */
const compactGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 'var(--space-7) var(--space-8)',
}

const compactItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-1)',
}

const compactTitleStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'var(--color-fg)',
  lineHeight: 1.3,
}

const compactDescStyle: React.CSSProperties = {
  fontSize: '0.8125rem',
  color: 'var(--color-muted)',
  lineHeight: 1.6,
  margin: 0,
}

export default function FeaturesSection() {
  const [hero, ...rest] = FEATURES

  return (
    <section id="features" className="scope-rule contour-layer" style={sectionStyle}>
      <div style={innerStyle}>
        <div style={labelStyle}>features</div>
        <h2 style={headingStyle}>
          No AI built in, on purpose
        </h2>
        <p style={subheadStyle}>
          The intelligence belongs to your agent. The terminal&#39;s job is to stay out of the way.
        </p>

        <article style={heroStyle}>
          <h3 style={heroTitleStyle}>{hero.title}</h3>
          <p style={heroDescStyle}>{hero.description}</p>
        </article>

        <div style={compactGridStyle} className="features-compact">
          {rest.map((feature) => (
            <article key={feature.title} style={compactItemStyle}>
              <h3 style={compactTitleStyle}>{feature.title}</h3>
              <p style={compactDescStyle}>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
