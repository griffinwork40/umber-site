import React from 'react'
import Image from 'next/image'
import { SITE_META, PROOF_POINTS } from '@/lib/constants'
import type { ReleaseInfo } from '@/lib/latest-release'

const contentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-5)',
  maxWidth: 480,
  flex: '0 1 480px',
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
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-lead)',
  fontWeight: 500,
  letterSpacing: '-0.015em',
  color: 'var(--color-fg)',
  lineHeight: 1.3,
  maxWidth: 460,
  margin: 0,
}

const subTaglineStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: 'var(--color-muted)',
  lineHeight: 1.6,
  maxWidth: 440,
  margin: 0,
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
}

const detailStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8125rem',
  color: 'var(--color-muted)',
  letterSpacing: '0.01em',
  lineHeight: 1.5,
}

const detailStrongStyle: React.CSSProperties = {
  display: 'block',
  color: 'var(--color-accent)',
  fontSize: '1.125rem',
  fontWeight: 600,
}

const proofRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--space-2) var(--space-5)',
  marginTop: 'var(--space-2)',
  borderTop: '1px solid var(--hairline)',
  listStyle: 'none',
  padding: 'var(--space-5) 0 0',
}

const proofChipStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.75rem',
  color: 'var(--color-fg)',
  letterSpacing: '0.02em',
}

const githubLinkStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  fontSize: '0.9375rem',
  textDecoration: 'none',
  transition: 'color 150ms ease',
}

interface HeroContentProps {
  release: ReleaseInfo
}

export default function HeroContent({ release }: HeroContentProps) {
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
        <a href={SITE_META.releasesUrl} style={versionStyle}>{release.version}</a>
      </div>

      {/* Heading */}
      <h1 id="hero-heading" style={h1Style}>
        <span className="goblin-glow" style={{ color: 'var(--color-accent)' }}>Goblin</span>{' '}Portal
      </h1>

      {/* Tagline */}
      <p style={taglineStyle}>{SITE_META.tagline}</p>
      <p style={subTaglineStyle}>
        Run agents side by side, get pinged when one finishes, review the diff in the same window. Your agents get the full machine, without paying framework taxes.
      </p>

      {/* Primary CTA: dominant download */}
      <div style={ctaGroupStyle}>
        <a
          href={release.dmgUrl}
          style={primaryBtnStyle}
          className="hero-cta"
          download={`GoblinPortal-${release.version}.dmg`}
          rel="noopener noreferrer"
        >
          Download {release.version}
        </a>
        <span style={detailStyle}>
          <span style={detailStrongStyle}>{release.downloadSize}</span>
          {SITE_META.requirements}
        </span>
      </div>

      {/* Secondary: text link, not a button */}
      <a href={SITE_META.repoUrl} style={githubLinkStyle}>
        Free and MIT licensed. Read the source →
      </a>

      {/* Proof row: engineering facts, surfaced instead of buried in prose */}
      <ul style={proofRowStyle} aria-label="Highlights">
        {PROOF_POINTS.map((point) => (
          <li key={point} className="proof-chip" style={proofChipStyle}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}
