import { wedding as w, calendarUrl } from '../config'
import Heading from './Heading'
import Reveal from './Reveal'

const btn = 'inline-block border border-sage px-5 py-2 text-xs uppercase tracking-[.18em] text-sage-dark hover:bg-sage hover:text-white'

export default function Events() {
  return (
    <section id="events" className="bg-white px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <Heading kicker="Our Special Events" title="Wedding Events" />
        <div className="relative before:absolute before:bottom-0 before:left-6 before:top-0 before:w-px before:bg-sage/30 md:before:left-1/2">
          {w.events.map((e, i) => (
            <Reveal key={e.title} className="relative mb-14 last:mb-0">
              <div className="absolute left-0 top-0 z-10 grid size-12 place-items-center rounded-full border-2 border-gold bg-white text-gold-dark md:left-1/2 md:-translate-x-1/2">♥</div>
              <div className={`ml-20 md:ml-0 md:w-[44%] ${i % 2 ? 'md:ml-auto md:text-left' : 'md:text-right'}`}>
                <h3 className="font-display text-2xl uppercase tracking-[.08em] text-sage-dark">{e.title}</h3>
                <p className="mt-2 text-sm font-medium text-gold-dark">{e.time}</p>
                <p className="text-sm text-ink/70">{w.dateLabel}</p>
                <p className="mt-3 font-medium text-sage-dark">{e.venue}</p>
                <p className="text-sm text-ink/70">{e.address}</p>
                <div className={`mt-4 flex flex-wrap gap-2 ${i % 2 ? '' : 'md:justify-end'}`}>
                  <a className={btn} href={e.map} target="_blank" rel="noopener">Get Directions</a>
                  <a className={btn} href={calendarUrl(e)} target="_blank" rel="noopener">Add to Calendar</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
