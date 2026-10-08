import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { act } from 'react'
import HeroSection from './HeroSection'
import { SITE_META, ASSERTION_COUNT } from '@/lib/constants'

const defaultRelease = {
  version: SITE_META.version,
  dmgUrl: SITE_META.dmgUrl,
  downloadSize: SITE_META.downloadSize,
  publishedAt: '',
}

describe('HeroSection', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders without throwing', () => {
    render(<HeroSection release={defaultRelease} />)
  })

  it('renders h1 with text "Goblin Portal"', () => {
    render(<HeroSection release={defaultRelease} />)
    expect(screen.getByRole('heading', { level: 1, name: 'Goblin Portal' })).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<HeroSection release={defaultRelease} />)
    expect(screen.getByText(SITE_META.tagline)).toBeInTheDocument()
  })

  it('renders the Download CTA linking to the DMG', () => {
    render(<HeroSection release={defaultRelease} />)
    expect(screen.getByRole('link', { name: new RegExp(`Download ${SITE_META.version}`) })).toHaveAttribute('href', expect.stringContaining('.dmg'))
  })

  it('renders the GitHub CTA with correct href', () => {
    render(<HeroSection release={defaultRelease} />)
    expect(screen.getByRole('link', { name: 'Free and MIT licensed. Read the source →' })).toHaveAttribute(
      'href',
      SITE_META.repoUrl
    )
  })

  it('renders app icon with correct alt text', () => {
    render(<HeroSection release={defaultRelease} />)
    expect(screen.getByAltText('Goblin Portal app icon')).toBeInTheDocument()
  })

  it('renders screenshot with correct alt text', () => {
    render(<HeroSection release={defaultRelease} />)
    expect(screen.getByAltText(/Goblin Portal running agent-afk/)).toBeInTheDocument()
  })

  it('has aria-labelledby="hero-heading" on the section', () => {
    const { container } = render(<HeroSection release={defaultRelease} />)
    const section = container.querySelector('section')
    expect(section).toHaveAttribute('aria-labelledby', 'hero-heading')
  })

  it('surfaces proof points that already appear in page copy', () => {
    // Intent: every proof-point label must be backed by copy elsewhere in site data.
    // 'Swift and AppKit' appears in FEATURES[0].description.
    // 'Signed and notarized' is backed by FAQ entry: 'signed with a Developer ID and notarized'.
    // The contrast-assertion count appears in the FAQ answer and DEMO_TRANSCRIPT.
    render(<HeroSection release={defaultRelease} />)
    const list = screen.getByRole('list', { name: 'Highlights' })
    expect(list).toHaveTextContent('Swift and AppKit')
    expect(list).toHaveTextContent('Signed and notarized')
    expect(list).toHaveTextContent(`${ASSERTION_COUNT} contrast assertions`)
    // 'No Electron' was replaced by 'Signed and notarized'
    expect(list).not.toHaveTextContent('No Electron')
  })

  it('renders the updated detail with correct size and requirements', () => {
    render(<HeroSection release={defaultRelease} />)
    // 2.5 MB replaces the old false '1.7 MB'
    expect(screen.getByText('2.5 MB')).toBeInTheDocument()
    // arm64-only, not Universal binary
    expect(screen.getByText(/Apple silicon/)).toBeInTheDocument()
    expect(screen.queryByText('1.7 MB')).not.toBeInTheDocument()
    expect(screen.queryByText('Universal binary')).not.toBeInTheDocument()
  })

  it('keeps the secondary tagline', () => {
    render(<HeroSection release={defaultRelease} />)
    expect(screen.getByText(/Run agents side by side/)).toBeInTheDocument()
    expect(screen.getByText(/Your agents get the full machine, without paying framework taxes/)).toBeInTheDocument()
  })

  it('releases willChange immediately under prefers-reduced-motion', async () => {
    // Mock matchMedia to report reduced-motion preference
    const original = window.matchMedia
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    const { container } = render(<HeroSection release={defaultRelease} />)
    const section = container.querySelector('section')!

    expect(section.style.willChange).toBe('transform, opacity')

    // Advance 50ms to fire setVisible(true)
    await act(async () => { vi.advanceTimersByTime(50) })
    // With reducedMotion=true, delay is 0 — animationDone fires in the same tick
    await act(async () => { vi.advanceTimersByTime(0) })

    // Should be released immediately, not after 250ms
    expect(section.style.willChange).toBe('auto')

    window.matchMedia = original
  })

  it('sets willChange to "auto" after the entrance animation completes', async () => {
    const { container } = render(<HeroSection release={defaultRelease} />)
    const section = container.querySelector('section')!

    // Before timers run: willChange should promote the element for the animation
    expect(section.style.willChange).toBe('transform, opacity')

    // Advance 50ms to fire setVisible(true), then 250ms more to fire setAnimationDone(true).
    // Two separate act() calls are required so React flushes the state update from the
    // first timer before the second useEffect (keyed on visible) can schedule its own timer.
    await act(async () => { vi.advanceTimersByTime(50) })
    // After setVisible(true) but before animationDone: element still promoted
    expect(section.style.willChange).toBe('transform, opacity')
    await act(async () => { vi.advanceTimersByTime(250) })

    // After the transition window: willChange should be released to 'auto'
    // so the element no longer holds a permanent promoted compositor layer
    expect(section.style.willChange).toBe('auto')
  })
})
