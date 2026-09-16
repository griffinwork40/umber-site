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

  it('renders exactly 8 feature cards', () => {
    render(<FeaturesSection />)
    expect(screen.getAllByRole('article')).toHaveLength(8)
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

  it('renders "SwiftTerm Rendering" feature', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('SwiftTerm Rendering')).toBeInTheDocument()
  })

  it('renders "$EDITOR Support" feature', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('$EDITOR Support')).toBeInTheDocument()
  })

  it('renders "Vertical Splits" feature', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('Vertical Splits')).toBeInTheDocument()
  })
})
