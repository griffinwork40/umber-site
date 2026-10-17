import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import SiteHeader, { HEADER_REVEAL_Y } from './SiteHeader'
import { SITE_META } from '@/lib/constants'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Set window.scrollY to an arbitrary value. */
function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    writable: true,
    value,
  })
}

/** Fire the window scroll event synchronously. */
function fireScroll() {
  window.dispatchEvent(new Event('scroll'))
}

// ─── Fake rAF / cAF ──────────────────────────────────────────────────────────

let rafCallbacks: Map<number, FrameRequestCallback>
let rafIdCounter: number

function installFakeRaf() {
  rafCallbacks = new Map()
  rafIdCounter = 1

  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
    const id = rafIdCounter++
    rafCallbacks.set(id, cb)
    return id
  })

  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
    rafCallbacks.delete(id)
  })
}

/** Flush all pending rAF callbacks (simulates the browser running a frame). */
function flushRaf() {
  const pending = Array.from(rafCallbacks.entries())
  rafCallbacks.clear()
  pending.forEach(([, cb]) => cb(performance.now()))
}

// ─── Suite ────────────────────────────────────────────────────────────────────

describe('SiteHeader', () => {
  beforeEach(() => {
    setScrollY(0)
    installFakeRaf()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ── 1. Initial visibility ──────────────────────────────────────────────────

  it('renders without throwing', () => {
    render(<SiteHeader dmgUrl={SITE_META.dmgUrl} />)
  })

  it('header is hidden at mount (visible = false)', () => {
    const { container } = render(<SiteHeader dmgUrl={SITE_META.dmgUrl} />)
    const header = container.querySelector('header')!
    // The hiddenStyle applies transform: translateY(-100%) when not visible
    expect(header.getAttribute('style')).toMatch(/translateY\(-100%\)/)
  })

  it('has the site navigation aria-label', () => {
    render(<SiteHeader dmgUrl={SITE_META.dmgUrl} />)
    expect(screen.getByRole('banner', { name: 'Site navigation' })).toBeInTheDocument()
  })

  // ── 2. Visible after scroll > HEADER_REVEAL_Y ─────────────────────────────

  it('becomes visible after scrollY exceeds HEADER_REVEAL_Y', () => {
    const { container } = render(<SiteHeader dmgUrl={SITE_META.dmgUrl} />)

    act(() => {
      setScrollY(HEADER_REVEAL_Y + 1)
      fireScroll()
      flushRaf()
    })

    const header = container.querySelector('header')!
    expect(header.getAttribute('style')).not.toMatch(/translateY\(-100%\)/)
  })

  it('remains hidden when scrollY is exactly at HEADER_REVEAL_Y (not greater)', () => {
    const { container } = render(<SiteHeader dmgUrl={SITE_META.dmgUrl} />)

    act(() => {
      setScrollY(HEADER_REVEAL_Y)
      fireScroll()
      flushRaf()
    })

    const header = container.querySelector('header')!
    expect(header.getAttribute('style')).toMatch(/translateY\(-100%\)/)
  })

  it('hides again after scrolling back below threshold', () => {
    const { container } = render(<SiteHeader dmgUrl={SITE_META.dmgUrl} />)

    // Scroll down to reveal
    act(() => {
      setScrollY(HEADER_REVEAL_Y + 200)
      fireScroll()
      flushRaf()
    })

    // Scroll back up to hide
    act(() => {
      setScrollY(0)
      fireScroll()
      flushRaf()
    })

    const header = container.querySelector('header')!
    expect(header.getAttribute('style')).toMatch(/translateY\(-100%\)/)
  })

  // ── 3. cancelAnimationFrame called on unmount when frame is pending ────────

  it('calls cancelAnimationFrame on unmount when a frame is pending', () => {
    const { unmount } = render(<SiteHeader dmgUrl={SITE_META.dmgUrl} />)

    // Schedule a rAF by scrolling (but do NOT flush it, so it stays pending)
    act(() => {
      setScrollY(HEADER_REVEAL_Y + 1)
      fireScroll()
      // intentionally skip flushRaf() — frame is still queued
    })

    expect(rafCallbacks.size).toBe(1)

    act(() => {
      unmount()
    })

    expect(window.cancelAnimationFrame).toHaveBeenCalledTimes(1)
  })

  it('does not call cancelAnimationFrame on unmount when no frame is pending', () => {
    const { unmount } = render(<SiteHeader dmgUrl={SITE_META.dmgUrl} />)

    // No scroll, no rAF enqueued
    act(() => {
      unmount()
    })

    expect(window.cancelAnimationFrame).not.toHaveBeenCalled()
  })

  // ── 4. Dedup guard — setVisible not called when shouldShow === lastVisible ─

  it('does not schedule a second rAF for the same scroll event (throttle guard)', () => {
    render(<SiteHeader dmgUrl={SITE_META.dmgUrl} />)

    act(() => {
      setScrollY(HEADER_REVEAL_Y + 1)
      // Fire scroll twice without flushing rAF between them
      fireScroll()
      fireScroll()
    })

    // Only one rAF should have been requested (the second scroll is a no-op
    // because rafId.current is already non-zero)
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1)
  })

  it('does not trigger a re-render when shouldShow equals lastVisible (dedup)', () => {
    const { container } = render(<SiteHeader dmgUrl={SITE_META.dmgUrl} />)

    // First: scroll past threshold — changes lastVisible from false → true
    act(() => {
      setScrollY(HEADER_REVEAL_Y + 1)
      fireScroll()
      flushRaf()
    })

    const styleBefore = container.querySelector('header')!.getAttribute('style')

    // Second: fire another scroll at the same scrollY — shouldShow still true,
    // equals lastVisible, so setVisible must NOT be called again (DOM unchanged)
    act(() => {
      fireScroll()
      flushRaf()
    })

    const styleAfter = container.querySelector('header')!.getAttribute('style')
    expect(styleAfter).toBe(styleBefore)
  })

  // ── 5. Scroll listener uses { passive: true } ─────────────────────────────

  it('registers the scroll listener with { passive: true }', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')

    render(<SiteHeader dmgUrl={SITE_META.dmgUrl} />)

    const scrollCall = addEventListenerSpy.mock.calls.find(
      ([event]) => event === 'scroll'
    )

    expect(scrollCall).toBeDefined()
    expect(scrollCall![2]).toMatchObject({ passive: true })
  })

  it('removes the scroll listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = render(<SiteHeader dmgUrl={SITE_META.dmgUrl} />)

    act(() => {
      unmount()
    })

    const removeScrollCall = removeEventListenerSpy.mock.calls.find(
      ([event]) => event === 'scroll'
    )
    expect(removeScrollCall).toBeDefined()
  })
})
