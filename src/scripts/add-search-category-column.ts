import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import configPromise from '@payload-config'

/**
 * One-off, additive only. Adds the nullable column that the search index's
 * renamed "categoryID" field writes to. Nothing is dropped, renamed, or
 * deleted. Safe to re-run.
 *
 * The column is category_i_d, not category_id: Payload snake_cases a field
 * name by prefixing every capital with an underscore, so categoryID becomes
 * category_i_d. An earlier run of this script added an unused category_id
 * column, which is left in place because this script never drops anything.
 *
 * Run with: PAYLOAD_MIGRATING=true pnpm payload run src/scripts/add-search-category-column.ts
 */
const run = async () => {
  const payload = await getPayload({ config: configPromise })

  await payload.db.drizzle.execute(
    sql`ALTER TABLE search_categories ADD COLUMN IF NOT EXISTS category_i_d varchar`,
  )
  console.log('search_categories.category_i_d column present')

  const result = await payload.db.drizzle.execute(sql`
    select column_name, data_type, is_nullable
    from information_schema.columns
    where table_name = 'search_categories'
    order by ordinal_position
  `)
  console.table((result as unknown as { rows: unknown[] }).rows)

  process.exit(0)
}

await run()
