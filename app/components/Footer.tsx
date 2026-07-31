import { personal } from '@/lib/data'

export default function Footer() {
  const displayName = personal.name.split(' ').slice(1).join(' ')

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {displayName} • Built with Next.js, TypeScript & Tailwind CSS
        </p>
      </div>
    </footer>
  )
}