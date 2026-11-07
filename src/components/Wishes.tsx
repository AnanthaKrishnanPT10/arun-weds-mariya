import { useEffect, useState, type FormEvent } from 'react'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db, ensureGuest } from '../firebase'
import Heading from './Heading'

type Wish = { id: string; name: string; message: string; createdAt: Date | null }

const MAX_NAME = 40
const MAX_MSG = 300
const SHOW = 30 // how many wishes to load 

const field = 'w-full border border-sage/30 bg-white px-4 py-3 text-ink outline-none focus:border-gold'
const fmt = (d: Date | null) =>
  d ? d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [myId, setMyId] = useState<string | null>(null) // set once this guest has posted
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [trap, setTrap] = useState('') // honeypot
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        // newest first, only the latest SHOW wishes
        const snap = await getDocs(query(collection(db, 'wishes'), orderBy('createdAt', 'desc'), limit(SHOW)))
        if (cancelled) return
        setWishes(snap.docs.map((d) => ({
          id: d.id,
          name: d.data().name,
          message: d.data().message,
          createdAt: d.data().createdAt?.toDate() ?? null,
        })))
        // has this browser already posted a wish? (its ID is the document ID)
        await auth.authStateReady()
        if (auth.currentUser) {
          const mine = await getDoc(doc(db, 'wishes', auth.currentUser.uid))
          if (!cancelled && mine.exists()) setMyId(mine.id)
        }
      } catch {
        if (!cancelled) setLoadError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  async function send(e: FormEvent) {
    e.preventDefault()
    setError('')
    const n = name.trim()
    const m = message.trim()
    if (!n || !m) return setError('Please add your name and a short wish.')
    if (trap) return // a bot filled the hidden field: do nothing
    setSending(true)
    try {
      const uid = await ensureGuest() // sign in quietly only now, when they actually post
      await setDoc(doc(db, 'wishes', uid), { name: n, message: m, createdAt: serverTimestamp() })
      // show it instantly at the top, without re-reading from the database
      setWishes((w) => [{ id: uid, name: n, message: m, createdAt: new Date() }, ...w.filter((x) => x.id !== uid)])
      setMyId(uid)
    } catch (err) {
      const code = (err as { code?: string }).code
      if (code === 'permission-denied') setError('It looks like you have already sent a wish from this device. Thank you!')
      else if (code === 'auth/too-many-requests') setError('A lot of guests are signing in right now. Please try again in a few minutes.')
      else setError('Something went wrong. Please check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="wishes" className="bg-sage-pale/50 px-5 py-24">
      <div className="mx-auto max-w-2xl">
        <Heading kicker="Blessings" title="Guest Wishes" sub="Leave a few words for Arun & Mariya. Your wish appears here for everyone to see." />

        {myId ? (
          <div className="mb-10 border border-gold bg-white p-6 text-center shadow-lg shadow-sage/10">
            <p className="font-script text-4xl text-sage-dark">Thank you!</p>
            <p className="mt-1 text-sm text-ink/70">Your wish is at the top of the wall below.</p>
          </div>
        ) : (
          <form onSubmit={send} className="mb-10 space-y-4 bg-white p-6 shadow-lg shadow-sage/10">
            <input className={field} placeholder="Your name" aria-label="Your name" maxLength={MAX_NAME} value={name} onChange={(e) => setName(e.target.value)} />
            <div>
              <textarea className={field} rows={4} placeholder="Your wish for the couple" aria-label="Your wish for the couple" maxLength={MAX_MSG} value={message} onChange={(e) => setMessage(e.target.value)} />
              <p className="mt-1 text-right text-xs text-ink/60">{message.length}/{MAX_MSG}</p>
            </div>
            {/* honeypot: hidden from people, tempting for bots */}
            <input tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={trap} onChange={(e) => setTrap(e.target.value)} className="absolute -left-[9999px] size-0 opacity-0" />
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <button disabled={sending} className="w-full border-2 border-gold bg-gold py-3 text-xs font-medium uppercase tracking-[.2em] text-white hover:bg-transparent hover:text-gold-dark disabled:opacity-60">
              {sending ? 'Sending…' : 'Send Wish'}
            </button>
          </form>
        )}

        {loading && <p className="text-center text-ink/70">Loading wishes…</p>}
        {loadError && <p className="text-center text-ink/70">Couldn’t load the wishes just now. Please refresh in a moment.</p>}
        {!loading && !loadError && wishes.length === 0 && <p className="text-center text-ink/70">Be the first to leave a wish!</p>}

        <ul className="space-y-4">
          {wishes.map((w) => (
            <li key={w.id} className={`border bg-white p-5 shadow-md shadow-sage/10 ${w.id === myId ? 'border-gold' : 'border-sage-pale'}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-display text-lg text-sage-dark">{w.name}</h3>
                <span className="text-xs uppercase tracking-[.15em] text-gold-dark">{fmt(w.createdAt)}</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap break-words text-ink">{w.message}</p>
            </li>
          ))}
        </ul>
        {wishes.length >= SHOW && <p className="mt-6 text-center text-xs uppercase tracking-[.2em] text-sage">Showing the latest {SHOW} wishes</p>}
      </div>
    </section>
  )
}