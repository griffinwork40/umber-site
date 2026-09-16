import React from 'react'
import Image from 'next/image'
import type { ShowcaseItem } from '@/lib/constants'

interface FeatureShowcaseProps {
  item: ShowcaseItem
  reversed?: boolean
}

const wrapStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-8)',
  flexWrap: 'wrap',
}

const wrapReversedStyle: React.CSSProperties = {
  ...wrapStyle,
  flexDirection: 'row-reverse',
}

const textStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 280,
}

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.5rem',
  fontWeight: 700,
  color: 'var(--color-fg)',
  marginBottom: 'var(--space-3)',
  lineHeight: 1.3,
}

const descStyle: React.CSSProperties = {
  fontSize: '0.9375rem',
  color: 'var(--color-muted)',
  lineHeight: 1.7,
  marginBottom: 'var(--space-5)',
}

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
}

const listItemStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--space-3)',
  alignItems: 'baseline',
  fontSize: '0.875rem',
  color: 'var(--color-fg)',
  lineHeight: 1.6,
}

const bulletStyle: React.CSSProperties = {
  color: 'var(--color-accent)',
  fontFamily: 'var(--font-mono)',
  flexShrink: 0,
}

const imageWrapStyle: React.CSSProperties = {
  flex: 1.2,
  minWidth: 280,
  maxWidth: 640,
}

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  display: 'block',
  borderRadius: 'var(--radius-3)',
  boxShadow: '0 16px 48px var(--color-shadow)',
}

export default function FeatureShowcase({ item, reversed }: FeatureShowcaseProps) {
  return (
    <div style={reversed ? wrapReversedStyle : wrapStyle} className="showcase-row">
      <div style={textStyle}>
        <h3 style={titleStyle}>{item.title}</h3>
        <p style={descStyle}>{item.description}</p>
        <ul style={listStyle}>
          {item.bullets.map((bullet) => (
            <li key={bullet} style={listItemStyle}>
              <span style={bulletStyle} aria-hidden="true">→</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
      <div style={imageWrapStyle} className="contour-frame">
        <Image
          src={item.image}
          alt={item.imageAlt}
          width={1400}
          height={1011}
          style={imageStyle}
        />
      </div>
    </div>
  )
}
