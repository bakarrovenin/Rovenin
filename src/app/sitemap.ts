import type { MetadataRoute } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { projects } from '@/data/studio'
import { getServerSideURL } from '@/utilities/getURL'

// Read the CMS on each request so a newly published post appears without a redeploy.
export const dynamic = 'force-dynamic'

const STATIC_PATHS = ['/', '/research', '/studio', '/services', '/tracker']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = getServerSideURL()
  const payload = await getPayload({ config: configPromise })
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    limit: 1000,
    depth: 0,
    pagination: false,
    select: { slug: true, updatedAt: true },
  })

  return [
    ...STATIC_PATHS.map((path) => ({ url: `${url}${path === '/' ? '' : path}` })),
    ...projects.map((project) => ({ url: `${url}/studio/${project.slug}` })),
    ...posts
      .filter((post) => post.slug)
      .map((post) => ({ url: `${url}/research/${post.slug}`, lastModified: post.updatedAt })),
  ]
}
