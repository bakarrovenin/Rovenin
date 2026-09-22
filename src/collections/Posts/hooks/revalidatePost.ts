import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Post } from '../../../payload-types'

/**
 * Posts are read on /research and /research/[slug]. Both routes are
 * force-dynamic today, so this is belt and braces: it keeps the site correct
 * if either route is ever switched to static rendering.
 *
 * Every call is wrapped so that a revalidation failure can only ever be
 * logged. This hook runs inside the same database transaction as the publish,
 * and anything thrown here would roll the publish back while the admin still
 * reports success.
 */
const safeRevalidate = (payload: { logger: { info: (msg: string) => void; error: (msg: string) => void } }, path: string) => {
  try {
    payload.logger.info(`Revalidating ${path}`)
    revalidatePath(path)
  } catch (err) {
    payload.logger.error(`Revalidation of ${path} failed, continuing: ${String(err)}`)
  }
}

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  const isPublished = doc._status === 'published'
  const wasPublished = previousDoc?._status === 'published'

  // Any change to a published post, or a post leaving the published state,
  // changes what the listing shows.
  if (isPublished || wasPublished) {
    safeRevalidate(payload, '/research')
  }

  if (isPublished && doc.slug) {
    safeRevalidate(payload, `/research/${doc.slug}`)
  }

  // The old URL needs clearing when a post is unpublished or its slug changes.
  if (wasPublished && previousDoc?.slug && (!isPublished || previousDoc.slug !== doc.slug)) {
    safeRevalidate(payload, `/research/${previousDoc.slug}`)
  }

  return doc
}
