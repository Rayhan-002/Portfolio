import type { CaseStudySection } from '@/lib/data'
import { slugify } from '@/lib/slugify'

export default function CaseStudySectionBlock({ section }: { section: CaseStudySection }) {
  return (
    <section id={slugify(section.heading)} className="py-8 border-b border-border last:border-b-0">
      <h2 className="font-display text-2xl font-medium text-foreground mb-4">
        {section.heading}
      </h2>

      <div className="space-y-4">
        {section.body.map((paragraph) => (
          <p key={paragraph} className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {section.bullets && section.bullets.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <span className="text-accent mt-0.5">&bull;</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
