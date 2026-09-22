import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * One-off: logs the open NCPL position on the Tracker. Safe to re-run, it skips
 * the insert if an NCPL holding already exists.
 *
 * No schema change here, unlike add-delta: the columns this needs are already
 * on the table. Payload's dev-mode schema push stays bypassed, so run this with
 * PAYLOAD_MIGRATING=true.
 *
 * NCPL is priced from src/data/marketPrices.ts rather than from Twelve Data.
 * The feed answers that symbol with Netcapital Inc. on NASDAQ, in dollars, and
 * pricing a Pakistan Stock Exchange holding off that would publish a confidently
 * wrong return. No exit date is set, so the position reads as open.
 *
 * Run with: PAYLOAD_MIGRATING=true pnpm payload run src/scripts/add-ncpl.ts
 */
const run = async () => {
  const payload = await getPayload({ config: configPromise })

  const existing = await payload.find({
    collection: 'holdings',
    where: { ticker: { equals: 'NCPL' } },
    limit: 1,
  })
  if (existing.totalDocs > 0) {
    console.log('NCPL already exists, skipping:', existing.docs[0].id)
    process.exit(0)
  }

  const doc = await payload.create({
    collection: 'holdings',
    data: {
      companyName: 'Nishat Chunian Power',
      ticker: 'NCPL',
      entryPrice: 25.93,
      entryDate: '2025-07-21T12:00:00.000Z',
    },
  })
  console.log('created', doc.id)

  const all = await payload.find({ collection: 'holdings', sort: '-entryDate', limit: 100 })
  for (const h of all.docs) {
    console.log(h.id, h.companyName, h.ticker, h.entryDate, h.exitDate ?? 'open', h.exitPrice ?? '')
  }
  process.exit(0)
}

// payload run awaits the module import and then exits, so the work has to be
// awaited at the top level or the process ends before Payload connects.
await run()
