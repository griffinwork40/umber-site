import type { MetadataRoute } from 'next'
import { SITE_META } from '@/lib/constants'

/**
 * Next.js metadata convention -- served at /sitemap.xml.
 *
 * Single-page site: one root URL only. Anchor fragments (#features, etc.)
 * are not crawlable resources and should not appear here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_META.siteUrl,
      lastModified: new Date('2026-09-16'),
    },
  ]
}
