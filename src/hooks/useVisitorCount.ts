import { useEffect, useState } from 'react'
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const KEY = 'am-wedding-visited' // remembers, in this browser only, knows it has been counted only

// Runs once per page load, even if React runs the effect twice in development.
let pending: Promise<number | null> | null = null

function countThisVisit(): Promise<number | null> {
  return (pending ??= (async () => {
    try {
      const ref = doc(db, 'stats', 'visits')
      let n: number = (await getDoc(ref)).data()?.count ?? 0

      let seen = false
      try { seen = localStorage.getItem(KEY) === '1' } catch { /* storage blocked: count anyway */ }

      if (!seen) {
        await updateDoc(ref, { count: increment(1) }) // +1, calculated safely on the server
        n += 1
        try { localStorage.setItem(KEY, '1') } catch { /* ignore */ }
      }
      return n
    } catch {
      return null // stay hidden if anything fails
    }
  })())
}

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null)
  useEffect(() => {
    let cancelled = false
    countThisVisit().then((n) => { if (!cancelled) setCount(n) })
    return () => { cancelled = true }
  }, [])
  return count
}