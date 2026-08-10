import Link from 'next/link'
import { projects } from '@/lib/data'
import RepoLinks from '@/app/components/RepoLinks'

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-12">
          <p className="text-sm font-medium text-accent mb-2 tracking-wide">
            What I&apos;ve built
          </p>
          <h2 className="font-display text-3xl font-medium text-foreground">Projects</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col p-6 rounded-xl border border-border hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-150"
            >
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="shrink-0 px-2.5 py-0.5 text-xs font-medium text-accent bg-accent/10 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {project.subtitle && (
                <p className="text-sm text-muted-foreground mb-3">
                  {project.subtitle}
                </p>
              )}

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-300 bg-surface border border-border rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.caseStudy && (
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-150 mb-4"
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

              <div className="mt-auto">
                <RepoLinks repos={project.repos} live={project.live} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
