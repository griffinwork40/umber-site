/**
 * Server-only module — fetches the latest Goblin Portal release from the
 * GitHub Releases API and returns normalised release metadata.
 *
 * `getLatestRelease` is the async entry point for Server Components / Route
 * Handlers.  `parseLatestRelease` is a pure, synchronous function exported
 * separately so it can be unit-tested without any network access.
 *
 * Fallback contract: on ANY failure (network error, non-200 status, missing
 * DMG asset, malformed tag) the static SITE_META values are returned instead
 * of throwing.  The page never goes blank because of a transient API hiccup.
 */

import 'server-only'
import { SITE_META } from '@/lib/constants'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ReleaseInfo {
  version: string
  dmgUrl: string
  downloadSize: string
  publishedAt: string
}

interface GitHubAsset {
  name: string
  browser_download_url: string
  size: number
}

interface GitHubRelease {
  tag_name: string
  published_at: string
  assets: GitHubAsset[]
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const API_URL =
  'https://api.github.com/repos/griffinwork40/goblin-portal/releases/latest'

const TRUSTED_DOWNLOAD_PREFIX =
  'https://github.com/griffinwork40/goblin-portal/releases/download/'

// Static fallback — values stay in sync with SITE_META hand-edits.
export const FALLBACK_RELEASE: ReleaseInfo = {
  version: SITE_META.version,
  dmgUrl: SITE_META.dmgUrl,
  downloadSize: SITE_META.downloadSize,
  publishedAt: '',
}

// ---------------------------------------------------------------------------
// Pure parsing logic (testable without network)
// ---------------------------------------------------------------------------

/**
 * Parse a raw GitHub release API response into a `ReleaseInfo`.
 *
 * Returns `null` when the response is missing required fields or the DMG
 * asset cannot be trusted (non-https / wrong origin).
 */
export function parseLatestRelease(data: unknown): ReleaseInfo | null {
  if (!data || typeof data !== 'object') return null

  const release = data as Partial<GitHubRelease>

  const tagName = release.tag_name
  if (typeof tagName !== 'string' || !tagName.startsWith('v')) return null

  const publishedAt =
    typeof release.published_at === 'string' ? release.published_at : ''

  if (!Array.isArray(release.assets)) return null

  // Expected filename: GoblinPortal-<tag>.dmg  (e.g. GoblinPortal-v1.8.0.dmg)
  const expectedName = `GoblinPortal-${tagName}.dmg`
  const asset = (release.assets as GitHubAsset[]).find(
    (a) => a.name === expectedName,
  )
  if (!asset) return null

  const dmgUrl = asset.browser_download_url
  if (
    typeof dmgUrl !== 'string' ||
    !dmgUrl.startsWith(TRUSTED_DOWNLOAD_PREFIX)
  ) {
    return null
  }

  // Format bytes → human-readable size matching the existing "2.5 MB" style.
  const mb = asset.size / (1024 * 1024)
  const downloadSize = `${mb.toFixed(1)} MB`

  return {
    version: tagName,
    dmgUrl,
    downloadSize,
    publishedAt,
  }
}

// ---------------------------------------------------------------------------
// Network fetch (server-only)
// ---------------------------------------------------------------------------

/**
 * Fetch the latest Goblin Portal release from the GitHub API.
 *
 * - ISR revalidation: 600 s (10 min).  A stale CDN edge page is fine; the
 *   asset URL and size don't change after a release is published.
 * - Authorization: uses GITHUB_TOKEN if set (60 req/h unauthenticated per IP;
 *   5,000 req/h with a token — either is fine for a marketing page).
 * - Never throws; returns FALLBACK_RELEASE on any error.
 */
export async function getLatestRelease(): Promise<ReleaseInfo> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const res = await fetch(API_URL, {
      headers,
      next: { revalidate: 600 },
    })

    if (!res.ok) return FALLBACK_RELEASE

    const data: unknown = await res.json()
    const parsed = parseLatestRelease(data)
    return parsed ?? FALLBACK_RELEASE
  } catch {
    return FALLBACK_RELEASE
  }
}
