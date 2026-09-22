import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc, payload, req }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, categories, title, meta } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
    },
    categories: [],
  }

  if (Array.isArray(categories) && categories.length > 0) {
    // The admin publishes at depth 0, so categories arrive as plain IDs.
    // Other callers may pass populated objects. Normalise to IDs, then look
    // the titles up in one query.
    try {
      const ids = categories
        .map((category) =>
          typeof category === 'object' && category !== null ? category.id : category,
        )
        .filter((categoryId) => categoryId !== undefined && categoryId !== null && categoryId !== '')

      const { docs } = await payload.find({
        collection: 'categories',
        where: { id: { in: ids } },
        depth: 0,
        limit: ids.length,
        pagination: false,
        req,
      })

      const titleById = new Map(docs.map((category) => [String(category.id), category.title]))

      modifiedDoc.categories = ids.map((categoryId) => ({
        relationTo: 'categories',
        categoryID: String(categoryId),
        title: titleById.get(String(categoryId)) ?? '',
      }))
    } catch (err) {
      // Search is secondary. Index the post without categories rather than
      // let a lookup failure block the publish.
      payload.logger.error(
        `Category lookup failed while syncing '${collection}' id '${id}' to search, indexing without categories: ${String(err)}`,
      )
      modifiedDoc.categories = []
    }
  }

  return modifiedDoc
}
