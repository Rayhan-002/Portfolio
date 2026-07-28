export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-12">
          <p className="text-sm font-medium text-accent mb-2 tracking-wide">
            Get to know me
          </p>
          <h2 className="text-3xl font-bold text-foreground">About Me</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">

          {/* Bio — 2 / 3 width */}
          <div className="lg:col-span-2 space-y-5">
            <p className="text-base text-zinc-600 leading-relaxed">
              I&apos;m a Computer Science &amp; Engineering graduate from{' '}
              <span className="font-medium text-foreground">
                Rajshahi University of Engineering &amp; Technology (RUET)
              </span>
              , Bangladesh. My undergraduate thesis on hyperspectral image
              classification using a hybrid 3D-2D CNN with spatial attention was
              published at{' '}
              <span className="font-medium text-foreground">ICCIT 2024</span>{' '}
              — giving me hands-on experience in applied deep learning research
              and academic writing.
            </p>
            <p className="text-base text-zinc-600 leading-relaxed">
              On the engineering side, I build full-stack applications — from
              Kanban task managers with image annotation to Chrome extensions
              with Canvas-based editors. I&apos;m drawn to problems that sit at the
              intersection of software systems and machine learning, and I care
              about writing code that is clean, maintainable, and actually ships.
            </p>
            <p className="text-base text-zinc-600 leading-relaxed">
              Currently working as an AI data auditor at{' '}
              <span className="font-medium text-foreground">Outlier AI</span>{' '}
              (promoted from Contributor to Auditor), and actively exploring
              graduate research opportunities in Computer Vision and Deep
              Learning.
            </p>
          </div>

          {/* Highlights sidebar — 1 / 3 width */}
          <div className="space-y-3">
            {[
              {
                label: 'IEEE Publication',
                sub: 'ICCIT 2024 — Hyperspectral Image Classification',
              },
              {
                label: 'Full-Stack + ML',
                sub: 'Next.js · Django · PyTorch · TensorFlow',
              },
              {
                label: 'Open to Opportunities',
                sub: 'Engineering & research roles globally',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-xl border border-border bg-zinc-50"
              >
                <p className="font-semibold text-foreground text-sm">
                  {item.label}
                </p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
