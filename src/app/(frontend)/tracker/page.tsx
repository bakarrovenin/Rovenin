import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/nav/Nav'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { formatDate } from '@/utils/formatDate'
import { getPinnedPrice } from '@/data/marketPrices'

export const metadata: Metadata = {
  title: 'Tracker | Rovenin',
  description: "A live view of Rovenin's positions.",
}

export const dynamic = 'force-dynamic'

/**
 * A row as it is rendered. The entry price is shown deliberately as the buy
 * price. Share count, position size, and exit price are NOT included: they are
 * consumed while building this and never travel any further, so they cannot
 * appear in the page HTML.
 */
type Row = {
  id: string
  companyName: string
  ticker: string
  link: string | null
  buyPrice: string
  /**
   * Shown beside the price when the row is not in the table's assumed dollars,
   * so a rupee figure is never read as a dollar one. Null leaves USD rows alone.
   */
  currency: string | null
  entryDate: string
  exitDate: string
  isClosed: boolean
  /**
   * The muted line under the exit date: "closed" once settled, otherwise how
   * the open position is being priced, so a pinned price never reads as live.
   */
  stateNote: string
  returnPct: number | null
}

/**
 * Prices at or above one unit are shown to two decimals, matching the rest of
 * the table. Sub-unit prices (typically crypto) would round to 0.00 at two
 * decimals, so they keep up to four, with trailing zeros beyond the second
 * dropped: 0.018 stays 0.018, 0.5 becomes 0.50.
 */
const formatPrice = (price: number): string => {
  if (price >= 1) return price.toFixed(2)
  return price.toFixed(4).replace(/(\.\d{2}\d*?)0+$/, '$1')
}

const fetchCurrentPrice = async (ticker: string): Promise<number | null> => {
  const apiKey = process.env.TWELVEDATA_API_KEY
  if (!apiKey) return null

  try {
    const res = await fetch(
      `https://api.twelvedata.com/price?symbol=${encodeURIComponent(ticker)}&apikey=${apiKey}`,
      { cache: 'no-store' },
    )
    if (!res.ok) return null

    const json = await res.json()
    const price = Number(json?.price)
    return Number.isFinite(price) && price > 0 ? price : null
  } catch {
    return null
  }
}

export default async function TrackerPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: holdings } = await payload.find({
    collection: 'holdings',
    sort: '-entryDate',
    limit: 100,
    pagination: false,
  })

  const rows: Row[] = await Promise.all(
    holdings.map(async (holding: any) => {
      const entryPrice = Number(holding.entryPrice)
      const exitPrice = Number(holding.exitPrice)
      const isClosed = Boolean(holding.exitDate)
      const hasValidEntry = Number.isFinite(entryPrice) && entryPrice > 0

      // A closed position is settled: measure it against the price it was sold
      // at, not today's market. An open position is measured live. A closed
      // position with no exit price cannot be settled honestly, so it shows
      // nothing rather than a misleading live number.
      let priceToCompare: number | null = null

      // A symbol we price by hand is never sent to the feed, because the feed
      // would answer for a different company trading under the same letters.
      const pinned = getPinnedPrice(holding.ticker)

      if (isClosed) {
        priceToCompare = Number.isFinite(exitPrice) && exitPrice > 0 ? exitPrice : null
      } else if (pinned) {
        priceToCompare = pinned.lastPrice
      } else {
        priceToCompare = await fetchCurrentPrice(holding.ticker)
      }

      const stateNote = isClosed ? 'closed' : pinned ? `as of ${formatDate(pinned.asOf)}` : 'live'

      const returnPct =
        priceToCompare !== null && hasValidEntry
          ? ((priceToCompare - entryPrice) / entryPrice) * 100
          : null

      return {
        id: String(holding.id),
        companyName: holding.companyName,
        ticker: holding.ticker,
        link: typeof holding.link === 'string' && holding.link.length > 0 ? holding.link : null,
        buyPrice: hasValidEntry ? formatPrice(entryPrice) : '',
        currency: pinned && pinned.currency !== 'USD' ? pinned.currency : null,
        entryDate: holding.entryDate ? formatDate(holding.entryDate) : '',
        exitDate: holding.exitDate ? formatDate(holding.exitDate) : 'Open',
        isClosed,
        stateNote,
        returnPct,
      }
    }),
  )

  return (
    <section className="flex overflow-hidden flex-col items-start px-20 pt-5 pb-44 bg-black max-md:px-5 max-md:pb-24">
      <div className="flex flex-col w-full text-lg tracking-wide max-w-[1223px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full max-md:mr-2.5 max-md:max-w-full">
          <Link href="/" className="text-custom hover:text-white transition-colors duration-300">
            ROVENIN
          </Link>
          <Nav currentPath="/tracker" />
        </div>
        <div className="shrink-0 self-end mt-8 max-w-full h-px border border-white border-solid w-[813px] max-md:w-full" />
      </div>

      <div className="flex flex-wrap gap-20 justify-between mt-20 w-full max-w-[1170px] max-md:gap-10 max-md:mt-12 max-md:max-w-full">
        <div className="flex flex-col items-start flex-1 min-w-[560px] max-md:min-w-full">
          <div className="text-sm tracking-[0.2em] text-textlight">TRACKER</div>

          <p className="mt-10 text-xl tracking-wide text-white leading-[1.7] max-w-[680px] max-md:text-base max-md:mt-8">
            A live view of Rovenin&apos;s positions.
          </p>

          <div className="mt-24 w-full max-md:mt-16">
          <div className="flex gap-4 pb-5 text-sm tracking-[0.12em] text-textlight max-md:text-[10px] max-md:gap-3">
            <div className="flex-1 min-w-0">COMPANY</div>
            <div className="w-[95px] shrink-0 text-right max-md:w-[60px]">BUY PRICE</div>
            <div className="w-[120px] shrink-0 max-md:w-[80px]">ENTRY DATE</div>
            <div className="w-[120px] shrink-0 max-md:w-[80px]">EXIT DATE</div>
            <div className="w-[100px] shrink-0 text-right max-md:w-[70px]">RETURN</div>
          </div>

          <div className="h-px w-full bg-textlight/40" />

          {rows.length === 0 && (
            <div className="py-10 text-base tracking-wide text-textlight">No positions yet.</div>
          )}

          {rows.map((row) => (
            <div key={row.id}>
              <div className="flex gap-4 items-baseline py-8 max-md:py-6 max-md:gap-3">
                <div className="flex-1 min-w-0 text-lg tracking-wide text-white max-md:text-sm">
                  {row.link ? (
                    <a
                      href={row.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${row.companyName} (opens in a new tab)`}
                      className="hover:text-custom transition-colors duration-300 focus-visible:outline-none focus-visible:text-custom"
                    >
                      {row.companyName}
                    </a>
                  ) : (
                    row.companyName
                  )}
                  <span className="ml-3 text-sm tracking-[0.12em] text-custom max-md:ml-2 max-md:text-[10px]">
                    {row.ticker}
                  </span>
                </div>
                <div className="w-[95px] shrink-0 text-right text-base tracking-wide text-white max-md:w-[60px] max-md:text-xs">
                  {row.buyPrice}
                  {row.currency && (
                    <span className="block mt-1 text-xs tracking-[0.12em] text-textlight/60 max-md:text-[9px]">
                      {row.currency}
                    </span>
                  )}
                </div>
                <div className="w-[120px] shrink-0 text-base tracking-wide text-textlight max-md:w-[80px] max-md:text-[10px]">
                  {row.entryDate}
                </div>
                <div className="w-[120px] shrink-0 text-base tracking-wide text-textlight max-md:w-[80px] max-md:text-[10px]">
                  {row.exitDate}
                  <span className="block mt-1 text-xs tracking-[0.12em] text-textlight/60 max-md:text-[9px]">
                    {row.stateNote}
                  </span>
                </div>
                <div className="w-[100px] shrink-0 text-right text-lg tracking-wide max-md:w-[70px] max-md:text-xs">
                  {row.returnPct === null ? (
                    <span className="text-textlight">Unavailable</span>
                  ) : (
                    <span className={row.returnPct >= 0 ? 'text-[#4E7C59]' : 'text-[#8C3A3A]'}>
                      {row.returnPct >= 0 ? '+' : ''}
                      {row.returnPct.toFixed(2)}%
                    </span>
                  )}
                </div>
              </div>
              <div className="h-px w-full bg-textlight/40" />
            </div>
          ))}
          </div>
        </div>

        <figure className="flex flex-col items-center w-[280px] shrink-0 max-md:w-full max-md:mt-12">
          <Image
            src="/augustus-prima-porta.png"
            alt="Augustus of Prima Porta statue"
            width={280}
            height={438}
            className="object-cover w-[280px] h-[438px] max-md:w-[220px] max-md:h-[344px]"
          />
          <figcaption className="mt-6 text-[14px] font-normal leading-[20px] w-[280px] text-center text-textlight max-md:w-[220px] max-md:mx-auto">
            Augustus of Prima Porta. The first Roman emperor, portrayed mid-command with his arm
            raised toward the horizon, a fitting image for conviction, foresight, and the discipline
            of a considered position. Housed in the Vatican Museums.
          </figcaption>
        </figure>
      </div>

    </section>
  )
}
