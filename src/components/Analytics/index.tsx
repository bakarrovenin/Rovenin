'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { INTERNAL_COOKIE } from './internal'

const GA_ID = 'G-7ZR5P3WQHJ'

// Not pages: the CMS, API and Next handlers, and anything that looks like a file (robots.txt, sitemap.xml, probes).
const NON_PAGE = /^\/(admin|api|next)(\/|$)|\/[^/]*\.[a-z0-9]+$/i

const shouldLoad = (pathname: string) =>
  !document.cookie.split('; ').some((c) => c.startsWith(`${INTERNAL_COOKIE}=`)) &&
  !NON_PAGE.test(pathname) &&
  // 404 pages render a [data-no-analytics] marker (see not-found.tsx).
  !document.querySelector('[data-no-analytics]')

/**
 * Google Analytics, loaded only on real pages for outside visitors. The decision is made in the browser so
 * pages stay static. Once loaded, GA tracks client navigations itself, as before.
 */
export const Analytics: React.FC = () => {
  const pathname = usePathname()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!enabled && shouldLoad(pathname)) setEnabled(true)
  }, [pathname, enabled])

  if (!enabled) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
