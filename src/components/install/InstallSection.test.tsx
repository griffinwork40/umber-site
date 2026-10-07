import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import InstallSection from './InstallSection'
import { INSTALL_STEPS, SITE_META } from '@/lib/constants'

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

  it('renders h2 heading "Two and a half megabytes. No account."', () => {
    render(<InstallSection />)
    expect(
      screen.getByRole('heading', { level: 2, name: 'Two and a half megabytes. No account.' }),
    ).toBeInTheDocument()
  })

  it('renders the lead paragraph', () => {
    render(<InstallSection />)
    expect(
      screen.getByText('Download it, drag it to Applications, open it. That is the whole onboarding.'),
    ).toBeInTheDocument()
  })

  it('renders requirements text with license', () => {
    render(<InstallSection />)
    const reqEl = screen.getByText((content) =>
      content.includes(SITE_META.requirements) && content.includes(SITE_META.license),
    )
    expect(reqEl).toBeInTheDocument()
  })

  it('renders the DMG download button linking to dmgUrl', () => {
    render(<InstallSection />)
    const link = screen.getByRole('link', { name: /Download Goblin Portal/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', SITE_META.dmgUrl)
  })

  it('does NOT render the Gatekeeper block', () => {
    render(<InstallSection />)
    expect(screen.queryByText(/Having trouble opening it/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/xattr/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/quarantine/i)).not.toBeInTheDocument()
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

  it('renders closing line "You read the FAQ. Nobody reads the FAQ."', () => {
    render(<InstallSection />)
    expect(
      screen.getByText('You read the FAQ. Nobody reads the FAQ.'),
    ).toBeInTheDocument()
  })

  it('labels the section region with its heading', () => {
    render(<InstallSection />)
    expect(screen.getByRole('region', { name: 'Two and a half megabytes. No account.' })).toBeInTheDocument()
  })
})
