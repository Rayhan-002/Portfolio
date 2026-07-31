import Navbar from '@/app/components/Navbar'
import Hero from '@/app/components/Hero'
import About from '@/app/components/About'
import Skills from '@/app/components/Skills'
import Projects from '@/app/components/Projects'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        {/* Placeholder anchors — sections built in upcoming checkpoints */}
        <div id="publications" />
        <div id="experience" />
        <div id="contact" />
      </main>
    </>
  )
}

