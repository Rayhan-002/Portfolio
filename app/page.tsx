import Hero from '@/app/components/Hero'
import About from '@/app/components/About'
import Skills from '@/app/components/Skills'
import Projects from '@/app/components/Projects'
import Publications from '@/app/components/Publications'
import Experience from '@/app/components/Experience'
import Contact from '@/app/components/Contact'
import Reveal from '@/app/components/Reveal'

export default function Page() {
  return (
    <>
      <Hero />
      <Reveal><About /></Reveal>
      <Reveal><Skills /></Reveal>
      <Reveal><Projects /></Reveal>
      <Reveal><Publications /></Reveal>
      <Reveal><Experience /></Reveal>
      <Reveal><Contact /></Reveal>
    </>
  )
}

