import React from 'react'

import { SocialLinks, SubscribeLink } from './ResearchLinks'
import { ShareRow } from './ShareRow'

/**
 * Closes every research post. It is rendered by the post template rather than
 * stored per post, so it appears on existing and future posts alike.
 *
 * The left margin matches the article column above it.
 */
export const PostFooter: React.FC<{ slug: string; title: string }> = ({ slug, title }) => (
  <footer className="mt-24 ml-72 max-md:ml-0 max-md:mt-16">
    <ShareRow slug={slug} title={title} />

    <div className="mt-10 h-px w-[268px] max-w-full bg-textlight/40" />

    <SubscribeLink placement="post_footer" className="block mt-5" />

    <SocialLinks placement="post_footer" className="mt-6" />
  </footer>
)
