import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('renders without throwing', () => {
    render(<Button>Click me</Button>)
  })

  it('renders as a button element by default', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders as a link when href is provided', () => {
    render(<Button href="#install">Install</Button>)
    expect(screen.getByRole('link', { name: 'Install' })).toBeInTheDocument()
  })

  it('link has correct href', () => {
    render(<Button href="#install">Install</Button>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '#install')
  })

  it('applies primary variant data attribute', () => {
    render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'primary')
  })

  it('applies secondary variant data attribute', () => {
    render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'secondary')
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('responds to Enter key', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    screen.getByRole('button').focus()
    await userEvent.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders children text', () => {
    render(<Button>GitHub →</Button>)
    expect(screen.getByText('GitHub →')).toBeInTheDocument()
  })

  it('defaults to primary variant', () => {
    render(<Button>Default</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'primary')
  })

  describe('className prop (additive)', () => {
    it('carries both btn-primary and the supplied className', () => {
      render(<Button className="x">Label</Button>)
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass('btn-primary')
      expect(btn).toHaveClass('x')
    })

    it('variant class is still present when className is supplied', () => {
      render(<Button variant="secondary" className="extra">Label</Button>)
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass('btn-secondary')
      expect(btn).toHaveClass('extra')
    })

    it('variant class is present when no className is supplied', () => {
      render(<Button>Label</Button>)
      expect(screen.getByRole('button')).toHaveClass('btn-primary')
    })
  })

  describe('size prop', () => {
    it('size="lg" applies lg padding via inline style', () => {
      render(<Button size="lg">Large</Button>)
      const btn = screen.getByRole('button')
      expect(btn).toHaveStyle({ padding: 'var(--space-4) var(--space-7)' })
    })

    it('size="md" does not override the base padding', () => {
      render(<Button size="md">Medium</Button>)
      const btn = screen.getByRole('button')
      // md size map is empty — base padding should still apply
      expect(btn).toHaveStyle({ padding: 'var(--space-3) var(--space-6)' })
    })
  })
})
