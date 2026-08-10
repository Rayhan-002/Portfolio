'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NavPanelProject {
  id: string
  title: string
}

interface OnPageSection {
  id: string
  heading: string
}

export default function ProjectNavPanel({
  currentId,
  sections,
  projects,
}: {
  currentId: string
  sections: OnPageSection[]
  projects: NavPanelProject[]
}) {
  const [open, setOpen] = useState(false)

  const content = (
    <>
      {sections.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
            On this page
          </p>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block px-2 py-1.5 -mx-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors duration-150"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <nav aria-label="Other projects">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
          Projects
        </p>
        <ul className="space-y-1">
          {projects.map((project) =>
            project.id === currentId ? (
              <li key={project.id}>
                <span
                  aria-current="page"
                  className="block px-2 py-1.5 -mx-2 rounded-md text-sm font-medium text-accent bg-accent/10"
                >
                  {project.title}
                </span>
              </li>
            ) : (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  className="block px-2 py-1.5 -mx-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors duration-150"
                >
                  {project.title}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </>
  )

  return (
    <>
      {/* Desktop — persistent right-hand column */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24">{content}</div>
      </aside>

      {/* Mobile — collapsible, mirrors Navbar's hamburger disclosure pattern */}
      <div className="lg:hidden mb-10">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="case-study-nav-panel"
          aria-label={open ? 'Hide page navigation' : 'Show page navigation'}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border text-sm font-medium text-foreground"
        >
          Navigate
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {open && (
          <div
            id="case-study-nav-panel"
            className="mt-3 p-4 rounded-lg border border-border bg-surface"
          >
            {content}
          </div>
        )}
      </div>
    </>
  )
}
