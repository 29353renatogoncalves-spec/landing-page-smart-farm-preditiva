import { Loader } from '@/components/site/loader'
import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { Manifesto } from '@/components/site/manifesto'
import { ProblemSolution } from '@/components/site/problem-solution'
import { Architecture } from '@/components/site/architecture'
import { Hardware } from '@/components/site/hardware'
import { Footer } from '@/components/site/footer'

export default function Page() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <ProblemSolution />
        <Architecture />
        <Hardware />
      </main>
      <Footer />
    </>
  )
}
