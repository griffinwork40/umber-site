import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { SITE_META } from '@/lib/constants'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: SITE_META.title,
  description: SITE_META.description,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: SITE_META.title,
    description: SITE_META.description,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: SITE_META.title }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <a
          href="#main-content"
          className="sr-only"
          style={{
            position: 'absolute',
            top: 'var(--space-2)',
            left: 'var(--space-2)',
            zIndex: 100,
            padding: 'var(--space-2) var(--space-4)',
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-bg)',
            borderRadius: 'var(--radius-2)',
            fontWeight: 600,
          }}
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
