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

  it('renders all 6 features as articles', () => {
    render(<FeaturesSection />)
    expect(screen.getAllByRole('article')).toHaveLength(6)
  })

  it('renders all 6 feature titles as h3 headings', () => {
    render(<FeaturesSection />)
    FEATURES.forEach((feature) => {
      expect(screen.getByRole('heading', { level: 3, name: feature.title })).toBeInTheDocument()
    })
  })

  it('renders all 6 feature descriptions', () => {
    render(<FeaturesSection />)
    FEATURES.forEach((feature) => {
      expect(screen.getByText(feature.description)).toBeInTheDocument()
    })
  })

  it('has section element with id="features"', () => {
    const { container } = render(<FeaturesSection />)
    expect(container.querySelector('section#features')).toBeInTheDocument()
  })

  it('renders "Zero-Overhead Host" feature', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('Zero-Overhead Host')).toBeInTheDocument()
  })

  it('renders "Measured Themes" feature', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('Measured Themes')).toBeInTheDocument()
  })

  it('renders "GPU or CPU Rendering" feature', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('GPU or CPU Rendering')).toBeInTheDocument()
  })

  it('renders an accent icon for every feature, lead included', () => {
    const { container } = render(<FeaturesSection />)
    const articles = container.querySelectorAll('article')
    articles.forEach((article) => {
      expect(article.querySelector('.feature-icon svg')).not.toBeNull()
    })
    expect(articles).toHaveLength(6)
  })

  it('gives compact features a hoverable card surface', () => {
    const { container } = render(<FeaturesSection />)
    expect(container.querySelectorAll('article.feature-card')).toHaveLength(5)
  })

  it('hero feature article has a border-left style', () => {
    const { container } = render(<FeaturesSection />)
    // The first article is the hero article with borderLeft style
    const articles = container.querySelectorAll('article')
    const heroArticle = articles[0]
    const style = heroArticle.getAttribute('style') ?? ''
    expect(style).toMatch(/border-left/)
  })
})
