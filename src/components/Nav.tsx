import { useEffect, useState } from 'react'

const links = [['Home', '#home'], ['About', '#about'], ['Invitation', '#invitation'], ['Schedule', '#events'], ['Live', '#live'], ['Gallery', '#gallery']]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 60)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const dark = solid || open
  return (
    <nav className={`fixed inset-x-0 top-0 z-30 transition-colors ${dark ? 'bg-cream/95 shadow-sm backdrop-blur' : ''}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#home" className={`font-script text-3xl ${dark ? 'text-sage-dark' : 'text-white'}`}>Arun &amp; Mariya</a>
        <button className={`text-2xl md:hidden ${dark ? 'text-sage-dark' : 'text-white'}`} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? '✕' : '☰'}</button>
        <ul className="hidden gap-7 md:flex">
          {links.map(([l, h]) => <li key={h}><a href={h} className={`text-xs uppercase tracking-[.2em] hover:text-gold ${dark ? 'text-sage-dark' : 'text-white'}`}>{l}</a></li>)}
        </ul>
      </div>
      {open && (
        <ul className="border-t border-sage-pale px-5 pb-4 md:hidden">
          {links.map(([l, h]) => <li key={h}><a href={h} onClick={() => setOpen(false)} className="block py-3 text-sm uppercase tracking-[.2em] text-sage-dark">{l}</a></li>)}
        </ul>
      )}
    </nav>
  )
}
