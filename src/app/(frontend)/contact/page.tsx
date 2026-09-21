import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/nav/Nav'

export const metadata: Metadata = {
  title: 'Contact | Rovenin',
  description: 'Get in touch with Rovenin.',
}

export default function ContactPage() {
  return (
    <section className="flex overflow-hidden flex-col items-start px-20 pt-5 pb-44 bg-black max-md:px-5 max-md:pb-24">
      <div className="flex flex-col w-full text-lg tracking-wide max-w-[1223px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full max-md:mr-2.5 max-md:max-w-full">
          <Link href="/" className="text-custom hover:text-white transition-colors duration-300">
            ROVENIN
          </Link>
          <Nav currentPath="/contact" />
        </div>
        <div className="shrink-0 self-end mt-8 max-w-full h-px border border-white border-solid w-[813px] max-md:w-full" />
      </div>

      <div className="flex flex-wrap gap-20 justify-between mt-20 w-full max-w-[1238px] max-md:mt-12 max-md:max-w-full">
        <div className="flex flex-col items-start flex-1 min-w-[400px] max-md:min-w-full">
          <div className="text-sm tracking-[0.2em] text-textlight">CONTACT</div>

          <h1 className="mt-10 text-5xl tracking-wide text-custom leading-[1.2] max-md:text-3xl max-md:mt-8">
            We are a small team, by design.
          </h1>

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
