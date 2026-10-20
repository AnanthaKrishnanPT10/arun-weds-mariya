import { useEffect, useState } from 'react'
import { wedding as w, asset } from '../config'
import Heading from './Heading'

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const n = w.gallery.length
  const step = (d: number) => setOpen((o) => (o === null ? o : (o + d + n) % n))

  useEffect(() => {
    if (open === null) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  return (
    <section id="gallery" className="bg-white px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Heading kicker="Our Memories" title="Wedding Gallery" sub="A moment lasts all of a second, but the memories live on forever." />
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
          {w.gallery.map((p, i) => (
            <button key={p.file} onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1}`} className="group relative aspect-[4/5] overflow-hidden bg-sage-pale">
              <img src={asset(p.file)} alt={p.caption ?? `Arun and Mariya, photo ${i + 1}`} loading="lazy" className="size-full object-cover object-top transition duration-500 group-hover:scale-110" />
              <span className="absolute inset-0 flex items-end bg-sage-dark/0 p-3 text-left text-sm text-white opacity-0 transition group-hover:bg-sage-dark/50 group-hover:opacity-100">{p.caption ?? '⌕'}</span>
            </button>
          ))}
        </div>
      </div>
      {open !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <img src={asset(w.gallery[open].file)} alt="" className="max-h-[85vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          {([['‹', -1, 'left-2'], ['›', 1, 'right-2']] as const).map(([c, d, pos]) => (
            <button key={c} aria-label={d < 0 ? 'Previous photo' : 'Next photo'} className={`absolute ${pos} top-1/2 -translate-y-1/2 px-3 text-5xl text-white/80 hover:text-white`} onClick={(e) => { e.stopPropagation(); step(d) }}>{c}</button>
          ))}
          <button aria-label="Close" className="absolute right-4 top-3 text-4xl text-white/80 hover:text-white" onClick={() => setOpen(null)}>×</button>
        </div>
      )}
    </section>
  )
}
