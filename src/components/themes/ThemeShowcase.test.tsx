import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import ThemeShowcase from './ThemeShowcase'
import { THEMES } from '@/lib/constants'

describe('ThemeShowcase', () => {
  it('renders without throwing', () => {
    render(<ThemeShowcase />)
  })

  it('renders all 5 theme names as tabs', () => {
    render(<ThemeShowcase />)
    THEMES.forEach((theme) => {
      expect(screen.getByRole('tab', { name: new RegExp(theme.displayName) })).toBeInTheDocument()
    })
  })

  it('marks umber as the default theme with a badge', () => {
    render(<ThemeShowcase />)
    // The default badge should appear
    expect(screen.getByText('default')).toBeInTheDocument()
  })

  it('umber tab is selected by default (easter egg theme)', () => {
    render(<ThemeShowcase />)
    expect(screen.getByRole('tab', { name: /Umber/ })).toHaveAttribute('aria-selected', 'true')
  })

  it('non-default themes are not selected initially', () => {
    render(<ThemeShowcase />)
    expect(screen.getByRole('tab', { name: /Tokyo Night/ })).toHaveAttribute('aria-selected', 'false')
  })

  it('clicking a theme tab selects it', async () => {
    render(<ThemeShowcase />)
    await userEvent.click(screen.getByRole('tab', { name: /Tokyo Night/ }))
    expect(screen.getByRole('tab', { name: /Tokyo Night/ })).toHaveAttribute('aria-selected', 'true')
  })

  it('clicking a theme tab deselects umber', async () => {
    render(<ThemeShowcase />)
    await userEvent.click(screen.getByRole('tab', { name: /Tokyo Night/ }))
    expect(screen.getByRole('tab', { name: /Umber/ })).toHaveAttribute('aria-selected', 'false')
  })

  it('renders a tabpanel for the active theme', () => {
    render(<ThemeShowcase />)
    expect(screen.getByRole('tabpanel')).toBeInTheDocument()
  })

  it('has section element with id="themes"', () => {
    const { container } = render(<ThemeShowcase />)
    expect(container.querySelector('section#themes')).toBeInTheDocument()
  })

  it('has h2 heading', () => {
    render(<ThemeShowcase />)
    expect(screen.getByRole('heading', { level: 2, name: 'Measured themes' })).toBeInTheDocument()
  })

  // --- Issue #20: preview-frame wiring ---

  it('tabpanel has class theme-preview-frame', () => {
    render(<ThemeShowcase />)
    expect(screen.getByRole('tabpanel')).toHaveClass('theme-preview-frame')
  })

  it('tabpanel --preview-glow equals THEMES[0].cursor for initial default', () => {
    render(<ThemeShowcase />)
    const defaultTheme = THEMES.find((t) => t.isDefault) ?? THEMES[0]
    const panel = screen.getByRole('tabpanel')
    // The style is set via inline style on the element
    expect((panel as HTMLElement).style.getPropertyValue('--preview-glow')).toBe(defaultTheme.cursor)
  })

  it('swatch row renders 16 children', () => {
    const { container } = render(<ThemeShowcase />)
    // The swatch row is a div[aria-hidden] WITHOUT role="presentation" (the
    // title-bar div has role="presentation" and also aria-hidden, so we exclude it).
    // Each swatch child is a <span> with an inline backgroundColor.
    const swatchRow = container.querySelector('[aria-hidden="true"]:not([role="presentation"])')
    expect(swatchRow).not.toBeNull()
    expect(swatchRow!.children).toHaveLength(16)
  })

  it('clicking another tab changes --preview-glow to the new theme cursor', async () => {
    render(<ThemeShowcase />)
    // Pick a non-default theme to switch to
    const otherTheme = THEMES.find((t) => !t.isDefault)!
    await userEvent.click(screen.getByRole('tab', { name: new RegExp(otherTheme.displayName) }))
    const panel = screen.getByRole('tabpanel')
    expect((panel as HTMLElement).style.getPropertyValue('--preview-glow')).toBe(otherTheme.cursor)
  })
})
