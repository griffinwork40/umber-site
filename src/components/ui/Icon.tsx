import React from 'react'

/**
 * Inline SVG icon component. Each icon is a 24x24 viewBox path drawn with
 * currentColor so it inherits from the parent's `color` CSS property.
 *
 * No external icon library -- keeps the bundle tiny and gives full control
 * over stroke weight and style to match the Goblin Portal aesthetic.
 */

interface IconProps {
  name: string
  size?: number
  className?: string
  style?: React.CSSProperties
}

/* eslint-disable max-len */
const PATHS: Record<string, React.ReactNode> = {
  // Features section
  apple: (
    // macOS command key symbol
    <path d="M7 4h3a3 3 0 0 1 3 3v3H7a3 3 0 0 1 0-6Zm10 0h-3a3 3 0 0 0-3 3v3h6a3 3 0 0 0 0-6ZM7 14h6v3a3 3 0 0 1-3 3H7a3 3 0 0 1 0-6Zm10 0h-3v3a3 3 0 0 0 3 3 3 3 0 0 0 0-6Z" strokeWidth="1.5" fill="none" stroke="currentColor" />
  ),
  tabs: (
    // Stacked tabs
    <>
      <rect x="3" y="8" width="18" height="13" rx="2" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <line x1="9" y1="8" x2="9" y2="3" strokeWidth="1.5" stroke="currentColor" />
    </>
  ),
  sidebar: (
    // Panel layout with sidebar
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <line x1="9" y1="3" x2="9" y2="21" strokeWidth="1.5" stroke="currentColor" />
      <line x1="3" y1="9" x2="9" y2="9" strokeWidth="1.5" stroke="currentColor" />
    </>
  ),
  palette: (
    // Color swatch / theme
    <>
      <circle cx="12" cy="12" r="9" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      <circle cx="8" cy="11" r="1.5" fill="currentColor" />
      <circle cx="16" cy="11" r="1.5" fill="currentColor" />
      <circle cx="10" cy="15" r="1.5" fill="currentColor" />
    </>
  ),
  cpu: (
    // Processor chip
    <>
      <rect x="6" y="6" width="12" height="12" rx="1" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <rect x="9" y="9" width="6" height="6" rx="0.5" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <line x1="9" y1="2" x2="9" y2="6" strokeWidth="1.5" stroke="currentColor" />
      <line x1="15" y1="2" x2="15" y2="6" strokeWidth="1.5" stroke="currentColor" />
      <line x1="9" y1="18" x2="9" y2="22" strokeWidth="1.5" stroke="currentColor" />
      <line x1="15" y1="18" x2="15" y2="22" strokeWidth="1.5" stroke="currentColor" />
      <line x1="2" y1="9" x2="6" y2="9" strokeWidth="1.5" stroke="currentColor" />
      <line x1="2" y1="15" x2="6" y2="15" strokeWidth="1.5" stroke="currentColor" />
      <line x1="18" y1="9" x2="22" y2="9" strokeWidth="1.5" stroke="currentColor" />
      <line x1="18" y1="15" x2="22" y2="15" strokeWidth="1.5" stroke="currentColor" />
    </>
  ),
  shell: (
    // Terminal prompt
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <polyline points="7,9 11,12 7,15" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="13" y1="15" x2="17" y2="15" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  wait: (
    // $EDITOR / --wait: editor window with a pause indicator
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <line x1="3" y1="9" x2="21" y2="9" strokeWidth="1.5" stroke="currentColor" />
      <line x1="7" y1="13" x2="13" y2="13" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
      <line x1="10" y1="20" x2="14" y2="20" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
      <line x1="12" y1="18" x2="12" y2="22" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  split: (
    // Vertical split pane
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <line x1="3" y1="12" x2="21" y2="12" strokeWidth="1.5" stroke="currentColor" />
      <line x1="12" y1="12" x2="12" y2="21" strokeWidth="1.5" stroke="currentColor" />
    </>
  ),

  // Editor section
  syntax: (
    // Code brackets with highlight
    <>
      <polyline points="8,7 4,12 8,17" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16,7 20,12 16,17" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="4" x2="10" y2="20" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  command: (
    // Lightning bolt / action
    <path d="M13 2 4 14h7l-2 8 9-12h-7l2-8Z" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinejoin="round" />
  ),
  fold: (
    // Collapse/fold brackets
    <>
      <polyline points="4,8 8,4 12,8" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="4,16 8,20 12,16" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="4" x2="8" y2="20" strokeWidth="1.5" stroke="currentColor" />
      <line x1="16" y1="8" x2="20" y2="8" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
      <line x1="16" y1="12" x2="22" y2="12" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
      <line x1="16" y1="16" x2="19" y2="16" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  cursor: (
    // Text cursor / multi-cursor
    <>
      <line x1="8" y1="3" x2="8" y2="21" strokeWidth="2" stroke="currentColor" strokeLinecap="round" />
      <line x1="5" y1="3" x2="11" y2="3" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
      <line x1="5" y1="21" x2="11" y2="21" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" />
      <line x1="16" y1="7" x2="16" y2="17" strokeWidth="2" stroke="currentColor" strokeLinecap="round" opacity="0.5" />
      <line x1="14" y1="7" x2="18" y2="7" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" opacity="0.5" />
      <line x1="14" y1="17" x2="18" y2="17" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" opacity="0.5" />
    </>
  ),
}
/* eslint-enable max-len */

export default function Icon({ name, size = 24, className, style }: IconProps) {
  const path = PATHS[name]
  if (!path) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}
