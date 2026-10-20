// config page 
export const asset = (file: string) => `${import.meta.env.BASE_URL}images/${file}`

export type WeddingEvent = {
  title: string; time: string; venue: string; address: string
  map: string; start: string; end: string // start/end in UTC, YYYYMMDDTHHMMSSZ (IST = UTC+5:30)
}
export type LiveStream = { title: string; time: string; url: string } // url: any YouTube link; '' = "coming soon"
export type Photo = { file: string; caption?: string } // caption shows on hover (optional)

export const wedding = {
  groom: { name: 'Arun J Thomas', photo: 'groom.webp', child: 'S/o', parents: ['Mrs. Siji Jiji', 'Mr. Jiji Thomas (Rtd. KSEB)'], home: 'Maliyelil (H), Malipara, Kothamangalam' },
  bride: { name: 'Mariya John', photo: 'bride.webp', child: 'D/o', parents: ['Mrs. Jomy John', 'Mr. K. A John (Rtd. KSEB)'], home: 'Maradiyil (H), Pindimana, Kothamangalam' },
  dateISO: '2026-12-28T10:00:00+05:30',
  dateLabel: 'Monday, 28 December 2026',
  place: 'Kothamangalam, Kerala',
  verse: { text: 'And now these three remain: faith, hope and love. But the greatest of these is love.', ref: '1 Corinthians 13:13' },
  wishesFrom: 'Eldho John & Anna Jiji',
  whatsapp: '', // (country code + number, no + or spaces). Empty = "Are you attending?" section hidden.

  events: [
    { title: 'Wedding Ceremony', time: 'From 10:00 AM', venue: 'St’ John’s Jacobite Syrian Church, Pindimana', address: 'Chelad P.O., Pindimana, Kothamangalam, Kerala',
      map: 'https://maps.app.goo.gl/c2gyLCm1UwH4dwk28?g_st=ic', start: '20261228T043000Z', end: '20261228T073000Z' },
    { title: 'Wedding Reception', time: 'From 6:00 PM', venue: 'Mar Basil Convention Centre', address: 'Kothamangalam, Kerala 686691',
      map: 'https://maps.app.goo.gl/yBMgU383XiVg7irj9?g_st=ic', start: '20261228T123000Z', end: '20261228T163000Z' },
  ] as WeddingEvent[],

  // YouTube links here.
  live: [
    { title: 'Wedding Ceremony', time: '10:00 AM, 28 December 2026', url: '' },
    { title: 'Wedding Reception', time: '6:00 PM, 28 December 2026', url: '' },
  ] as LiveStream[],

  gallery: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ file: `gallery-${n}.webp` })) as Photo[],
}

export const calendarUrl = (e: WeddingEvent) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${e.title} – Arun & Mariya`)}` +
  `&dates=${e.start}/${e.end}&location=${encodeURIComponent(`${e.venue}, ${e.address}`)}`

// Turns youtu.be/ID, youtube.com/watch?v=ID or /live/ID links into an embeddable URL (null if not recognised).
export function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|\/live\/|\/embed\/)([\w-]{11})/)
  return m ? `https://www.youtube.com/embed/${m[1]}` : null
}
