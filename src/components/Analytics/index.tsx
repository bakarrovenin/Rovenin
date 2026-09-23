'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const GA_ID = 'G-7ZR5P3WQHJ'

/** Set by visiting any page with ?internal=1 (cleared with ?internal=0). While present, GA never loads. */
export const INTERNAL_COOKIE = 'rovenin_internal'

// Not pages: the CMS, API and Next handlers, and anything that looks like a file (robots.txt, sitemap.xml, probes).
const NON_PAGE = /^\/(admin|api|next)(\/|$)|\/[^/]*\.[a-z0-9]+$/i

const markInternal = () => {
  const flag = new URLSearchParams(window.location.search).get('internal')
  if (flag === null) return
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie =
    flag === '0'
      ? `${INTERNAL_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax${secure}`
      : `${INTERNAL_COOKIE}=1; Max-Age=${400 * 24 * 60 * 60}; Path=/; SameSite=Lax${secure}`
}

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
    markInternal()
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
