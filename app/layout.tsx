import type { Metadata } from "next"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { personal, education } from "@/lib/data"
import { siteUrl } from "@/lib/site"
import "./globals.css"

// Runs before hydration so the correct theme class is set before first paint —
// otherwise a light page would flash before switching to a stored dark preference.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();
`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Md Rayhan Ali \u2013 Full-Stack Developer & ML Researcher",
  description:
    "Portfolio of Md Rayhan Ali. CSE graduate from RUET with a published research paper, full-stack web development expertise, and machine learning research background.",
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: siteUrl,
  image: `${siteUrl}${personal.photo}`,
  jobTitle: personal.tagline,
  description: personal.bio,
  email: personal.email,
  sameAs: [personal.linkedin, personal.github],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.institution,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  )
}
