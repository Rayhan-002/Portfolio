import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projectsWithCaseStudy } from '@/lib/data'
import { siteUrl } from '@/lib/site'
import RepoLinks from '@/app/components/RepoLinks'
import CaseStudySectionBlock from '@/app/components/CaseStudySectionBlock'
import Reveal from '@/app/components/Reveal'

export function generateStaticParams() {
  return projectsWithCaseStudy.map((project) => ({ slug: project.id }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const project = projectsWithCaseStudy.find((p) => p.id === slug)
  if (!project) return {}

  const description = project.caseStudy.tagline ?? project.description
  const url = `${siteUrl}/projects/${project.id}`

  return {
    title: `${project.title} — Case Study`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — Case Study`,
      description,
      url,
    },
  }
}

export default async function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params
  const project = projectsWithCaseStudy.find((p) => p.id === slug)

  if (!project) {
    notFound()
  }

  return (
    <article>
      <Reveal>
        <header className="mb-12">
          {project.subtitle && (
            <p className="text-sm font-medium text-accent tracking-wide mb-3">
              {project.subtitle}
            </p>
          )}

          <h1 className="font-display text-5xl sm:text-6xl font-medium text-foreground leading-[1.05] tracking-tight mb-4">
            {project.title}
          </h1>

          {project.caseStudy.tagline && (
            <p className="font-display italic text-xl sm:text-2xl text-muted-foreground mb-6">
              {project.caseStudy.tagline}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-300 bg-surface border border-border rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <RepoLinks repos={project.repos} live={project.live} />
        </header>
      </Reveal>

      {project.caseStudy.stats && project.caseStudy.stats.length > 0 && (
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-4 p-6 rounded-xl border border-border bg-surface">
            {project.caseStudy.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-medium text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      <div>
        {project.caseStudy.sections.map((section) => (
          <Reveal key={section.heading}>
            <CaseStudySectionBlock section={section} />
          </Reveal>
        ))}
      </div>
    </article>
  )
}
