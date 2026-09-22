import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/nav/Nav'
import { CopyableUrl } from '@/components/studio/CopyableUrl'
import { StatusBadge } from '@/components/studio/StatusBadge'
import { getProject, projects } from '@/data/studio'

type Args = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Studio | Rovenin' }
  return {
    title: `${project.name} | Rovenin Studio`,
    description: project.summary,
  }
}

export default async function StudioProjectPage({ params }: Args) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) notFound()

  const visitLinks = project.links.filter((link) => !link.copyable)
  const copyLinks = project.links.filter((link) => link.copyable)

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

      <div className="flex flex-col items-start mt-20 w-full max-w-[860px] max-md:mt-12 max-md:max-w-full">
        <Link
          href="/studio"
          className="text-sm tracking-[0.16em] uppercase text-textlight hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:text-white"
        >
          Back to Studio
        </Link>

        <div className="mt-10 max-md:mt-8">
          <StatusBadge status={project.status} />
        </div>

        <h1 className="mt-5 text-5xl tracking-wide text-custom leading-[1.2] max-md:text-3xl">
          {project.name}
        </h1>

        <p className="mt-8 text-xl tracking-wide text-white leading-[1.7] max-md:text-base">
          {project.summary}
        </p>

        <div className="mt-12 flex flex-col gap-6 max-md:mt-10">
          {project.description.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-base tracking-wide text-textlight leading-[1.85] max-md:text-sm"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {project.highlights.length > 0 && (
        <div className="mt-32 w-full max-w-[860px] max-md:mt-20 max-md:max-w-full">
          <h2 className="text-2xl tracking-wide text-white max-md:text-xl">What it does</h2>

          <ul className="mt-12 flex flex-col max-md:mt-8">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex flex-col">
                <div className="h-px w-full bg-custom/60" />
                <p className="py-7 text-base tracking-wide text-textlight leading-[1.75] max-md:py-6 max-md:text-sm">
                  {highlight}
                </p>
              </li>
            ))}
            <li aria-hidden="true" className="h-px w-full bg-custom/60" />
          </ul>
        </div>
      )}

      {project.stack.length > 0 && (
        <div className="mt-32 w-full max-w-[860px] max-md:mt-20 max-md:max-w-full">
          <h2 className="text-2xl tracking-wide text-white max-md:text-xl">Stack</h2>

          <ul className="mt-10 flex flex-wrap gap-x-4 gap-y-3 max-md:mt-8">
            {project.stack.map((item) => (
              <li
                key={item}
                className="px-5 py-2 text-sm tracking-[0.12em] text-textlight border border-textlight/30 max-md:text-xs"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.links.length > 0 && (
        <div className="mt-32 w-full max-w-[860px] max-md:mt-20 max-md:max-w-full">
          <h2 className="text-2xl tracking-wide text-white max-md:text-xl">Links</h2>

          {copyLinks.length > 0 && (
            <div className="mt-10 flex flex-col gap-8 max-md:mt-8">
              {copyLinks.map((link) => (
                <CopyableUrl key={link.url} label={link.label} url={link.url} />
              ))}
            </div>
          )}

          {visitLinks.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-4 max-md:mt-8">
              {visitLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in a new tab)`}
                  className="px-10 py-4 text-sm tracking-[0.16em] uppercase text-custom border border-custom/60 hover:text-black hover:bg-custom transition-colors duration-300 focus-visible:outline-none focus-visible:text-black focus-visible:bg-custom max-md:px-8"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-32 w-full max-w-[860px] max-md:mt-20 max-md:max-w-full">
        <div className="h-px w-full bg-textlight/40" />
        <Link
          href="/studio"
          className="inline-block mt-8 text-sm tracking-[0.16em] uppercase text-textlight hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:text-white"
        >
          Back to Studio
        </Link>
      </div>
    </section>
  )
}
