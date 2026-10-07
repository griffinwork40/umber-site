import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WhatsNew from './WhatsNew'
import { RELEASE, SITE_META } from '@/lib/constants'

describe('WhatsNew', () => {
  it('renders without throwing', () => {
    render(<WhatsNew />)
  })

  it('has section element with id="whats-new"', () => {
    const { container } = render(<WhatsNew />)
    expect(container.querySelector('section#whats-new')).toBeInTheDocument()
  })

  it('h2 reads "New in <version>"', () => {
    render(<WhatsNew />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: `New in ${RELEASE.version}`,
      }),
    ).toBeInTheDocument()
  })

  it('section has aria-labelledby wired to the h2 id', () => {
    const { container } = render(<WhatsNew />)
    const section = container.querySelector('section#whats-new')
    expect(section).toHaveAttribute('aria-labelledby', 'whats-new-heading')
    expect(container.querySelector('#whats-new-heading')).toBeInTheDocument()
  })

  it('renders the release date', () => {
    render(<WhatsNew />)
    expect(screen.getByText(RELEASE.date)).toBeInTheDocument()
  })

  it('renders all highlight card titles', () => {
    render(<WhatsNew />)
    RELEASE.highlights.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })

  it('renders the download CTA with dmgUrl href', () => {
    render(<WhatsNew />)
    const downloadLink = screen.getByRole('link', {
      name: new RegExp(`Download ${RELEASE.version}`),
    })
    expect(downloadLink).toBeInTheDocument()
    expect(downloadLink).toHaveAttribute('href', SITE_META.dmgUrl)
  })

  it('renders the release notes CTA with releasesUrl href', () => {
    render(<WhatsNew />)
    const notesLink = screen.getByRole('link', { name: /Full release notes/ })
    expect(notesLink).toBeInTheDocument()
    expect(notesLink).toHaveAttribute(
      'href',
      `${SITE_META.releasesUrl}/tag/${RELEASE.version}`,
    )
  })
})
