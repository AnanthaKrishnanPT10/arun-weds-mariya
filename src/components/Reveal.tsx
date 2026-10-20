import { useEffect, useRef, useState, type ReactNode } from 'react'

// Fades content in the first time it scrolls into view.
export default function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); o.disconnect() } }, { threshold: 0.15 })
    o.observe(el)
    return () => o.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-700 motion-reduce:transition-none ${on ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}>
      {children}
    </div>
  )
}
