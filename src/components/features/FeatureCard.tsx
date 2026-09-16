import React from 'react'
import type { Feature } from '@/lib/constants'
import Icon from '@/components/ui/Icon'

interface FeatureCardProps {
  feature: Feature
  variant?: 'hero' | 'default'
}

const baseCardStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-3)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
}

const heroCardStyle: React.CSSProperties = {
  ...baseCardStyle,
  gridColumn: 'span 2',
  padding: 'var(--space-8)',
  gap: 'var(--space-4)',
}

const defaultCardStyle: React.CSSProperties = {
  ...baseCardStyle,
  padding: 'var(--space-6)',
}

const iconWrapStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 'var(--radius-2)',
  backgroundColor: 'var(--color-bg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.25rem',
  flexShrink: 0,
}

const heroIconWrapStyle: React.CSSProperties = {
  ...iconWrapStyle,
  width: 48,
  height: 48,
  fontSize: '1.5rem',
}

export default function FeatureCard({ feature, variant = 'default' }: FeatureCardProps) {
  const isHero = variant === 'hero'

  const titleStyle: React.CSSProperties = {
    fontSize: isHero ? '1.25rem' : '1rem',
    fontWeight: 600,
    color: 'var(--color-fg)',
    lineHeight: 1.3,
  }

  const descStyle: React.CSSProperties = {
    fontSize: isHero ? '1rem' : '0.875rem',
    color: 'var(--color-muted)',
    lineHeight: 1.6,
    margin: 0,
    maxWidth: isHero ? 640 : undefined,
  }

  return (
    <article style={isHero ? heroCardStyle : defaultCardStyle}>
      <div style={isHero ? heroIconWrapStyle : iconWrapStyle}>
        <Icon name={feature.icon} size={isHero ? 24 : 20} style={{ color: 'var(--local-accent)' }} />
      </div>
      <h3 style={titleStyle}>{feature.title}</h3>
      <p style={descStyle}>{feature.description}</p>
    </article>
  )
}
