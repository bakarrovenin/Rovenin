import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/nav/Nav'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { formatDate } from '@/utils/formatDate'
import { SubscribeLink } from '@/components/research/ResearchLinks'

export const metadata: Metadata = {
  title: 'Rovenin | Research',
  description: 'Insights and analysis on technology, markets, and innovation.',
}

export const dynamic = 'force-dynamic'

export default async function ResearchPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    depth: 2,
    limit: 100,
    pagination: false,
  })

  return (
    <section className="flex overflow-hidden flex-col items-start px-20 pt-5 pb-44 bg-black max-md:px-5 max-md:pb-24">
      <div className="flex flex-col w-full text-lg tracking-wide max-w-[1223px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full max-md:mr-2.5 max-md:max-w-full">
          <Link href="/" className="text-custom hover:text-white transition-colors duration-300">
            ROVENIN
          </Link>
          <Nav currentPath="/research" />
        </div>
        <div className="shrink-0 self-end mt-8 max-w-full h-px border border-white border-solid w-[813px]" />
      </div>

      <div className="flex flex-wrap gap-20 justify-between mt-20 w-full max-w-[1238px] max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col items-start flex-1 min-w-[400px] max-md:min-w-full">
          {posts.map((post: any) => {
            const dateToShow = post.publishedAt || post.createdAt

            return (
              <div key={post.id} className="flex flex-col items-start mb-12">
                <div className="flex gap-5 justify-between text-sm tracking-wide text-textlight">
                  <div>{dateToShow ? formatDate(dateToShow) : ''}</div>

                  <div className="flex gap-2">
                    {post.categories?.map((cat: any, index: number) => (
                      <div key={index} className="text-textlight">
                        #{cat.title?.toLowerCase()}
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/research/${post.slug}`}
                  className="mt-2 text-2xl tracking-wide text-custom hover:text-white transition-colors duration-300"
                >
                  {post.title}
                </Link>
              </div>
            )
          })}

          <div className="mt-4 h-px w-[268px] max-w-full bg-textlight/40" />
          <SubscribeLink placement="research_page" className="mt-5" />
        </div>

        <figure className="flex flex-col items-center max-w-[400px] max-md:w-full">
          <Image
            src="/research-statue.png"
            alt="Laocoön and His Sons sculpture"
            width={400}
            height={600}
            className="object-contain w-full aspect-[0.67]"
          />
          <figcaption className="mt-5 text-sm tracking-wide text-textlight text-center max-w-[305px]">
            Laocoön and His Sons. Depicts the Trojan priest and his sons Antiphantes and
            Thymbraeus being attacked by sea serpents. It is housed in the Vatican Museums.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}