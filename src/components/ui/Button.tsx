import React from 'react'

export type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps {
  variant?: ButtonVariant
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const styles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-bg)',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-fg)',
    border: 'none',
  },
}

const baseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--space-3) var(--space-6)',
  borderRadius: 'var(--radius-3)',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9375rem',
  fontWeight: 600,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'opacity var(--motion-duration) ease',
  lineHeight: 1.5,
}

export default function Button({
  variant = 'primary',
  children,
  href,
  onClick,
  className,
  type = 'button',
}: ButtonProps) {
  const combinedStyle = { ...baseStyle, ...styles[variant] }

  if (href) {
    // Auto-add download and rel attributes for direct file downloads
    const isDmg = href.endsWith('.dmg')
    const fileName = isDmg ? href.split('/').pop() : undefined
    return (
      <a
        href={href}
        style={combinedStyle}
        className={className}
        data-variant={variant}
        {...(isDmg ? { download: fileName, rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={combinedStyle}
      className={className}
      data-variant={variant}
    >
      {children}
    </button>
  )
}
