import { wedding as w, asset } from '../config'
import Heading from './Heading'
import Reveal from './Reveal'

export default function Welcome() {
  return (
    <section id="about" className="bg-white px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <Heading kicker="Hello!" title="Welcome" sub={`We invite you to celebrate our wedding!`} />
        <div className="grid items-start gap-14 md:grid-cols-2">
          {[w.groom, w.bride].map((p) => (
            <Reveal key={p.name} className="text-center">
              <img src={asset(p.photo)} alt={p.name} loading="lazy" className="mx-auto size-48 rounded-full border-4 border-sage-pale object-cover shadow-lg sm:size-56" />
              <h3 className="mt-6 font-display text-2xl uppercase tracking-[.1em] text-sage-dark">{p.name}</h3>
              <p className="mt-3 text-xs uppercase tracking-[.2em] text-gold-dark">{p.child}</p>
              {p.parents.map((x) => <p key={x} className="mt-1 text-ink">{x}</p>)}
              <p className="mt-2 text-sm text-ink/70">{p.home}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <blockquote className="mx-auto mt-20 max-w-2xl text-center font-display text-xl italic leading-relaxed text-sage-dark sm:text-2xl">
            “{w.verse.text}”
            <footer className="mt-3 text-xs not-italic uppercase tracking-[.25em] text-gold-dark">{w.verse.ref}</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
