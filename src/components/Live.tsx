import { wedding as w, youtubeEmbed } from '../config'
import Heading from './Heading'
import Reveal from './Reveal'

export default function Live() {
  return (
    <section id="live" className="bg-sage-pale/50 px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <Heading kicker="We love your presence" title="Watch Us Live" sub="Can’t be there in person? Join us online as we celebrate." />
        <div className={`grid gap-8 ${w.live.length > 1 ? 'md:grid-cols-2' : ''}`}>
          {w.live.map((l) => {
            const src = youtubeEmbed(l.url)
            return (
              <Reveal key={l.title}>
                <div className="bg-white p-3 shadow-lg shadow-sage/10">
                  <div className="aspect-video w-full bg-sage-dark/90">
                    {src ? (
                      <iframe src={src} title={l.title} className="size-full" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
                    ) : (
                      <div className="grid size-full place-items-center px-4 text-center text-white/90">
                        <div><p className="font-script text-4xl text-gold">Coming soon</p><p className="mt-1 text-xs uppercase tracking-[.2em]">Live link</p></div>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 text-center font-display text-lg uppercase tracking-[.08em] text-sage-dark">{l.title}</h3>
                  <p className="mb-2 text-center text-xs uppercase tracking-[.15em] text-gold-dark">{l.time}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
