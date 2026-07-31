import { skills } from '@/lib/data'

const skillGroups = [
  { title: 'Languages', items: skills.languages },
  { title: 'Web & Backend', items: skills.web },
  { title: 'ML & Deep Learning', items: skills.mlDl },
  { title: 'Databases & Tools', items: [...skills.databases, ...skills.tools] },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-12">
          <p className="text-sm font-medium text-accent mb-2 tracking-wide">
            What I work with
          </p>
          <h2 className="text-3xl font-bold text-foreground">Skills</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 bg-background border border-border rounded-full hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-150"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
