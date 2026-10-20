import { useEffect, useState } from 'react'

export function useCountdown(target: string) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const diff = Math.max(0, new Date(target).getTime() - now)
  return { Days: Math.floor(diff / 864e5), Hours: Math.floor(diff / 36e5) % 24, Mins: Math.floor(diff / 6e4) % 60, Secs: Math.floor(diff / 1e3) % 60 }
}
