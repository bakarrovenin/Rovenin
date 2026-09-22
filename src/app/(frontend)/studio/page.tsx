import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/nav/Nav'
import { StatusBadge } from '@/components/studio/StatusBadge'
import { WhatWeBuild } from '@/components/studio/WhatWeBuild'
import { projects } from '@/data/studio'

export const metadata: Metadata = {
  title: 'Studio | Rovenin',
  description: 'The things Rovenin builds: trading bots, AI knowledge brains and custom builds.',
}

export default function StudioPage() {
  return (
    <section className="flex overflow-hidden flex-col items-start px-20 pt-5 pb-44 bg-black max-md:px-5 max-md:pb-24">
      <div className="flex flex-col w-full text-lg tracking-wide max-w-[1223px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full max-md:mr-2.5 max-md:max-w-full">
          <Link href="/" className="text-custom hover:text-white transition-colors duration-300">
            ROVENIN
          </Link>
          <Nav currentPath="/studio" />
        </div>
        <div className="shrink-0 self-end mt-8 max-w-full h-px border border-white border-solid w-[813px] max-md:w-full" />
      </div>

      <div className="flex flex-col items-start mt-20 w-full max-w-[1170px] max-md:mt-12 max-md:max-w-full">
        <div className="text-sm tracking-[0.2em] text-textlight">STUDIO</div>

        <h1 className="mt-10 text-5xl tracking-wide text-custom leading-[1.2] max-w-[720px] max-md:text-3xl max-md:mt-8">
          Research is only half of it.
        </h1>

        <p className="mt-10 text-xl tracking-wide text-white leading-[1.7] max-w-[680px] max-md:text-base max-md:mt-8">
          The same work that produces our research produces tools. Some of them we build for
          ourselves and open up, some we build for clients. What follows is what we have shipped and
          what is on the bench.
        </p>
      </div>

      <div className="mt-32 w-full max-w-[1170px] max-md:mt-20 max-md:max-w-full">
        <h2 className="text-2xl tracking-wide text-white max-md:text-xl">Projects</h2>

        <div className="mt-16 grid grid-cols-2 gap-x-20 gap-y-16 max-md:grid-cols-1 max-md:gap-y-12 max-md:mt-10">
          {projects.map((project) => (
            <article key={project.slug} className="flex flex-col">
              <div className="h-px w-full bg-custom/60" />

              <Link
                href={`/studio/${project.slug}`}
                className="group flex flex-col pt-8 max-md:pt-6 focus-visible:outline-none"
              >
                <StatusBadge status={project.status} />

                <h3 className="mt-5 text-2xl tracking-wide text-white group-hover:text-custom group-focus-visible:text-custom transition-colors duration-300 max-md:text-xl">
                  {project.name}
                </h3>

                <p className="mt-4 text-base tracking-wide text-textlight leading-[1.75] max-md:text-sm">
                  {project.summary}
                </p>

                <span className="mt-6 text-sm tracking-[0.16em] uppercase text-custom group-hover:text-white group-focus-visible:text-white transition-colors duration-300">
                  Read more
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-40 w-full max-w-[1170px] max-md:mt-24 max-md:max-w-full">
        <WhatWeBuild />
      </div>

      <div className="mt-40 w-full max-w-[1170px] max-md:mt-24 max-md:max-w-full">
        <div className="h-px w-full bg-custom/60" />
        <h2 className="mt-12 text-5xl tracking-wide text-custom leading-[1.2] max-md:mt-10 max-md:text-3xl">
          Build with us
        </h2>
        <Link
          href="/services#contact"
          className="inline-block mt-10 px-10 py-4 text-sm tracking-[0.16em] uppercase text-custom border border-custom/60 hover:text-black hover:bg-custom transition-colors duration-300 focus-visible:outline-none focus-visible:text-black focus-visible:bg-custom max-md:mt-8 max-md:px-8"
        >
          Get in touch
        </Link>
      </div>
    </section>
  )
}
