import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FeaturesSection from './FeaturesSection'
import { FEATURES } from '@/lib/constants'

describe('FeaturesSection', () => {
  it('renders without throwing', () => {
    render(<FeaturesSection />)
  })

  it('renders the h2 heading', () => {
    render(<FeaturesSection />)
    expect(screen.getByRole('heading', { level: 2, name: 'No AI built in, on purpose' })).toBeInTheDocument()
  })

  it('renders all features as articles (hero + compact)', () => {
    render(<FeaturesSection />)
    // one article for hero + one per remaining feature
    expect(screen.getAllByRole('article')).toHaveLength(FEATURES.length)
  })

  it('renders all feature titles as h3 headings', () => {
    render(<FeaturesSection />)
    FEATURES.forEach((feature) => {
      expect(screen.getByRole('heading', { level: 3, name: feature.title })).toBeInTheDocument()
    })
  })

  it('renders all feature descriptions', () => {
    render(<FeaturesSection />)
    FEATURES.forEach((feature) => {
      expect(screen.getByText(feature.description)).toBeInTheDocument()
    })
  })

  it('has section element with id="features"', () => {
    const { container } = render(<FeaturesSection />)
    expect(container.querySelector('section#features')).toBeInTheDocument()
  })

  it('renders the lead "Zero-Overhead Host" feature', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('Zero-Overhead Host')).toBeInTheDocument()
  })

  it('renders an icon for every feature article', () => {
    const { container } = render(<FeaturesSection />)
    const articles = container.querySelectorAll('article')
    articles.forEach((article) => {
      expect(article.querySelector('.feature-icon svg')).not.toBeNull()
    })
    expect(articles).toHaveLength(FEATURES.length)
  })

  it('compact feature cards have feature-card class', () => {
    const { container } = render(<FeaturesSection />)
    // All features except the hero sit in compact cards
    const compactCards = container.querySelectorAll('article.feature-card')
    expect(compactCards).toHaveLength(FEATURES.length - 1)
  })

  it('hero feature article has a border-left style', () => {
    const { container } = render(<FeaturesSection />)
    const articles = container.querySelectorAll('article')
    const heroArticle = articles[0]
    const style = heroArticle.getAttribute('style') ?? ''
    expect(style).toMatch(/border-left/)
  })

  it('labels the section region with its heading', () => {
    render(<FeaturesSection />)
    expect(screen.getByRole('region', { name: 'No AI built in, on purpose' })).toBeInTheDocument()
  })
})
