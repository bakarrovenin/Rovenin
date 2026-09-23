import React from 'react'

import { whatWeBuild } from '@/data/studio'

/**
 * The three things we build.
 *
 * Shared by the Studio page and the Services page so the copy lives in one
 * place. The card shape matches the markets row on Services: a bronze hairline,
 * a tracked title, then muted body.
 */
export const WhatWeBuild: React.FC<{ heading?: string }> = ({ heading = 'What we build' }) => (
  <>
    <h2 className="text-2xl tracking-wide text-white max-md:text-xl">{heading}</h2>

    <div className="mt-16 grid grid-cols-3 gap-x-12 max-md:grid-cols-1 max-md:gap-y-12 max-md:mt-10">
      {whatWeBuild.map((item) => (
        <div key={item.title} className="flex flex-col">
          <div className="h-px w-full bg-custom/60" />
          <h3 className="mt-8 text-base tracking-[0.16em] text-white max-md:mt-6 max-md:text-sm">
            {item.title}
          </h3>
          <p className="mt-4 text-base tracking-wide text-textlight leading-[1.75] max-md:text-sm">
            {item.description}
          </p>
          {item.note && (
            <p className="mt-4 text-sm tracking-wide text-custom leading-[1.75] max-md:text-xs">
              {item.note}
            </p>
          )}
        </div>
      ))}
    </div>
  </>
)
