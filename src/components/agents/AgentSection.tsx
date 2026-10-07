import React from 'react'
import { AGENT_TOOLS } from '@/lib/constants'
import { AGENT_LOOP, type AgentLoopPoint } from '@/lib/agents'

const sectionStyle = {
  padding: 'var(--space-12) var(--space-6) 120px',
  backgroundColor: 'var(--color-bg)',
  position: 'relative',
  '--local-accent': 'var(--accent-agents)',
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
  letterSpacing: '-0.02em',
}

const leadStyle: React.CSSProperties = {
  fontSize: '1.125rem',
  color: 'var(--color-muted)',
  lineHeight: 1.7,
  maxWidth: 640,
  marginBottom: 'var(--space-10)',
}

/* ── Agent loop grid ────────────────────────────────────────────────────────── */
const loopGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 'var(--space-5)',
  marginBottom: 'var(--space-10)',
}

const loopCardStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-4)',
  padding: 'var(--space-6)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
  border: '1px solid var(--color-border)',
}

const loopTitleStyle: React.CSSProperties = {
  fontSize: '0.9375rem',
  fontWeight: 600,
  color: 'var(--local-accent)',
  lineHeight: 1.3,
  margin: 0,
}

const loopDetailStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: 'var(--color-muted)',
  lineHeight: 1.65,
  margin: 0,
}

/* ── Tools row ──────────────────────────────────────────────────────────────── */
const toolsRowLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.6875rem',
  fontWeight: 500,
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  color: 'var(--color-muted)',
  marginBottom: 'var(--space-3)',
}

const toolsRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: 'var(--space-3)',
}

const toolChipStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-1)',
  padding: 'var(--space-3) var(--space-4)',
  borderRadius: 'var(--radius-3)',
  border: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-surface)',
  minWidth: 200,
  flex: '1 1 200px',
}

const toolNameStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: 'var(--color-fg)',
}

const toolDescStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'var(--color-muted)',
  lineHeight: 1.5,
  margin: 0,
}

function LoopCard({ point }: { point: AgentLoopPoint }) {
  return (
    <div style={loopCardStyle}>
      <h3 style={loopTitleStyle}>{point.title}</h3>
      <p style={loopDetailStyle}>{point.detail}</p>
    </div>
  )
}

export default function AgentSection() {
  return (
    <section id="agents" aria-labelledby="agents-heading" className="earned-path deep-field" style={sectionStyle}>
      <div style={innerStyle}>
        <div style={labelStyle}>agent-native</div>
        <h2 id="agents-heading" style={headingStyle}>
          Your agent is working. You are allowed to leave.
        </h2>
        <p style={leadStyle}>
          The best agents run in a shell, not a browser tab. Goblin Portal gives them a fast
          native host, keeps an eye on them while you are elsewhere, and never tries to be one
          of them.
        </p>

        <div style={loopGridStyle}>
          {AGENT_LOOP.map((point) => (
            <LoopCard key={point.title} point={point} />
          ))}
        </div>

        <div style={toolsRowLabelStyle}>Runs whatever you run</div>
        <div style={toolsRowStyle}>
          {AGENT_TOOLS.map((tool) => (
            <div key={tool.name} style={toolChipStyle}>
              <span style={toolNameStyle}>{tool.name}</span>
              <p style={toolDescStyle}>{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
