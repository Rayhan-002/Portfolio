import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projectsWithCaseStudy } from '@/lib/data'
import { slugify } from '@/lib/slugify'
import ProjectNavPanel from '@/app/components/ProjectNavPanel'

export default async function ProjectLayout({ children, params }: LayoutProps<'/projects/[slug]'>) {
  const { slug } = await params
  const project = projectsWithCaseStudy.find((p) => p.id === slug)

  if (!project) {
    notFound()
  }

  const sections = project.caseStudy.sections.map((section) => ({
    id: slugify(section.heading),
    heading: section.heading,
  }))

  const navProjects = projectsWithCaseStudy.map((p) => ({ id: p.id, title: p.title }))

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 mb-10"
      >
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
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to projects
      </Link>

      <div className="lg:flex lg:flex-row lg:gap-16 lg:items-start">
        <div className="lg:order-2">
          <ProjectNavPanel currentId={project.id} sections={sections} projects={navProjects} />
        </div>
        <div className="flex-1 min-w-0 lg:order-1">{children}</div>
      </div>
    </div>
  )
}
