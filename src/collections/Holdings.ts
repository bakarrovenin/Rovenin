import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

/**
 * Rovenin's portfolio positions.
 *
 * Read access is deliberately restricted to authenticated users so the public
 * REST endpoint (/api/holdings) can never expose entryPrice, exitPrice, or
 * shares. The
 * Tracker page reads this collection through Payload's Local API on the
 * server, which bypasses access control, and renders only the return
 * percentage. Entry price and share count must never reach the browser.
 */
export const Holdings: CollectionConfig = {
  slug: 'holdings',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'ticker', 'entryDate', 'exitDate'],
    description:
      'Positions shown on the Tracker page. Entry price, exit price, and shares are used only to calculate the return percentage and are never displayed on the site.',
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      label: 'Company name',
    },
    {
      name: 'ticker',
      type: 'text',
      required: true,
      admin: {
        description: 'Symbol used to fetch the current price, for example HIMS.',
      },
    },
    {
      name: 'entryPrice',
      type: 'number',
      required: true,
      label: 'Entry price',
      admin: {
        description: 'Used only to calculate the return percentage. Never shown on the site.',
      },
    },
    {
      name: 'entryDate',
      type: 'date',
      required: true,
      label: 'Entry date',
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'yyyy-MM-dd' },
      },
    },
    {
      name: 'exitDate',
      type: 'date',
      required: false,
      label: 'Exit date',
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'yyyy-MM-dd' },
        description: 'Leave empty while the position is open.',
      },
    },
    {
      name: 'exitPrice',
      type: 'number',
      required: false,
      label: 'Exit price',
      admin: {
        description:
          'The price the position was sold at. Set this whenever you set an exit date, so the realized return can be calculated. Used only in the calculation and never shown on the site.',
      },
    },
    {
      name: 'shares',
      type: 'number',
      required: false,
      admin: {
        description: 'Internal only. Never shown on the site.',
      },
    },
  ],
}
