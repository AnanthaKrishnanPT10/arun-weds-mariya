export default function Heading({ kicker, title, sub, light = false }: { kicker: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <p className={`font-script text-3xl ${light ? 'text-gold' : 'text-sage'}`}>{kicker}</p>
      <h2 className={`mt-1 font-display text-3xl uppercase tracking-[.12em] sm:text-4xl ${light ? 'text-white' : 'text-sage-dark'}`}>{title}</h2>
      <div className="mx-auto mt-4 h-px w-16 bg-gold" />
      {sub && <p className={`mt-5 leading-relaxed ${light ? 'text-white/80' : 'text-ink'}`}>{sub}</p>}
    </div>
  )
}
