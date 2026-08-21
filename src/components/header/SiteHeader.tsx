'use client'

import React, { useEffect, useState } from 'react'
import { SITE_META } from '@/lib/constants'
import Button from '@/components/ui/Button'

const headerStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--space-3) var(--space-6)',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderBottom: '1px solid var(--color-border)',
  transition: 'transform var(--motion-duration) ease, opacity var(--motion-duration) ease',
}

const hiddenStyle: React.CSSProperties = {
  ...headerStyle,
  transform: 'translateY(-100%)',
  opacity: 0,
  pointerEvents: 'none',
}

const wordmarkStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: '1rem',
  color: 'var(--color-fg)',
  textDecoration: 'none',
}

const navListStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-5)',
  listStyle: 'none',
  margin: 0,
  padding: 0,
}

const navLinkStyle: React.CSSProperties = {
  color: 'var(--color-muted)',
  textDecoration: 'none',
  fontSize: '0.875rem',
  transition: 'color var(--motion-duration) ease',
}

const rightGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-4)',
}

export default function SiteHeader() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show header after scrolling past the hero (~600px)
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={visible ? headerStyle : hiddenStyle} aria-label="Site navigation">
      <a href="#main-content" style={wordmarkStyle}>
        Umber
      </a>
      <nav aria-label="Page sections" className="site-header-nav">
        <ul style={navListStyle}>
          <li><a href="#agents" style={navLinkStyle}>Agents</a></li>
          <li><a href="#features" style={navLinkStyle}>Features</a></li>
          <li><a href="#editor" style={navLinkStyle}>Editor</a></li>
          <li><a href="#themes" style={navLinkStyle}>Themes</a></li>
          <li><a href="#install" style={navLinkStyle}>Install</a></li>
          <li><a href="#keymap" style={navLinkStyle}>Keymap</a></li>
        </ul>
      </nav>
      <div style={rightGroupStyle}>
        <Button href={SITE_META.dmgUrl} variant="primary">
          Download
        </Button>
      </div>
    </header>
  )
}
