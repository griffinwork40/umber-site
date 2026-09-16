import React from 'react'
import { FEATURES } from '@/lib/constants'
import FeatureCard from './FeatureCard'

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

/* Bento grid: hero feature spans 2 cols, rest are 1 col */
const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 'var(--space-5)',
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
          The intelligence belongs to your agent, not the terminal chrome.
        </p>
        <div style={gridStyle} className="features-grid">
          <FeatureCard feature={hero} variant="hero" />
          {rest.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} variant="default" />
          ))}
        </div>
      </div>
    </section>
  )
}
