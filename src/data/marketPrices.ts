/**
 * Last prices for tickers the live price feed cannot be trusted with.
 *
 * The Tracker prices open positions from Twelve Data by symbol. That is fine
 * for the symbols it covers, but Pakistan Stock Exchange tickers are not on the
 * plan we use, and worse, some of them collide with unrelated listings: NCPL
 * returns Netcapital Inc. on NASDAQ, priced in dollars. Pricing a PSX holding
 * off that symbol would publish a confidently wrong return.
 *
 * So a symbol listed here is never sent to the price feed. It is priced from
 * the figure below, and the Tracker shows the date that figure was taken so a
 * pinned price is never presented as a live one. Update the price and the date
 * together.
 */

export type PinnedPrice = {
  /** Where the position actually trades. */
  exchange: string
  /** Currency of `lastPrice`, for the record even though the table is unlabelled. */
  currency: string
  lastPrice: number
  /** The day `lastPrice` was taken, as YYYY-MM-DD. */
  asOf: string
}

export const pinnedPrices: Record<string, PinnedPrice> = {
  NCPL: { exchange: 'PSX', currency: 'PKR', lastPrice: 57.5, asOf: '2026-09-22' },
}

export const getPinnedPrice = (ticker: string): PinnedPrice | undefined =>
  pinnedPrices[ticker?.toUpperCase?.() ?? '']
