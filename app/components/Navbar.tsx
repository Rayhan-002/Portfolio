import { personal } from '@/lib/data'
import ThemeToggle from '@/app/components/ThemeToggle'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#publications', label: 'Research' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  // "Md Rayhan Ali" → "Rayhan Ali" (drop honorific prefix for compact nav logo)
  const displayName = personal.name.split(' ').slice(1).join(' ')

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-semibold text-foreground hover:text-accent transition-colors duration-150 text-sm"
        >
          {displayName}
        </a>

        <div className="flex items-center gap-5">
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
