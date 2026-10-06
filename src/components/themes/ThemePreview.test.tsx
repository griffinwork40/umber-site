import { describe, it, expect } from 'vitest'
import { previewFrameStyle } from './ThemePreview'
import { THEMES } from '@/lib/constants'

/*
 * Regression guard for the item-1 fix: previewFrameStyle must not interpolate
 * raw palette hex strings into color-mix() values. Instead it must return CSS
 * custom property assignments (--preview-dim, --preview-glow) that the static
 * rule in polish.css consumes.
 */
describe('previewFrameStyle', () => {
  const theme = THEMES[0]
  const style = previewFrameStyle(theme)

  it('sets --preview-dim to the palette ansi[8] value', () => {
    expect((style as Record<string, string>)['--preview-dim']).toBe(theme.ansi[8])
  })

  it('sets --preview-glow to the palette cursor value', () => {
    expect((style as Record<string, string>)['--preview-glow']).toBe(theme.cursor)
  })

  it('does not contain a color-mix() string in any value', () => {
    const values = Object.values(style as Record<string, string>)
    expect(values.some((v) => v.includes('color-mix'))).toBe(false)
  })

  it('does not contain boxShadow', () => {
    expect('boxShadow' in style).toBe(false)
  })

  it('preserves borderRadius and overflow', () => {
    expect(style.borderRadius).toBe('var(--radius-4)')
    expect(style.overflow).toBe('hidden')
  })
})
