import React from 'react'
import { RELEASE, SITE_META } from '@/lib/constants'

const sectionStyle: React.CSSProperties = {
  padding: 'var(--space-11) var(--space-6) var(--space-12)',
  backgroundColor: 'var(--color-surface)',
}

const innerStyle: React.CSSProperties = {
  maxWidth: 1100,
  margin: '0 auto',
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

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 'var(--space-3)',
  marginBottom: 'var(--space-2)',
  flexWrap: 'wrap',
}

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-h2)',
  fontWeight: 700,
  color: 'var(--color-fg)',
  margin: 0,
}

const dateStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  fontSize: '0.875rem',
  fontFamily: 'var(--font-mono)',
  marginBottom: 'var(--space-8)',
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 'var(--space-5)',
}

const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-bg)',
  borderRadius: 'var(--radius-3)',
  padding: 'var(--space-5)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
}

const cardTitleStyle: React.CSSProperties = {
  fontSize: '1.125rem',
  fontWeight: 600,
  color: 'var(--color-fg)',
  margin: 0,
}

const cardDescStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  fontSize: '0.9375rem',
  lineHeight: 1.6,
  margin: 0,
  flex: 1,
}

const configStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8125rem',
  color: 'var(--color-accent)',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-2)',
  padding: 'var(--space-2) var(--space-3)',
  whiteSpace: 'nowrap',
  overflow: 'auto',
}

const footerStyle: React.CSSProperties = {
  marginTop: 'var(--space-6)',
  display: 'flex',
  gap: 'var(--space-4)',
  alignItems: 'center',
  flexWrap: 'wrap',
}

const linkStyle: React.CSSProperties = {
  color: 'var(--color-accent)',
  fontSize: '0.9375rem',
  textDecoration: 'none',
  fontWeight: 500,
}

export default function WhatsNew() {
  return (
    <section
      id="whats-new"
      aria-labelledby="whats-new-heading"
      style={{
        ...sectionStyle,
        '--local-accent': 'var(--color-accent)',
      } as React.CSSProperties}
    >
      <div style={innerStyle}>
        <div style={labelStyle}>release</div>
        <div style={headerStyle}>
          <h2 id="whats-new-heading" style={headingStyle}>
            New in {RELEASE.version}
          </h2>
        </div>
        <p style={dateStyle}>{RELEASE.date}</p>

        <div style={gridStyle} className="release-grid">
          {RELEASE.highlights.map((item) => (
            <div key={item.title} style={cardStyle}>
              <h3 style={cardTitleStyle}>{item.title}</h3>
              <p style={cardDescStyle}>{item.description}</p>
              {item.configExample && (
                <code style={configStyle}>{item.configExample}</code>
              )}
            </div>
          ))}
        </div>

        <div style={footerStyle}>
          <a href={SITE_META.dmgUrl} style={linkStyle}>
            Download {RELEASE.version} →
          </a>
          <a
            href={`${SITE_META.releasesUrl}/tag/${RELEASE.version}`}
            style={linkStyle}
            target="_blank"
            rel="noopener noreferrer"
          >
            Full release notes →
          </a>
        </div>
      </div>
    </section>
  )
}
