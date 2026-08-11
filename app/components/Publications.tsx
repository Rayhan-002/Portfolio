import Link from 'next/link'
import { publications } from '@/lib/data'

export default function Publications() {
  return (
    <section id="publications" className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-12">
          <p className="text-sm font-medium text-accent mb-2 tracking-wide">
            Published work
          </p>
          <h2 className="font-display text-3xl font-medium text-foreground">Research</h2>
        </div>

        <div className="space-y-6">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="max-w-3xl p-8 rounded-xl border border-border hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-150"
            >
              <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-accent bg-accent/10 rounded-full mb-4">
                {pub.venue}
              </span>

              <h3 className="text-xl font-semibold text-foreground leading-snug mb-3">
                {pub.title}
              </h3>

              {pub.coAuthors && pub.coAuthors.length > 0 && (
                <p className="text-sm text-muted-foreground mb-3">
                  with {pub.coAuthors.join(', ')}
                </p>
              )}

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                {pub.summary}
              </p>

              <div className="flex flex-wrap items-center gap-5">
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

                {pub.caseStudy && (
                  <Link
                    href={`/research/${pub.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-150"
                  >
                    Read Case Study
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
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
