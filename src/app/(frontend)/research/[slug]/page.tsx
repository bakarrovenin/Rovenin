import React from 'react'
import Image from 'next/image'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/nav/Nav'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { formatDate } from '@/utils/formatDate'
import { RichText } from '@/components/RichText'
import type { Post } from '@/payload-types'
import Link from 'next/link'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string): Promise<Post | null> {
  const payload = await getPayload({ config: configPromise })
  const {
    docs: [post],
  } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
    depth: 1,
  })
  return post || null
}

export async function generateMetadata(
  { params }: ArticlePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await getPost(await Promise.resolve(params.slug))

  if (!post) return notFound()

  return {
    title: `${post.title} | Rovenin Research`,
    description: post.meta?.description || '',
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const post = await getPost(await Promise.resolve(params.slug))

  if (!post) return notFound()

  const { title, publishedAt, categories, content } = post

  return (
    <section className="flex overflow-hidden flex-col items-start px-14 pt-5 pb-40 bg-black max-md:px-5 max-md:pb-24">
      <div className="flex flex-wrap gap-5 justify-between w-full text-lg tracking-wide max-w-[1238px] max-md:max-w-full">
        <Link href="/" className="text-custom hover:text-white transition-colors duration-300">
          ROVENIN
        </Link>
        <Nav currentPath="/research" />
      </div>

      <div className="flex flex-col mt-32 w-full max-w-[1273px] max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col ml-72 max-md:ml-0">
          <h1 className="text-3xl tracking-wider text-custom">{title}</h1>

          <div className="flex gap-5 mt-2.5 text-sm tracking-wide text-textlight">
            <div>{formatDate(publishedAt || '')}</div>
            <div className="flex gap-2">
              {categories?.map((category: any) => (
                <div key={category.id}>#{category.title.toLowerCase()}</div>
              ))}
            </div>
          </div>

          <div className="mt-3 mb-12 h-px w-[268px] border-t border-textlight" />
        </div>

        <article className="prose prose-invert prose-custom ml-72 max-md:ml-0">
          <RichText content={content} />
        </article>
      </div>
    </section>
  )
}

export const dynamic = 'force-dynamic'
