'use client'

import React, { useEffect, useState } from 'react'
import HeroContent from './HeroContent'
import HeroScreenshot from './HeroScreenshot'

const sectionStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: 'var(--space-12) var(--space-6)',
  backgroundColor: 'var(--color-bg)',
  position: 'relative',
}

const innerStyle: React.CSSProperties = {
  maxWidth: 1280,
  margin: '0 auto',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-9)',
  flexWrap: 'wrap',
  position: 'relative',
  zIndex: 1,
}

export default function HeroSection() {
  const [visible, setVisible] = useState(false)
  // After the entrance animation settles, clear willChange so the element
  // no longer holds a promoted compositor layer on a static element.
  const [animationDone, setAnimationDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!visible) return
    // --motion-duration is 200ms (0ms under prefers-reduced-motion).
    // Wait for the transition to finish before releasing the layer.
    const timer = setTimeout(() => setAnimationDone(true), 250)
    return () => clearTimeout(timer)
  }, [visible])

  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-section"
      style={{
        ...sectionStyle,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity var(--motion-duration) ease, transform var(--motion-duration) ease`,
        willChange: animationDone ? 'auto' : 'transform, opacity',
      }}
    >
      <div style={innerStyle} className="hero-inner">
        <HeroContent />
        <HeroScreenshot />
      </div>
    </section>
  )
}
