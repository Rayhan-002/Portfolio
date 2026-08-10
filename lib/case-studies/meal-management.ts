import type { CaseStudy } from '@/lib/data'

export const mealManagementCaseStudy: CaseStudy = {
  tagline:
    'A desktop application that automates meal tracking and billing for a student hostel mess, replacing manual, error-prone ledger calculations.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'A hostel mess runs on a simple but tedious routine: track who ate what each day, tally it up, and bill every resident at the end of the month. Done by hand, that\'s a ledger prone to arithmetic mistakes and disputes over who owes what. Meal Management System automates the whole cycle — daily meal entries, running expense totals, and monthly bill generation — in a single desktop tool built for the mess admin.',
        'A desktop app made sense over a web app here: one admin, one machine, no need for concurrent multi-device access — just a fast, offline-capable tool for a repetitive daily task.',
      ],
    },
    {
      heading: 'Core Features',
      body: [
        'The system is built with Java Swing for the interface and MySQL for persistence, with authentication gating admin actions like billing generation and expense entry.',
      ],
      bullets: [
        'Daily meal tracking per resident',
        'Automated expense calculation from tracked meals and costs',
        'Automated monthly billing computation',
        'Secure admin authentication',
        'MySQL-backed data persistence',
      ],
    },
  ],
}
