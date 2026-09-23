import type { Metadata } from 'next'

import { cn } from 'src/utilities/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Gilda_Display } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Analytics } from '@/components/Analytics'
import { internalVisitScript } from '@/components/Analytics/internal'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const gildaDisplay = Gilda_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-gilda',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        {/* Internal visit flag (?internal=1), set before any tracker runs */}
        <script dangerouslySetInnerHTML={{ __html: internalVisitScript }} />
        {/* Leadfeeder visitor tracker, skipped for internal visits */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if (!window.__roveninInternal) (function(ss,ex){ window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));}; (function(d,s){ fs=d.getElementsByTagName(s)[0]; function ce(src){ var cs=d.createElement(s); cs.src=src; cs.async=1; fs.parentNode.insertBefore(cs,fs); }; ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js'); })(document,'script'); })('ywVkO4Xlxpe4Z6Bj');`,
          }}
        />
      </head>
      <body className={cn(GeistSans.variable, GeistMono.variable, gildaDisplay.variable)}>
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}
          <LivePreviewListener />

          {children}
        </Providers>

        {/* Google Analytics: real pages only, never for internal visits */}
        <Analytics />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: 'Rovenin',
  description: 'Precision Research for Capital Success',
  verification: {
    google: 'bQtCE-L28Q_GFFPaPSAaC1WS0M4WkSZfZUypjxdkkSk',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
  },
  openGraph: mergeOpenGraph({
    title: 'Rovenin',
    description: 'Precision Research for Capital Success',
    siteName: 'Rovenin',
    images: [
      {
        url: '/social-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Rovenin',
      },
    ],
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Rovenin',
    description: 'Precision Research for Capital Success',
    images: ['/social-preview.jpg'],
    creator: '@rovenin',
  },
}
