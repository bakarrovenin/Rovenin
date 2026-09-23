import { NextResponse, type NextRequest } from 'next/server'

/**
 * Research posts moved from /posts/<slug> to /research/<slug>. A published post gets a 301 to its new
 * address; anything else (unknown slugs, /posts/page) falls through to the old route. Draft mode
 * (the CMS preview) is left alone, since /research only renders published posts.
 */
export async function middleware(request: NextRequest) {
  const slug = request.nextUrl.pathname.split('/')[2]
  if (!slug || request.cookies.has('__prerender_bypass')) return NextResponse.next()

  const api = new URL('/api/posts', request.nextUrl.origin)
  api.searchParams.set('where[slug][equals]', slug)
  api.searchParams.set('where[_status][equals]', 'published')
  api.searchParams.set('limit', '1')
  api.searchParams.set('depth', '0')

  try {
    const res = await fetch(api, { cache: 'no-store' })
    if (res.ok && ((await res.json()) as { totalDocs?: number }).totalDocs) {
      const target = request.nextUrl.clone()
      target.pathname = `/research/${slug}`
      return NextResponse.redirect(target, 301)
    }
  } catch {
    // If the lookup fails, serve the old route rather than guess.
  }
  return NextResponse.next()
}

export const config = { matcher: '/posts/:slug' }
