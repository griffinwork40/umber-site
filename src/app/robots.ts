import type { MetadataRoute } from 'next'
import { SITE_META } from '@/lib/constants'

/**
 * Next.js metadata convention -- served at /robots.txt.
 *
 * Public marketing site: allow everything. Explicitly allow major AI crawlers
 * so they don't deprioritize the site when checking for their own user-agent.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'GPTBot',
          'ClaudeBot',
          'PerplexityBot',
          'Applebot',
          'Bytespider',
        ],
        allow: '/',
      },
    ],
    sitemap: `${SITE_META.siteUrl}/sitemap.xml`,
  }
}
