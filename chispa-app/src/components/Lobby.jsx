import { useState } from 'react'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

function randomCode() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  let code = ''
  for (let i = 0; i < 4; i++) code += letters[Math.floor(Math.random() * letters.length)]
  return code
}

export default function Lobby({ onEnterRoom }) {
  const { uid, name, saveName } = useAuth()
  const [localName, setLocalName] = useState(name)
  const [joinCode, setJoinCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function createRoom() {
    if (!localName.trim()) { setError('Ponle tu nombre primero.'); return }
    setBusy(true)
    saveName(localName.trim())
    const code = randomCode()
    await setDoc(doc(db, 'rooms', code), {
      createdAt: serverTimestamp(),
      spice: 2,
      mode: 'lobby',
      players: {
        [uid]: { name: localName.trim(), role: 'A' },
      },
    })
    setBusy(false)
    onEnterRoom(code)
  }

  async function joinRoom(e) {
    e.preventDefault()
    if (!localName.trim()) { setError('Ponle tu nombre primero.'); return }
    const code = joinCode.trim().toUpperCase()
    if (!code) return
    setBusy(true)
    setError('')
    const ref = doc(db, 'rooms', code)
    const snap = await getDoc(ref)
    if (!snap.exists()) {
      setError('No encontramos esa sala. Revisa el código.')
      setBusy(false)
      return
    }
    saveName(localName.trim())
    const players = snap.data().players || {}
    const hasA = Object.values(players).some((p) => p.role === 'A')
    const role = hasA ? 'B' : 'A'
    await updateDoc(ref, {
      [`players.${uid}`]: { name: localName.trim(), role },
    })
    setBusy(false)
    onEnterRoom(code)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-display italic text-4xl text-gold">Chispa</p>
          <p className="text-muted text-sm mt-2">Un juego para dos, a distancia</p>
        </div>

        <div className="card p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted">Tu nombre</label>
            <input
              className="input mt-1"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              placeholder="¿Cómo te dicen?"
            />
          </div>

          <button onClick={createRoom} disabled={busy} className="btn-gold w-full">
            Crear una sala nueva
          </button>

          <div className="flex items-center gap-3 text-muted text-xs">
            <div className="h-px bg-white/10 flex-1" />
            o
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <form onSubmit={joinRoom} className="flex gap-2">
            <input
              className="input uppercase tracking-widest text-center"
              maxLength={4}
              placeholder="CÓDIGO"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
            <button className="btn-primary shrink-0" disabled={busy}>Unirme</button>
          </form>

          {error && <p className="text-blush text-sm">{error}</p>}
        </div>
      </div>
    </div>
  )
}
