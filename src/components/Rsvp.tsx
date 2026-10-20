import { useState, type FormEvent } from 'react'
import { wedding as w, asset } from '../config'
import Heading from './Heading'

const field = 'w-full border border-white/40 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/60 focus:border-gold'

export default function Rsvp() {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('1')
  if (!w.whatsapp) return null

  const send = (e: FormEvent) => {
    e.preventDefault()
    const msg = `Hi! This is ${name}. I'll be attending Arun & Mariya's wedding (${guests} in total).`
    window.open(`https://wa.me/${w.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  return (
    <section id="rsvp" className="relative bg-sage-dark bg-cover bg-center px-5 py-24" style={{ backgroundImage: `url(${asset('cover.webp')})` }}>
      <div className="absolute inset-0 bg-sage-dark/80" />
      <div className="relative mx-auto max-w-md">
        <Heading light kicker="Kindly reply" title="Are You Attending?" sub="Please let us know that you’re coming. Thanks!" />
        <form onSubmit={send} className="space-y-4">
          <input className={field} placeholder="Your name" required value={name} onChange={(e) => setName(e.target.value)} />
          <select className={`${field} [&>option]:text-ink`} value={guests} onChange={(e) => setGuests(e.target.value)} aria-label="Number of guests">
            {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
          </select>
          <button className="w-full border-2 border-gold bg-gold py-3 text-xs font-medium uppercase tracking-[.2em] text-white hover:bg-transparent">I am Attending</button>
        </form>
      </div>
    </section>
  )
}
