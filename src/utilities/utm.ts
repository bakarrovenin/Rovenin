/**
 * UTM tagging for links we share, used by the share row on research posts and by `pnpm utm`.
 *
 * Tagged URLs are always built from a clean page URL: any existing utm_* parameters and the ?internal
 * flag are dropped first, so a link copied during an internal visit can never switch off analytics for
 * whoever opens it.
 */
export const SITE_URL = 'https://www.rovenin.com'

export const UTM_SOURCES = ['x', 'linkedin', 'substack', 'whatsapp', 'email', 'copy'] as const
export type UtmSource = (typeof UTM_SOURCES)[number]
export type UtmMedium = 'social' | 'email' | 'message'

export const mediumFor = (source: UtmSource): UtmMedium => {
  switch (source) {
    case 'substack':
    case 'email':
      return 'email'
    case 'whatsapp':
    case 'copy':
      return 'message'
    default:
      return 'social'
  }
}

/** A slug as a campaign name: dashes become underscores. */
export const campaignFromSlug = (slug: string): string => slug.replace(/-/g, '_')

/** The last path segment of a URL, or "home" for the root. */
export const slugFromUrl = (url: string): string =>
  new URL(url, SITE_URL).pathname.split('/').filter(Boolean).pop() || 'home'

export const tagUrl = (
  url: string,
  source: UtmSource,
  campaign: string = campaignFromSlug(slugFromUrl(url)),
): string => {
  const tagged = new URL(url, SITE_URL)
  for (const key of [...tagged.searchParams.keys()]) {
    if (key === 'internal' || key.startsWith('utm_')) tagged.searchParams.delete(key)
  }
  tagged.searchParams.set('utm_source', source)
  tagged.searchParams.set('utm_medium', mediumFor(source))
  tagged.searchParams.set('utm_campaign', campaign)
  return tagged.toString()
}
