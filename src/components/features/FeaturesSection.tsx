import React from 'react'
import { FEATURES } from '@/lib/constants'
import Icon from '@/components/ui/Icon'

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
  fontSize: 'var(--text-h2)',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  marginBottom: 'var(--space-4)',
  color: 'var(--color-fg)',
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
  display: 'flex',
  gap: 'var(--space-5)',
  alignItems: 'flex-start',
}

const heroIconStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  flexShrink: 0,
  borderRadius: 'var(--radius-3)',
  border: '1px solid var(--color-border)',
  backgroundColor: 'var(--surface-raised)',
  boxShadow: '0 0 32px var(--glow-jade-soft)',
}

const heroTitleStyle: React.CSSProperties = {
  fontSize: '1.75rem',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  color: 'var(--color-fg)',
  letterSpacing: '-0.01em',
  marginBottom: 'var(--space-3)',
}

const heroDescStyle: React.CSSProperties = {
  fontSize: '1.0625rem',
  color: 'var(--color-muted)',
  lineHeight: 1.7,
  margin: 0,
  maxWidth: 600,
}

/* ── Compact list: secondary capabilities ────────────────────────────────── */
const compactGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 'var(--space-5)',
}

const compactItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-2)',
  padding: 'var(--space-6)',
  borderRadius: 'var(--radius-4)',
  border: '1px solid var(--color-border)',
  backgroundColor: 'var(--surface-raised)',
}

const iconBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  marginBottom: 'var(--space-2)',
  borderRadius: 'var(--radius-3)',
  border: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-bg)',
}

const compactTitleStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 600,
  color: 'var(--color-fg)',
  lineHeight: 1.3,
}

const compactDescStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: 'var(--color-muted)',
  lineHeight: 1.6,
  margin: 0,
}

export default function FeaturesSection() {
  const [hero, ...rest] = FEATURES

  return (
    <section id="features" aria-labelledby="features-heading" className="scope-rule contour-layer" style={sectionStyle}>
      <div style={innerStyle}>
        <div style={labelStyle}>features</div>
        <h2 id="features-heading" style={headingStyle}>
          No AI built in, on purpose
        </h2>
        <p style={subheadStyle}>
          The intelligence belongs to your agent. The terminal&#39;s job is to stay out of the way.
        </p>

        <article style={heroStyle}>
          <span className="feature-icon" style={heroIconStyle} aria-hidden="true">
            <Icon name={hero.icon} size={22} />
          </span>
          <div>
            <h3 style={heroTitleStyle}>{hero.title}</h3>
            <p style={heroDescStyle}>{hero.description}</p>
          </div>
        </article>

        <div style={compactGridStyle} className="features-compact">
          {rest.map((feature) => (
            <article key={feature.title} style={compactItemStyle} className="feature-card">
              <span className="feature-icon" style={iconBadgeStyle} aria-hidden="true">
                <Icon name={feature.icon} size={16} />
              </span>
              <h3 style={compactTitleStyle}>{feature.title}</h3>
              <p style={compactDescStyle}>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
