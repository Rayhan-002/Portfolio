import Navbar from '@/app/components/Navbar'
import Hero from '@/app/components/Hero'
import About from '@/app/components/About'
import Skills from '@/app/components/Skills'
import Projects from '@/app/components/Projects'
import Publications from '@/app/components/Publications'
import Experience from '@/app/components/Experience'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Publications />
        <Experience />
        {/* Placeholder anchors — sections built in upcoming checkpoints */}
        <div id="contact" />
      </main>
    </>
  )
}

