import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FaqSection from './FaqSection'
import { FAQ } from '@/lib/faq'

describe('FaqSection', () => {
  it('renders without throwing', () => {
    render(<FaqSection />)
  })

  it('renders the h2 heading "Reasonable objections."', () => {
    render(<FaqSection />)
    expect(
      screen.getByRole('heading', { level: 2, name: 'Reasonable objections' }),
    ).toBeInTheDocument()
  })

  it('has a section element with id="faq"', () => {
    const { container } = render(<FaqSection />)
    expect(container.querySelector('section#faq')).toBeInTheDocument()
  })

  it('section is labelled by the h2 via aria-labelledby', () => {
    const { container } = render(<FaqSection />)
    const section = container.querySelector('section#faq')
    expect(section).toHaveAttribute('aria-labelledby', 'faq-heading')
  })

  it('renders every FAQ question in a summary element', () => {
    render(<FaqSection />)
    FAQ.forEach((entry) => {
      expect(screen.getByText(entry.question)).toBeInTheDocument()
    })
  })

  it('renders every FAQ answer in the DOM', () => {
    render(<FaqSection />)
    FAQ.forEach((entry) => {
      expect(screen.getByText(entry.answer)).toBeInTheDocument()
    })
  })

  it('renders the correct number of details elements', () => {
    const { container } = render(<FaqSection />)
    const items = container.querySelectorAll('details')
    expect(items.length).toBe(FAQ.length)
  })

  it('each question is inside a summary element', () => {
    const { container } = render(<FaqSection />)
    const summaries = container.querySelectorAll('summary')
    expect(summaries.length).toBe(FAQ.length)
  })
})
