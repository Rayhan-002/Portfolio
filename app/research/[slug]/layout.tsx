import Link from 'next/link'

export default function ResearchLayout({ children }: LayoutProps<'/research/[slug]'>) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/#publications"
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
        Back to research
      </Link>
      {children}
    </div>
  )
}
