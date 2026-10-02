import React from 'react'
import Link from 'next/link'

import { StatusBadge } from '@/components/studio/StatusBadge'
import type { StudioProject } from '@/data/studio'

/** One project in a /studio grid: bronze hairline, status, name, summary, and links. */
export const ProjectCard: React.FC<{ project: StudioProject }> = ({ project }) => (
  <article className="flex flex-col">
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
    {project.dashboardUrl && (
      <a
        href={project.dashboardUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-sm tracking-[0.16em] uppercase text-custom hover:text-white focus-visible:outline-none focus-visible:text-white transition-colors duration-300"
      >
        Live dashboard ↗
      </a>
    )}
  </article>
)
