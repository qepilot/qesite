import Hero from '../components/Hero'
import InteractiveDemo from '../components/InteractiveDemo'
import RotatingHeadline from '../components/RotatingHeadline'
import Capabilities from '../components/Capabilities'
import Comparison from '../components/Comparison'
import Workflow from '../components/Workflow'
import TrustControl from '../components/TrustControl'
import Results from '../components/Results'
import CTA from '../components/CTA'
import FAQ from '../components/FAQ'

export default function Home() {
  return (
    <>
      <Hero />
      <InteractiveDemo />
      <RotatingHeadline />
      <Capabilities />
      <Comparison />
      <Workflow />
      <TrustControl />
      <Results />
      <CTA />
      <FAQ />
    </>
  )
}
