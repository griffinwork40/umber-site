import React from 'react'
import { FAQ } from '@/lib/faq'

const sectionStyle = {
  padding: 'var(--space-9) var(--space-6)',
  '--local-accent': 'var(--accent-install)',
} as React.CSSProperties

const innerStyle: React.CSSProperties = {
  maxWidth: 800,
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
  marginBottom: 'var(--space-2)',
}

const headingStyle: React.CSSProperties = {
  fontSize: 'var(--text-h2)',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  marginBottom: 'var(--space-8)',
  color: 'var(--color-fg)',
}

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
}

const itemStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-3)',
  overflow: 'hidden',
}

const summaryStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--space-5) var(--space-6)',
  cursor: 'pointer',
  fontFamily: 'var(--font-sans)',
  fontSize: '1rem',
  fontWeight: 600,
  color: 'var(--color-fg)',
  listStyle: 'none',
  userSelect: 'none' as const,
}

const answerStyle: React.CSSProperties = {
  padding: '0 var(--space-6) var(--space-5)',
  color: 'var(--color-muted)',
  fontSize: '0.9375rem',
  lineHeight: 1.65,
}

const markerStyle: React.CSSProperties = {
  flexShrink: 0,
  marginLeft: 'var(--space-4)',
  color: 'var(--local-accent)',
  fontSize: '1.25rem',
  lineHeight: 1,
  fontFamily: 'var(--font-mono)',
  transition: 'transform var(--motion-duration) ease',
  display: 'inline-block',
}

export default function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scope-rule"
      style={{ backgroundColor: 'var(--color-bg)', position: 'relative' as const }}
    >
      <div style={sectionStyle}>
        <div style={innerStyle}>
          <div style={labelStyle}>questions</div>
          <h2 id="faq-heading" style={headingStyle}>Reasonable objections</h2>
          <ul style={listStyle}>
            {FAQ.map((entry) => (
              <li key={entry.question}>
                <details style={itemStyle} className="faq-item">
                  <summary style={summaryStyle} className="faq-summary">
                    <span>{entry.question}</span>
                    <span aria-hidden="true" style={markerStyle} className="faq-marker">+</span>
                  </summary>
                  <p style={answerStyle}>{entry.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
