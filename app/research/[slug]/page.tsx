import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { publicationsWithCaseStudy } from '@/lib/data'
import { siteUrl } from '@/lib/site'
import CaseStudySectionBlock from '@/app/components/CaseStudySectionBlock'
import Reveal from '@/app/components/Reveal'

export function generateStaticParams() {
  return publicationsWithCaseStudy.map((pub) => ({ slug: pub.id }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps<'/research/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const pub = publicationsWithCaseStudy.find((p) => p.id === slug)
  if (!pub) return {}

  const description = pub.caseStudy.tagline ?? pub.summary
  const url = `${siteUrl}/research/${pub.id}`

  return {
    title: `${pub.title} — Research`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: pub.title,
      description,
      url,
    },
  }
}

export default async function ResearchPage({ params }: PageProps<'/research/[slug]'>) {
  const { slug } = await params
  const pub = publicationsWithCaseStudy.find((p) => p.id === slug)

  if (!pub) {
    notFound()
  }

  return (
    <article>
      <Reveal>
        <header className="mb-12">
          <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-accent bg-accent/10 rounded-full mb-4">
            {pub.venue}
          </span>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-foreground leading-tight tracking-tight mb-4">
            {pub.title}
          </h1>

          {pub.caseStudy.tagline && (
            <p className="font-display italic text-xl sm:text-2xl text-muted-foreground mb-4">
              {pub.caseStudy.tagline}
            </p>
          )}

          {pub.coAuthors && pub.coAuthors.length > 0 && (
            <p className="text-sm text-muted-foreground mb-6">
              With {pub.coAuthors.join(', ')}
            </p>
          )}

          <a
            href={`https://doi.org/${pub.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-150"
          >
            View Publication
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </header>
      </Reveal>

      {pub.caseStudy.stats && pub.caseStudy.stats.length > 0 && (
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-4 p-6 rounded-xl border border-border bg-surface">
            {pub.caseStudy.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-medium text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      <div>
        {pub.caseStudy.sections.map((section) => (
          <Reveal key={section.heading}>
            <CaseStudySectionBlock section={section} />
          </Reveal>
        ))}
      </div>
    </article>
  )
}
