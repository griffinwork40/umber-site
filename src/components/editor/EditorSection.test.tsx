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
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Review the diff where the agent wrote it',
      }),
    ).toBeInTheDocument()
  })

  it('has section element with id="workspace"', () => {
    const { container } = render(<EditorSection />)
    expect(container.querySelector('section#workspace')).toBeInTheDocument()
  })

  it('renders all editor feature cards', () => {
    render(<EditorSection />)
    EDITOR_FEATURES.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument()
      expect(screen.getByText(feature.description)).toBeInTheDocument()
    })
  })

  it('renders cards for all four feature titles', () => {
    render(<EditorSection />)
    const expectedTitles = [
      'Source Control',
      'Side-by-Side Diffs',
      'Syntax Highlighting',
      'Palette, Symbols, Multi-Cursor',
    ]
    expectedTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument()
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

  it('labels the section region with its heading', () => {
    render(<EditorSection />)
    expect(screen.getByRole('region', { name: 'Review the diff where the agent wrote it' })).toBeInTheDocument()
  })
})
