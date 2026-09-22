import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import configPromise from '@payload-config'

/**
 * One-off, additive only. Adds the nullable category_id column that the
 * renamed search "categoryID" field writes to. Nothing is dropped, renamed,
 * or deleted. Safe to re-run.
 *
 * Run with: PAYLOAD_MIGRATING=true pnpm payload run src/scripts/add-search-category-column.ts
 */
const run = async () => {
  const payload = await getPayload({ config: configPromise })

  await payload.db.drizzle.execute(
    sql`ALTER TABLE search_categories ADD COLUMN IF NOT EXISTS category_id varchar`,
  )
  console.log('search_categories.category_id column present')

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
