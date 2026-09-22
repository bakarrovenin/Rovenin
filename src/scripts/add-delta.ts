import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import configPromise from '@payload-config'

/**
 * One-off: logs the closed DELTA position on the Tracker. Safe to re-run, it
 * skips the insert if a DELTA holding already exists.
 *
 * Payload's dev-mode schema push is deliberately bypassed (it wants to drop
 * unrelated leftover tables in this database), so the new nullable `link`
 * column is added here with a single explicit statement instead.
 *
 * Run with: PAYLOAD_MIGRATING=true pnpm payload run src/scripts/add-delta.ts
 */
const run = async () => {
  const payload = await getPayload({ config: configPromise })

  await payload.db.drizzle.execute(sql`ALTER TABLE holdings ADD COLUMN IF NOT EXISTS link varchar`)
  console.log('holdings.link column present')

  const existing = await payload.find({
    collection: 'holdings',
    where: { ticker: { equals: 'DELTA' } },
    limit: 1,
  })
  if (existing.totalDocs > 0) {
    console.log('DELTA already exists, skipping:', existing.docs[0].id)
    process.exit(0)
  }

  const doc = await payload.create({
    collection: 'holdings',
    data: {
      companyName: 'Delta',
      ticker: 'DELTA',
      link: 'https://coinmarketcap.com/currencies/deltaliquidity/',
      entryPrice: 0.018,
      entryDate: '2026-09-21T12:00:00.000Z',
      exitDate: '2026-09-22T12:00:00.000Z',
      exitPrice: 0.027,
    },
  })
  console.log('created', doc.id)

  const all = await payload.find({ collection: 'holdings', sort: '-entryDate', limit: 100 })
  for (const h of all.docs) {
    console.log(h.id, h.companyName, h.ticker, h.link ?? '', h.entryDate, h.exitDate ?? 'open', h.exitPrice ?? '')
  }
  process.exit(0)
}

// payload run awaits the module import and then exits, so the work has to be
// awaited at the top level or the process ends before Payload connects.
await run()
