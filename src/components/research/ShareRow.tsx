'use client'

import React, { useEffect, useState } from 'react'

import { SITE_URL, tagUrl } from '@/utilities/utm'

const itemClasses =
  'hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:text-white'

/**
 * Share buttons at the end of a research post. Each link carries its own UTM source, and the post URL is
 * built from the slug rather than the address bar, so no query string of the reader's is passed on.
 */
export const ShareRow: React.FC<{ slug: string; title: string; className?: string }> = ({
  slug,
  title,
  className = '',
}) => {
  const [copied, setCopied] = useState(false)
  const postUrl = `${SITE_URL}/research/${slug}`

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tagUrl(postUrl, 'copy'))
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const shareLinks = [
    {
      label: 'X',
      href: `https://x.com/intent/tweet?${new URLSearchParams({ text: title, url: tagUrl(postUrl, 'x') })}`,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({ url: tagUrl(postUrl, 'linkedin') })}`,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?${new URLSearchParams({ text: `${title} ${tagUrl(postUrl, 'whatsapp')}` })}`,
    },
  ]

  return (
    <div className={`flex flex-wrap items-baseline gap-x-6 gap-y-3 max-md:gap-x-4 text-sm tracking-wide text-textlight ${className}`}>
      <span className="text-xs tracking-[0.16em] uppercase">Share</span>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.label} (opens in a new tab)`}
          className={itemClasses}
        >
          {link.label}
        </a>
      ))}
      <button type="button" onClick={copy} className={`${itemClasses} text-left`}>
        <span aria-live="polite">{copied ? 'Copied' : 'Copy link'}</span>
      </button>
    </div>
  )
}
