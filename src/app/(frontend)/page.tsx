import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'
import { Nav } from '@/components/nav/Nav'
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Rovenin | Precision Research for Capital Success',
  description: 'Rovenin provides precision research and analysis for capital markets success.',
  keywords: ['research', 'capital markets', 'financial analysis', 'investment research'],
}

export default function HomePage() {
  return (
    <section className="flex overflow-hidden flex-col items-center px-20 pt-5 pb-16 text-center bg-black text-white max-md:px-5">
      <Nav currentPath="/" />

      <div className="relative mt-16 max-md:mt-10">
        <h1 className="z-10 font-['Gilda_Display'] font-thin text-[175px] text-custom tracking-rovenin leading-[1.1] max-md:text-[70px] max-md:leading-tight max-md:px-2">
          ROVENIN
        </h1>
        <p className="absolute right-4 -bottom-2 text-xl font-gilda tracking-wider text-white max-md:text-base max-md:static max-md:mt-2 max-md:text-center max-md:w-full">
          Precision Research for Capital Success
        </p>
      </div>

      <figure className="mt-[-30px] max-md:mt-10">
        <Image
          src="/statue-landing-page.png"
          alt="Winged Victory of Samothrace sculpture"
          width={280}
          height={600}
          className="object-contain max-w-full aspect-[0.46] w-[280px] max-md:w-[200px]"
        />
        <figcaption className="mt-6 text-[14px] font-normal leading-[20px] w-[280px] text-center text-textlight max-md:w-[200px] max-md:mx-auto">
          The Winged Victory of Samothrace is an iconic Hellenistic sculpture symbolizing triumph
          and beauty, housed in the Louvre Museum.
        </figcaption>
      </figure>
    </section>
  )
}

export const dynamic = 'force-dynamic'
