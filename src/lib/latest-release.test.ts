/**
 * Unit tests for parseLatestRelease.
 * No network access — tests operate only on in-memory fixture objects.
 */

import { describe, it, expect } from 'vitest'
import { parseLatestRelease, FALLBACK_RELEASE } from './latest-release'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const VALID_RELEASE = {
  tag_name: 'v1.8.0',
  published_at: '2026-10-07T12:00:00Z',
  assets: [
    {
      name: 'GoblinPortal-v1.8.0.dmg',
      browser_download_url:
        'https://github.com/griffinwork40/goblin-portal/releases/download/v1.8.0/GoblinPortal-v1.8.0.dmg',
      size: 2_506_173,
    },
    {
      name: 'GoblinPortal-v1.8.0.dmg.sha256',
      browser_download_url:
        'https://github.com/griffinwork40/goblin-portal/releases/download/v1.8.0/GoblinPortal-v1.8.0.dmg.sha256',
      size: 88,
    },
  ],
}

// ---------------------------------------------------------------------------
// Happy path
// ---------------------------------------------------------------------------

describe('parseLatestRelease — valid release', () => {
  it('returns the correct version', () => {
    const result = parseLatestRelease(VALID_RELEASE)
    expect(result?.version).toBe('v1.8.0')
  })

  it('returns the DMG download URL', () => {
    const result = parseLatestRelease(VALID_RELEASE)
    expect(result?.dmgUrl).toBe(
      'https://github.com/griffinwork40/goblin-portal/releases/download/v1.8.0/GoblinPortal-v1.8.0.dmg',
    )
  })

  it('formats download size as "X.X MB"', () => {
    const result = parseLatestRelease(VALID_RELEASE)
    // 2_506_173 bytes ÷ 1024 ÷ 1024 ≈ 2.39 MB → "2.4 MB"
    expect(result?.downloadSize).toBe('2.4 MB')
  })

  it('returns publishedAt', () => {
    const result = parseLatestRelease(VALID_RELEASE)
    expect(result?.publishedAt).toBe('2026-10-07T12:00:00Z')
  })
})

// ---------------------------------------------------------------------------
// Missing DMG asset
// ---------------------------------------------------------------------------

describe('parseLatestRelease — missing DMG asset', () => {
  it('returns null when no asset matches the expected filename', () => {
    const data = {
      ...VALID_RELEASE,
      assets: [
        {
          name: 'GoblinPortal-v1.8.0.dmg.sha256',
          browser_download_url:
            'https://github.com/griffinwork40/goblin-portal/releases/download/v1.8.0/GoblinPortal-v1.8.0.dmg.sha256',
          size: 88,
        },
      ],
    }
    expect(parseLatestRelease(data)).toBeNull()
  })

  it('returns null when assets array is empty', () => {
    expect(parseLatestRelease({ ...VALID_RELEASE, assets: [] })).toBeNull()
  })

  it('returns null when assets key is missing', () => {
    const { assets: _a, ...rest } = VALID_RELEASE
    expect(parseLatestRelease(rest)).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Non-https / foreign URL rejected
// ---------------------------------------------------------------------------

describe('parseLatestRelease — untrusted download URL', () => {
  it('returns null when dmg URL does not start with the trusted prefix (http)', () => {
    const data = {
      ...VALID_RELEASE,
      assets: [
        {
          name: 'GoblinPortal-v1.8.0.dmg',
          browser_download_url:
            'http://github.com/griffinwork40/goblin-portal/releases/download/v1.8.0/GoblinPortal-v1.8.0.dmg',
          size: 2_506_173,
        },
      ],
    }
    expect(parseLatestRelease(data)).toBeNull()
  })

  it('returns null when dmg URL is from a foreign host', () => {
    const data = {
      ...VALID_RELEASE,
      assets: [
        {
          name: 'GoblinPortal-v1.8.0.dmg',
          browser_download_url:
            'https://evil.example.com/releases/download/v1.8.0/GoblinPortal-v1.8.0.dmg',
          size: 2_506_173,
        },
      ],
    }
    expect(parseLatestRelease(data)).toBeNull()
  })

  it('returns null when dmg URL is an empty string', () => {
    const data = {
      ...VALID_RELEASE,
      assets: [
        {
          name: 'GoblinPortal-v1.8.0.dmg',
          browser_download_url: '',
          size: 2_506_173,
        },
      ],
    }
    expect(parseLatestRelease(data)).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Malformed tag
// ---------------------------------------------------------------------------

describe('parseLatestRelease — malformed tag', () => {
  it('returns null when tag_name does not start with "v"', () => {
    expect(parseLatestRelease({ ...VALID_RELEASE, tag_name: '1.8.0' })).toBeNull()
  })

  it('returns null when tag_name is missing', () => {
    const { tag_name: _t, ...rest } = VALID_RELEASE
    expect(parseLatestRelease(rest)).toBeNull()
  })

  it('returns null when tag_name is not a string', () => {
    expect(parseLatestRelease({ ...VALID_RELEASE, tag_name: 180 })).toBeNull()
  })

  it('returns null when the input is null', () => {
    expect(parseLatestRelease(null)).toBeNull()
  })

  it('returns null when the input is a plain string', () => {
    expect(parseLatestRelease('not an object')).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// FALLBACK_RELEASE sanity check
// ---------------------------------------------------------------------------

describe('FALLBACK_RELEASE', () => {
  it('version starts with "v"', () => {
    expect(FALLBACK_RELEASE.version).toMatch(/^v\d+\.\d+\.\d+/)
  })

  it('dmgUrl points to the trusted prefix', () => {
    expect(FALLBACK_RELEASE.dmgUrl).toMatch(
      /^https:\/\/github\.com\/griffinwork40\/goblin-portal\/releases\/download\//,
    )
  })

  it('downloadSize is a non-empty string', () => {
    expect(FALLBACK_RELEASE.downloadSize.length).toBeGreaterThan(0)
  })
})
