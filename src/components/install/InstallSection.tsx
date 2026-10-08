'use client'

import React, { useState } from 'react'
import { INSTALL_STEPS, SITE_META } from '@/lib/constants'
import type { ReleaseInfo } from '@/lib/latest-release'
import CodeBlock from '@/components/ui/CodeBlock'
import Button from '@/components/ui/Button'

const sectionStyle = {
  padding: 'var(--space-12) var(--space-6)',
  backgroundColor: 'var(--color-bg)',
  position: 'relative',
  '--local-accent': 'var(--accent-install)',
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
  maxWidth: 800,
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
}

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-h2)',
  fontWeight: 700,
  marginBottom: 'var(--space-4)',
  color: 'var(--color-fg)',
}

const leadStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  fontSize: '1.0625rem',
  lineHeight: 1.65,
  marginBottom: 'var(--space-8)',
}

const downloadBoxStyle: React.CSSProperties = {
  padding: 'var(--space-10) var(--space-8)',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-4)',
  boxShadow: '0 0 0 1px var(--hairline), 0 30px 90px var(--color-shadow), 0 0 120px var(--glow-jade-soft)',
  textAlign: 'center' as const,
  marginBottom: 'var(--space-6)',
}

const requirementsStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  fontSize: '0.8125rem',
  marginTop: 'var(--space-3)',
}

const dividerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-4)',
  margin: 'var(--space-6) 0',
  color: 'var(--color-muted)',
  fontSize: '0.8125rem',
}

const dividerLineStyle: React.CSSProperties = {
  flex: 1,
  height: 1,
  backgroundColor: 'var(--color-border)',
}

const toggleBtnStyle: React.CSSProperties = {
  background: 'var(--color-surface)',
  border: 'none',
  borderRadius: 'var(--radius-3)',
  color: 'var(--color-muted)',
  padding: 'var(--space-2) var(--space-5)',
  cursor: 'pointer',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.875rem',
  transition: 'color 150ms ease, border-color 150ms ease',
}

const stepsListStyle: React.CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-6)',
  marginTop: 'var(--space-6)',
}

const stepStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: 'var(--space-4)',
  alignItems: 'start',
}

const stepNumberStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: 'var(--color-accent)',
  color: 'var(--color-bg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: '0.875rem',
  flexShrink: 0,
  marginTop: 2,
}

const stepContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
}

const stepDescStyle: React.CSSProperties = {
  color: 'var(--color-fg)',
  fontWeight: 500,
}

const closingLineStyle: React.CSSProperties = {
  marginTop: 'var(--space-10)',
  textAlign: 'center' as const,
  color: 'var(--color-muted)',
  fontSize: '0.875rem',
  fontStyle: 'italic',
}

type InstallSectionProps = Pick<ReleaseInfo, 'dmgUrl' | 'version'>

export default function InstallSection({ dmgUrl, version }: InstallSectionProps) {
  const [showSource, setShowSource] = useState(false)

  return (
    <section id="install" aria-labelledby="install-heading" className="scope-rule elevated-field" style={sectionStyle}>
      <div style={innerStyle}>
        <div style={labelStyle}>get started</div>
        <h2 id="install-heading" style={headingStyle}>Two and a half megabytes. No account.</h2>
        <p style={leadStyle}>
          Download it, drag it to Applications, open it. That is the whole onboarding.
        </p>

        {/* DMG download — primary path */}
        <div style={downloadBoxStyle} className="install-stage">
          <Button href={dmgUrl} variant="primary" size="lg">
            Download Goblin Portal {version}
          </Button>
          <p style={requirementsStyle}>
            {SITE_META.requirements} &middot; {SITE_META.license}
          </p>
        </div>

        {/* Build from source — secondary path */}
        <div style={dividerStyle}>
          <div style={dividerLineStyle} />
          <span>or</span>
          <div style={dividerLineStyle} />
        </div>

        <div style={{ textAlign: 'center' as const }}>
          <button
            style={toggleBtnStyle}
            onClick={() => setShowSource(!showSource)}
            aria-expanded={showSource}
            type="button"
          >
            {showSource ? 'Hide' : 'Build from source'}
          </button>
        </div>

        {showSource && (
          <ol style={stepsListStyle}>
            {INSTALL_STEPS.map((step) => (
              <li key={step.step} style={stepStyle}>
                <div style={stepNumberStyle} aria-hidden="true">
                  {step.step}
                </div>
                <div style={stepContentStyle}>
                  <p style={stepDescStyle}>{step.description}</p>
                  <CodeBlock code={step.code} language={step.language} />
                </div>
              </li>
            ))}
          </ol>
        )}

        <p style={closingLineStyle}>You read the FAQ. Nobody reads the FAQ.</p>
      </div>
    </section>
  )
}
