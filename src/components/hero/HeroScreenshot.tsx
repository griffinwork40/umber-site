import React from 'react'
import Image from 'next/image'

const screenshotWrapStyle: React.CSSProperties = {
  flex: '1 1 560px',
  minWidth: 0,
  maxWidth: 880,
  /*
   * Bleed past the content column so the product shot dominates the fold,
   * but cap the bleed at the actual available right margin to avoid clipping.
   *
   * Available right gutter = section padding (var(--space-6) = 24px) plus
   * half the space outside the 1280px inner container, when viewport is wide
   * enough: max(0px, (100vw - 1328px) / 2).
   * 1328 = 1280 inner max-width + 2×24px section padding.
   * 16px slack absorbs the classic scrollbar (100vw includes scrollbar width).
   *
   * Bleed is capped at var(--space-10) = 64px so it never exceeds the design
   * intent on very wide viewports.
   *
   * At ≤1100px, polish.css resets margin-right to 0 via !important.
   */
  marginRight: 'calc(-1 * min(var(--space-10), var(--space-6) + max(0px, (100vw - 1328px - 16px) / 2)))',
  position: 'relative',
}

const screenshotImgStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  display: 'block',
  borderRadius: 'var(--radius-3)',
  boxShadow: '0 20px 60px var(--color-shadow)',
}

export default function HeroScreenshot() {
  return (
    <div style={screenshotWrapStyle} className="hero-screenshot contour-frame">
      <Image
        src="/images/goblin-portal-screenshot.png"
        alt="Goblin Portal running agent-afk with sidebar file tree and syntax-highlighted output"
        width={1392}
        height={1006}
        style={screenshotImgStyle}
        priority
      />
    </div>
  )
}
