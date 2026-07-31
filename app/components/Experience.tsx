import { experiences, education } from '@/lib/data'

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-12">
          <p className="text-sm font-medium text-accent mb-2 tracking-wide">
            Where I&apos;ve worked
          </p>
          <h2 className="text-3xl font-bold text-foreground">Experience</h2>
        </div>

        <div className="space-y-8 mb-16">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="grid sm:grid-cols-[1fr_3fr] gap-2 sm:gap-8 pb-8 border-b border-border last:border-b-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{exp.period}</p>
                <p className="text-xs text-muted-foreground mt-1">{exp.location}</p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {exp.role}
                </h3>
                <p className="text-sm text-accent font-medium mb-3">
                  {exp.company}
                </p>
                <ul className="space-y-1.5">
                  {exp.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed"
                    >
                      <span className="text-accent mt-0.5">&bull;</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
            Education
          </h3>
          <div className="p-6 rounded-xl border border-border bg-background">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <h4 className="text-base font-semibold text-foreground">
                {education.institution}
              </h4>
              <p className="text-sm text-muted-foreground">{education.period}</p>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-1">{education.degree}</p>
            <p className="text-sm text-muted-foreground mb-4">
              {education.location} &middot; CGPA {education.cgpa}
            </p>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <span
                  key={course}
                  className="px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-300 bg-surface border border-border rounded-full"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
