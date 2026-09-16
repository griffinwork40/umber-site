import React from 'react'
import Image from 'next/image'
import { SITE_META } from '@/lib/constants'

const contentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-5)',
  maxWidth: 520,
}

const iconWrapStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
}

const versionStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8125rem',
}

const h1Style: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(3rem, 8vw, 5rem)',
  fontWeight: 700,
  letterSpacing: '-0.04em',
  lineHeight: 1,
  color: 'var(--color-fg)',
  margin: 0,
}

const taglineStyle: React.CSSProperties = {
  fontSize: '1.125rem',
  color: 'var(--color-muted)',
  lineHeight: 1.6,
  maxWidth: 460,
}

const ctaGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--space-4)',
  flexWrap: 'wrap',
  alignItems: 'center',
}

const primaryBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--space-3)',
  padding: 'var(--space-4) var(--space-7)',
  borderRadius: 'var(--radius-3)',
  fontFamily: 'var(--font-sans)',
  fontSize: '1rem',
  fontWeight: 600,
  textDecoration: 'none',
  cursor: 'pointer',
  lineHeight: 1.5,
  backgroundColor: 'var(--color-accent)',
  color: 'var(--color-bg)',
  border: '1px solid var(--color-accent)',
  transition: 'opacity 150ms ease',
}

const detailStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.75rem',
  color: 'var(--color-muted)',
  letterSpacing: '0.01em',
}

const githubLinkStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  fontSize: '0.9375rem',
  textDecoration: 'none',
  transition: 'color 150ms ease',
}

export default function HeroContent() {
  return (
    <div style={contentStyle} className="hero-content">
      {/* Icon + version badge */}
      <div style={iconWrapStyle}>
        <Image
          src="/images/icon-1024.png"
          alt="Goblin Portal app icon"
          width={48}
          height={48}
          style={{ borderRadius: 'var(--radius-3)' }}
        />
        <a href={SITE_META.releasesUrl} style={versionStyle}>{SITE_META.version}</a>
      </div>

      {/* Heading */}
      <h1 id="hero-heading" style={h1Style}>
        {SITE_META.title}
      </h1>

      {/* Tagline */}
      <p style={taglineStyle}>{SITE_META.tagline}</p>
      <p style={{ ...taglineStyle, fontSize: '0.9375rem' }}>
        Your agents get the full machine. Swift and AppKit, no Electron.
      </p>

      {/* Primary CTA: dominant download */}
      <div style={ctaGroupStyle}>
        <a
          href={SITE_META.dmgUrl}
          style={primaryBtnStyle}
          download="GoblinPortal-v1.0.0.dmg"
          rel="noopener noreferrer"
        >
          Download {SITE_META.version}
        </a>
        <span style={detailStyle}>Universal binary · 1.7 MB</span>
      </div>

      {/* Secondary: text link, not a button */}
      <a href={SITE_META.repoUrl} style={githubLinkStyle}>
        Source on GitHub →
      </a>
    </div>
  )
}
