import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [uid, setUid] = useState(null)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState(() => localStorage.getItem('chispa-name') || '')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUid(u.uid)
        setLoading(false)
      } else {
        await signInAnonymously(auth)
      }
    })
    return unsub
  }, [])

  function saveName(n) {
    localStorage.setItem('chispa-name', n)
    setName(n)
  }

  return (
    <AuthContext.Provider value={{ uid, loading, name, saveName }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
