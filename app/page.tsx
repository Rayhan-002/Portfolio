import Navbar from '@/app/components/Navbar'
import Hero from '@/app/components/Hero'
import About from '@/app/components/About'
import Skills from '@/app/components/Skills'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        {/* Placeholder anchors — sections built in upcoming checkpoints */}
        <div id="projects" />
        <div id="publications" />
        <div id="experience" />
        <div id="contact" />
      </main>
    </>
  )
}

