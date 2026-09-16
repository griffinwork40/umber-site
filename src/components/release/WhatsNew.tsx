import React from 'react'
import { RELEASE, SITE_META } from '@/lib/constants'
import Badge from '@/components/ui/Badge'

const sectionStyle: React.CSSProperties = {
  padding: 'var(--space-9) var(--space-6)',
  backgroundColor: 'var(--color-surface)',

}

const innerStyle: React.CSSProperties = {
  maxWidth: 1100,
  margin: '0 auto',
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
  fontSize: '2rem',
  fontWeight: 700,
  color: 'var(--color-fg)',
  margin: 0,
}

const dateStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  fontSize: '0.875rem',
  fontFamily: 'var(--font-mono)',
}

const subheadStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  marginBottom: 'var(--space-8)',
  fontSize: '1rem',
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
    <section id="whats-new" style={sectionStyle}>
      <div style={innerStyle}>
        <div style={headerStyle}>
          <h2 style={headingStyle}>What&rsquo;s New</h2>
          <Badge>{RELEASE.version}</Badge>
        </div>
        <p style={subheadStyle}>
          {RELEASE.date}. Eight measured themes, system appearance following, split-pane dimming, and typography controls.
        </p>

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
          <a
            href={SITE_META.dmgUrl}
            style={linkStyle}
          >
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
