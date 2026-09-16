import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import InstallSection from './InstallSection'
import { INSTALL_STEPS, GATEKEEPER_COMMAND, SITE_META } from '@/lib/constants'

describe('InstallSection', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    })
  })

  it('renders without throwing', () => {
    render(<InstallSection />)
  })

  it('renders h2 heading "Install"', () => {
    render(<InstallSection />)
    expect(screen.getByRole('heading', { level: 2, name: 'Install' })).toBeInTheDocument()
  })

  it('renders "macOS 14+" badge', () => {
    render(<InstallSection />)
    expect(screen.getByText('macOS 14+')).toBeInTheDocument()
  })

  it('renders the DMG download button', () => {
    render(<InstallSection />)
    const link = screen.getByRole('link', { name: /Download Goblin Portal/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', SITE_META.dmgUrl)
  })

  it('hides Gatekeeper callout by default', () => {
    render(<InstallSection />)
    expect(screen.queryByText((content) => content.includes('xattr -dr com.apple.quarantine'))).not.toBeInTheDocument()
  })

  it('shows Gatekeeper callout after clicking toggle', async () => {
    render(<InstallSection />)
    await userEvent.click(screen.getByRole('button', { name: 'Having trouble opening it?' }))
    expect(screen.getByRole('complementary', { name: 'Gatekeeper note' })).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('xattr -dr com.apple.quarantine'))).toBeInTheDocument()
  })

  it('has section element with id="install"', () => {
    const { container } = render(<InstallSection />)
    expect(container.querySelector('section#install')).toBeInTheDocument()
  })

  it('hides build-from-source steps by default', () => {
    render(<InstallSection />)
    expect(screen.queryByText('Clone the repository')).not.toBeInTheDocument()
  })

  it('shows build-from-source steps after clicking toggle', async () => {
    render(<InstallSection />)
    await userEvent.click(screen.getByRole('button', { name: 'Build from source' }))
    INSTALL_STEPS.forEach((step) => {
      expect(screen.getByText(step.description)).toBeInTheDocument()
    })
  })

  it('toggle button has aria-expanded', () => {
    render(<InstallSection />)
    const btn = screen.getByRole('button', { name: 'Build from source' })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })
})
