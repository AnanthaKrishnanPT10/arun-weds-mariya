import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

export const db = getFirestore(app)
export const auth = getAuth(app)

// Gives this browser a hidden, permanent ID (no login screen) and returns it.
export async function ensureGuest(): Promise<string> {
  await auth.authStateReady() // wait until Firebase has restored any saved ID
  if (auth.currentUser) return auth.currentUser.uid
  const cred = await signInAnonymously(auth)
  return cred.user.uid
}