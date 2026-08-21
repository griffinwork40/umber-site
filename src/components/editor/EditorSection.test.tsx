import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EditorSection from './EditorSection'
import { EDITOR_FEATURES, SHOWCASE_ITEMS } from '@/lib/constants'

describe('EditorSection', () => {
  it('renders without throwing', () => {
    render(<EditorSection />)
  })

  it('renders the h2 heading', () => {
    render(<EditorSection />)
    expect(screen.getByRole('heading', { level: 2, name: 'More than a terminal' })).toBeInTheDocument()
  })

  it('has section element with id="editor"', () => {
    const { container } = render(<EditorSection />)
    expect(container.querySelector('section#editor')).toBeInTheDocument()
  })

  it('renders all editor feature cards', () => {
    render(<EditorSection />)
    EDITOR_FEATURES.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument()
      expect(screen.getByText(feature.description)).toBeInTheDocument()
    })
  })

  it('renders showcase item titles', () => {
    render(<EditorSection />)
    SHOWCASE_ITEMS.forEach((item) => {
      expect(screen.getByRole('heading', { level: 3, name: item.title })).toBeInTheDocument()
    })
  })

  it('renders showcase images with alt text', () => {
    render(<EditorSection />)
    SHOWCASE_ITEMS.forEach((item) => {
      expect(screen.getByAltText(item.imageAlt)).toBeInTheDocument()
    })
  })

  it('renders showcase bullet points', () => {
    render(<EditorSection />)
    SHOWCASE_ITEMS.forEach((item) => {
      item.bullets.forEach((bullet) => {
        expect(screen.getByText(bullet)).toBeInTheDocument()
      })
    })
  })
})
