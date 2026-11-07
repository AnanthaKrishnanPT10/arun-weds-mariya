import { wedding as w } from '../config'
import { useVisitorCount } from '../hooks/useVisitorCount'

export default function Footer() {
  const visits = useVisitorCount()
  return (
    <footer className="bg-sage-dark px-5 py-14 text-center text-white">
      <p className="font-script text-5xl">Arun <span className="text-gold">&amp;</span> Mariya</p>
      <p className="mt-3 text-xs uppercase tracking-[.25em] text-white/70">{w.dateLabel} · {w.place}</p>
      <p className="mt-6 font-display italic text-white/80">Best wishes from {w.wishesFrom}</p>
      {visits !== null && (
        <p className="mt-8 text-xs uppercase tracking-[.25em] text-white/60">♥ {visits.toLocaleString('en-IN')} visitors so far</p>
      )}
    </footer>
  )
}