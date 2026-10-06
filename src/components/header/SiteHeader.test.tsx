import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import SiteHeader, { HEADER_REVEAL_Y } from './SiteHeader'

describe('SiteHeader', () => {
  beforeEach(() => {
    // Reset scroll position before each test
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders without throwing', () => {
    render(<SiteHeader />)
  })

  it('has aria-label="Site navigation" on the header element', () => {
    const { container } = render(<SiteHeader />)
    const header = container.querySelector('header')
    expect(header).toHaveAttribute('aria-label', 'Site navigation')
  })

  it('renders all six nav links', () => {
    render(<SiteHeader />)
    expect(screen.getByRole('link', { name: 'Features' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Agents' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Editor' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Themes' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Install' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Keymap' })).toBeInTheDocument()
  })

  it('nav links have correct href attributes', () => {
    render(<SiteHeader />)
    expect(screen.getByRole('link', { name: 'Features' })).toHaveAttribute('href', '#features')
    expect(screen.getByRole('link', { name: 'Agents' })).toHaveAttribute('href', '#agents')
    expect(screen.getByRole('link', { name: 'Editor' })).toHaveAttribute('href', '#editor')
    expect(screen.getByRole('link', { name: 'Themes' })).toHaveAttribute('href', '#themes')
    expect(screen.getByRole('link', { name: 'Install' })).toHaveAttribute('href', '#install')
    expect(screen.getByRole('link', { name: 'Keymap' })).toHaveAttribute('href', '#keymap')
  })

  it('renders Download button', () => {
    render(<SiteHeader />)
    const downloadEl = screen.getByText('Download')
    expect(downloadEl).toBeInTheDocument()
  })

  it('Download link has btn-primary class', () => {
    render(<SiteHeader />)
    // The Button component renders as an <a> when href is provided
    const downloadLink = screen.getByText('Download').closest('a, button')
    expect(downloadLink).toHaveClass('btn-primary')
  })

  it('header is initially hidden (opacity 0) at scrollY=0', () => {
    const { container } = render(<SiteHeader />)
    const header = container.querySelector('header')
    // At scrollY=0, visible state is false → hiddenStyle applied → opacity 0
    expect(header).toHaveStyle({ opacity: 0 })
  })

  describe('reveal threshold', () => {
    const rafQueue: FrameRequestCallback[] = []
    beforeEach(() => {
      rafQueue.length = 0
      vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => rafQueue.push(cb))
      vi.stubGlobal('cancelAnimationFrame', vi.fn())
    })
    afterEach(() => {
      vi.unstubAllGlobals()
    })

    const scrollTo = async (y: number) => {
      Object.defineProperty(window, 'scrollY', { value: y, writable: true })
      await act(async () => {
        fireEvent.scroll(window)
        rafQueue.splice(0).forEach((cb) => cb(performance.now()))
      })
    }

    it('stays hidden at the threshold', async () => {
      const { container } = render(<SiteHeader />)
      await scrollTo(HEADER_REVEAL_Y)
      expect(container.querySelector('header')).toHaveStyle({ opacity: 0 })
    })

    it('appears just past the threshold', async () => {
      const { container } = render(<SiteHeader />)
      await scrollTo(HEADER_REVEAL_Y + 1)
      expect(container.querySelector('header')).not.toHaveStyle({ opacity: 0 })
    })

    it('reveals before the old 500px threshold', () => {
      expect(HEADER_REVEAL_Y).toBeLessThan(500)
    })
  })
})
