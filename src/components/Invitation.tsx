import { asset } from '../config'
import Heading from './Heading'
import Reveal from './Reveal'

export default function Invitation() {
  return (
    <section id="invitation" className="bg-sage-pale/50 px-5 py-24">
      <Heading kicker="You are invited" title="Our Invitation" sub="Tap the card to view it full size." />
      <Reveal className="text-center">
        <a href={asset('invitation.webp')} target="_blank" rel="noopener" className="inline-block bg-white p-3 shadow-2xl shadow-sage/30 transition hover:-translate-y-1">
          <img src={asset('invitation.webp')} alt="Printed wedding invitation card for Arun and Mariya" loading="lazy" className="w-full max-w-sm sm:max-w-md" />
        </a>
      </Reveal>
    </section>
  )
}
