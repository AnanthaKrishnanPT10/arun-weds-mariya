import { wedding as w, asset } from '../config'
import { useCountdown } from '../hooks/useCountdown'

export default function Hero() {
  const t = useCountdown(w.dateISO)
  const hasLive = w.live.some((l) => l.url)
  return (
    <header id="home" className="relative grid min-h-screen place-items-center bg-sage-dark bg-cover bg-[position:50%_22%] px-5 text-center text-white" style={{ backgroundImage: `url(${asset('cover.webp')})` }}>
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative pt-16">
        <h1 className="font-script text-7xl sm:text-8xl lg:text-9xl">Arun <span className="text-gold">&amp;</span> Mariya</h1>
        <h2 className="mt-2 text-sm font-light uppercase tracking-[.4em] sm:text-lg">We Are Getting Married</h2>
        <p className="mt-3 text-xs uppercase tracking-[.25em] text-white/80">{w.dateLabel} · {w.place}</p>
        <div className="mx-auto mt-8 grid max-w-xs grid-cols-4 gap-2 sm:max-w-sm">
          {Object.entries(t).map(([label, n]) => (
            <div key={label} className="border border-white/40 bg-black/20 py-2 backdrop-blur-sm">
              <div className="font-display text-2xl sm:text-3xl">{String(n).padStart(2, '0')}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/80">{label}</div>
            </div>
          ))}
        </div>
        <a href={hasLive ? '#live' : '#events'} className="mt-9 inline-block rounded-full border-2 border-gold bg-gold/90 px-8 py-3 text-xs font-medium uppercase tracking-[.2em] text-white hover:bg-transparent">
          {hasLive ? 'Watch Live' : 'View Schedule'}
        </a>
      </div>
    </header>
  )
}
