import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HeroSection from './HeroSection'
import { SITE_META } from '@/lib/constants'

describe('HeroSection', () => {
  it('renders without throwing', () => {
    render(<HeroSection />)
  })

  it('renders h1 with text "Goblin Portal"', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1, name: 'Goblin Portal' })).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<HeroSection />)
    expect(screen.getByText(SITE_META.tagline)).toBeInTheDocument()
  })

  it('renders the Download CTA linking to the DMG', () => {
    render(<HeroSection />)
    expect(screen.getByRole('link', { name: new RegExp(`Download ${SITE_META.version}`) })).toHaveAttribute('href', expect.stringContaining('.dmg'))
  })

  it('renders the GitHub CTA with correct href', () => {
    render(<HeroSection />)
    expect(screen.getByRole('link', { name: 'Source on GitHub →' })).toHaveAttribute(
      'href',
      SITE_META.repoUrl
    )
  })

  it('renders app icon with correct alt text', () => {
    render(<HeroSection />)
    expect(screen.getByAltText('Goblin Portal app icon')).toBeInTheDocument()
  })

  it('renders screenshot with correct alt text', () => {
    render(<HeroSection />)
    expect(screen.getByAltText(/Goblin Portal running agent-afk/)).toBeInTheDocument()
  })

  it('has aria-labelledby="hero-heading" on the section', () => {
    const { container } = render(<HeroSection />)
    const section = container.querySelector('section')
    expect(section).toHaveAttribute('aria-labelledby', 'hero-heading')
  })

  it('surfaces proof points that already appear in page copy', () => {
    render(<HeroSection />)
    const list = screen.getByRole('list', { name: 'Highlights' })
    expect(list).toHaveTextContent('Swift and AppKit')
    expect(list).toHaveTextContent('No Electron')
    expect(list).toHaveTextContent('474 contrast assertions')
  })

  it('keeps the secondary tagline and binary size', () => {
    render(<HeroSection />)
    expect(screen.getByText('Your agents get the full machine, without paying framework taxes.')).toBeInTheDocument()
    expect(screen.getByText('1.7 MB')).toBeInTheDocument()
  })
})
