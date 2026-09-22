import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/nav/Nav'
import { WhatWeBuild } from '@/components/studio/WhatWeBuild'

export const metadata: Metadata = {
  title: 'Services | Rovenin',
  description:
    'Independent financial research across global equities, commodities, digital assets, and macro. Studio builds, and how to reach us.',
}

const whatWeDo = [
  {
    number: '01',
    title: 'MARKET RESEARCH',
    description: 'Deep fundamental and macro research across global financial markets.',
  },
  {
    number: '02',
    title: 'INVESTMENT THESIS',
    description:
      'Clear, independently developed views on companies, assets, sectors, and market themes.',
  },
  {
    number: '03',
    title: 'MARKET INTELLIGENCE',
    description: 'Continuous analysis of the events, flows, and narratives moving markets.',
  },
  {
    number: '04',
    title: 'ACTIONABLE IDEAS',
    description:
      'High conviction stock picks, asset ideas, and opportunities identified through our research.',
  },
]

/**
 * Restrained line marks, drawn rather than illustrated: a meridian, stacked
 * ingots, a lattice cell, a curve crossing its axis. Abstract on purpose, so
 * they read as engraving in a financial journal rather than brand or token
 * logos. Stroke colour is inherited from the wrapper via currentColor.
 */
const marks: Record<string, React.ReactNode> = {
  'GLOBAL EQUITIES': (
    <>
      <circle cx="20" cy="20" r="13" />
      <ellipse cx="20" cy="20" rx="5.5" ry="13" />
      <path d="M7 20h26" />
    </>
  ),
  COMMODITIES: (
    <>
      <path d="M8 29h24" />
      <path d="M12 22h16" />
      <path d="M16 15h8" />
    </>
  ),
  'DIGITAL ASSETS': (
    <>
      <path d="M20 7l11 6.5v13L20 33 9 26.5v-13L20 7z" />
      <circle cx="20" cy="20" r="2.5" />
    </>
  ),
  MACRO: (
    <>
      <path d="M7 20h26" />
      <path d="M7 20c4-11 9-11 13 0s9 11 13 0" />
    </>
  ),
}

const markets = [
  { title: 'GLOBAL EQUITIES', description: 'Companies. Sectors. Structural themes.' },
  { title: 'COMMODITIES', description: 'Energy. Metals. Agriculture.' },
  { title: 'DIGITAL ASSETS', description: 'Crypto. Meme coins. Emerging markets.' },
  { title: 'MACRO', description: 'Rates. Currencies. Liquidity. Geopolitics.' },
]

export default function ServicesPage() {
  return (
    <section className="flex overflow-hidden flex-col items-start px-20 pt-5 pb-44 bg-black max-md:px-5 max-md:pb-24">
      <div className="flex flex-col w-full text-lg tracking-wide max-w-[1223px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full max-md:mr-2.5 max-md:max-w-full">
          <Link href="/" className="text-custom hover:text-white transition-colors duration-300">
            ROVENIN
          </Link>
          <Nav currentPath="/services" />
        </div>
        <div className="shrink-0 self-end mt-8 max-w-full h-px border border-white border-solid w-[813px] max-md:w-full" />
      </div>

      <div className="flex flex-wrap gap-20 justify-between mt-20 w-full max-w-[1170px] max-md:gap-10 max-md:mt-12 max-md:max-w-full">
        <div className="flex flex-col items-start flex-1 min-w-[420px] max-md:min-w-full">
          <div className="text-sm tracking-[0.2em] text-textlight">SERVICES</div>

          <h1 className="mt-10 text-5xl tracking-wide text-custom leading-[1.2] max-w-[720px] max-md:text-3xl max-md:mt-8">
            Markets move before consensus does.
          </h1>

          <p className="mt-10 text-xl tracking-wide text-white leading-[1.7] max-w-[680px] max-md:text-base max-md:mt-8">
            Rovenin is an independent financial research firm studying global markets, emerging
            opportunities, and the forces reshaping capital. We combine fundamental research, macro
            analysis, and market intelligence to identify opportunity across equities, commodities,
            and digital assets.
          </p>
        </div>

        <figure className="flex flex-col items-center w-[280px] shrink-0 max-md:w-full max-md:mt-4">
          <Image
            src="/artemis.png"
            alt="Diana, goddess of the hunt"
            width={280}
            height={438}
            className="object-cover w-[280px] h-[438px] max-md:w-[220px] max-md:h-[344px]"
          />
          <figcaption className="mt-6 text-[14px] font-normal leading-[20px] w-[280px] text-center text-textlight max-md:w-[220px] max-md:mx-auto">
            A timeless depiction of Diana, goddess of the hunt, captured in a moment of quiet grace
            and divine strength.
          </figcaption>
        </figure>
      </div>

      <div className="mt-12 w-full max-w-[1170px] max-md:mt-16 max-md:max-w-full">
        <h2 className="text-2xl tracking-wide text-white max-md:text-xl">What We Do</h2>

        <div className="mt-16 grid grid-cols-2 gap-x-20 gap-y-16 max-md:grid-cols-1 max-md:gap-y-12 max-md:mt-10">
          {whatWeDo.map((item) => (
            <article key={item.number} className="flex flex-col">
              <div className="h-px w-full bg-custom/60" />
              <div className="flex gap-7 pt-8 max-md:gap-5 max-md:pt-6">
                <div className="font-display text-5xl leading-none text-custom shrink-0 max-md:text-4xl">
                  {item.number}
                </div>
                <div className="w-px self-stretch bg-textlight/30 shrink-0" />
                <div className="flex flex-col">
                  <h3 className="text-base tracking-[0.16em] text-white max-md:text-sm">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-base tracking-wide text-textlight leading-[1.75] max-md:mt-4 max-md:text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-40 w-full max-w-[1170px] max-md:mt-24 max-md:max-w-full">
        <h2 className="text-2xl tracking-wide text-white max-md:text-xl">Across markets.</h2>

        <div className="mt-16 grid grid-cols-4 gap-x-12 max-md:grid-cols-1 max-md:gap-y-12 max-md:mt-10">
          {markets.map((item) => (
            <div key={item.title} className="flex flex-col">
              <div className="h-px w-full bg-custom/60" />

              <svg
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mt-8 w-10 h-10 text-custom max-md:mt-6"
              >
                {marks[item.title]}
              </svg>

              <h3 className="mt-7 text-base tracking-[0.16em] text-white max-md:mt-5 max-md:text-sm">
                {item.title}
              </h3>

              <p className="mt-4 text-base tracking-wide text-textlight leading-[1.75] max-md:text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-40 w-full max-w-[1170px] max-md:mt-24 max-md:max-w-full">
        <WhatWeBuild heading="Studio" />

        <Link
          href="/studio"
          className="inline-block mt-12 text-sm tracking-[0.16em] uppercase text-custom hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:text-white max-md:mt-10"
        >
          See our work
        </Link>
      </div>

      <div
        id="contact"
        className="flex flex-wrap gap-20 justify-between mt-40 w-full max-w-[1238px] scroll-mt-12 max-md:gap-10 max-md:mt-24 max-md:max-w-full"
      >
        <div className="flex flex-col items-start flex-1 min-w-[400px] max-md:min-w-full">
          <div className="text-sm tracking-[0.2em] text-textlight">CONTACT</div>

          <h2 className="mt-10 text-5xl tracking-wide text-custom leading-[1.2] max-md:text-3xl max-md:mt-8">
            We are a small team, by design.
          </h2>

          <p className="mt-10 text-xl tracking-wide text-white leading-[1.7] max-w-[680px] max-md:text-base max-md:mt-8">
            That focus lets us take on proprietary, high conviction work for a select group of
            partners. Research shaped precisely to the questions that matter to you. If that is the
            kind of depth you are after, we would like to hear from you.
          </p>

          <p className="mt-16 text-lg tracking-wide text-white max-md:mt-12 max-md:text-base">
            For queries, reach out to{' '}
            <a
              href="mailto:mas@rovenin.com"
              className="text-custom hover:text-white transition-colors duration-300"
            >
              mas@rovenin.com
            </a>
          </p>

          <p className="mt-12 text-sm tracking-wide text-textlight max-md:mt-10">
            <a
              href="https://x.com/roveninresearch"
              target="_blank"
              rel="noopener"
              className="hover:text-white transition-colors duration-300"
            >
              X
            </a>
            <span className="mx-2">·</span>
            <a
              href="https://rovenin.substack.com/"
              target="_blank"
              rel="noopener"
              className="hover:text-white transition-colors duration-300"
            >
              Substack
            </a>
          </p>
        </div>

        <figure className="flex flex-col items-center max-w-[400px] max-md:w-full max-md:mt-12">
          <Image
            src="/farnese-atlas.png"
            alt="The Farnese Atlas sculpture"
            width={320}
            height={480}
            className="object-contain w-[320px] max-w-full max-md:w-[240px]"
          />
          <figcaption className="mt-6 text-[14px] font-normal leading-[20px] w-[280px] text-center text-textlight max-md:w-[200px] max-md:mx-auto">
            The Farnese Atlas. The Titan bears the celestial sphere upon his shoulders, a fitting
            metaphor for carrying the weight of the world&apos;s information and markets. Housed in
            the National Archaeological Museum, Naples.
          </figcaption>
        </figure>
      </div>

    </section>
  )
}
