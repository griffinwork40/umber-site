import React from 'react'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
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

const sizes: Record<ButtonSize, React.CSSProperties> = {
  md: {},
  /* Matches the hero download CTA so closing CTAs carry equal weight. */
  lg: { padding: 'var(--space-4) var(--space-7)', fontSize: '1rem' },
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
  transition:
    'opacity var(--motion-duration) ease, transform var(--motion-duration) ease, box-shadow var(--motion-duration) ease',
  lineHeight: 1.5,
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  className,
  type = 'button',
}: ButtonProps) {
  const combinedStyle = { ...baseStyle, ...styles[variant], ...sizes[size] }
  // Variant class is always present so polish.css hover/focus rules apply.
  const resolvedClass = [`btn-${variant}`, className].filter(Boolean).join(' ')

  if (href) {
    // Auto-add download and rel attributes for direct file downloads
    const isDmg = href.endsWith('.dmg')
    const fileName = isDmg ? href.split('/').pop() : undefined
    return (
      <a
        href={href}
        style={combinedStyle}
        className={resolvedClass}
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
      className={resolvedClass}
      data-variant={variant}
    >
      {children}
    </button>
  )
}
