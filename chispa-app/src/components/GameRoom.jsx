import { useEffect, useState } from 'react'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import SpiceSlider from './SpiceSlider'
import TruthOrDare from '../modes/TruthOrDare'
import KnowMe from '../modes/KnowMe'
import Adventure from '../modes/Adventure'
import WouldYouRather from '../modes/WouldYouRather'
import PointsGame from '../modes/PointsGame'

const MODES = [
  { id: 'truth', label: 'Verdad o Reto' },
  { id: 'knowme', label: '¿Qué tanto me conoces?' },
  { id: 'adventure', label: 'Que pasa si?' },
  { id: 'prefer', label: '¿Qué prefieres?' },
  { id: 'points', label: 'Preparate para perder!' },
]

export default function GameRoom({ roomId, onLeave }) {
  const { uid } = useAuth()
  const [room, setRoom] = useState(null)

  useEffect(() => {
    return onSnapshot(doc(db, 'rooms', roomId), (snap) => {
      setRoom(snap.exists() ? snap.data() : null)
    })
  }, [roomId])

  if (!room) {
    return <div className="min-h-screen flex items-center justify-center text-muted">Cargando sala…</div>
  }

  const players = room.players || {}
  const me = players[uid]
  const otherEntry = Object.entries(players).find(([id]) => id !== uid)
  const other = otherEntry?.[1]

  async function setMode(modeId) {
    await updateDoc(doc(db, 'rooms', roomId), { mode: modeId })
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-bg/90 backdrop-blur border-b border-white/10">
        <div className="max-w-2xl mx-auto px-5 pt-5 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display italic text-2xl text-gold leading-tight">Chispa</p>
              <p className="text-xs text-muted">
                Sala <span className="font-mono">{roomId}</span> · {me?.name || 'Tú'}
                {other ? ` & ${other.name}` : ' · esperando a alguien más…'}
              </p>
            </div>
            <button onClick={onLeave} className="text-xs text-muted hover:text-ink">Salir</button>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <SpiceSlider roomId={roomId} spice={room.spice || 2} />
          </div>

          <nav className="flex gap-1 mt-4 -mx-1 overflow-x-auto">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  room.mode === m.id ? 'bg-wine text-ink' : 'text-muted hover:bg-white/5'
                }`}
              >
                {m.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-6">
        {!other && (
          <div className="card p-6 text-center mb-6">
            <p className="text-sm text-muted">
              Comparte el código <span className="font-mono text-ink">{roomId}</span> para que
              se una tu amiga. Mientras, puedes explorar los modos.
            </p>
          </div>
        )}

        {(!room.mode || room.mode === 'lobby') && (
          <div className="grid gap-3">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className="card p-5 text-left hover:border-gold/40 transition-colors"
              >
                <p className="font-display text-lg">{m.label}</p>
              </button>
            ))}
          </div>
        )}

        {room.mode === 'truth' && (
          <TruthOrDare roomId={roomId} room={room} uid={uid} me={me} otherUid={otherEntry?.[0]} other={other} />
        )}
        {room.mode === 'knowme' && (
          <KnowMe roomId={roomId} room={room} uid={uid} me={me} otherUid={otherEntry?.[0]} other={other} />
        )}
        {room.mode === 'adventure' && (
          <Adventure roomId={roomId} room={room} uid={uid} me={me} otherUid={otherEntry?.[0]} other={other} />
        )}
        {room.mode === 'prefer' && (
          <WouldYouRather roomId={roomId} room={room} uid={uid} me={me} otherUid={otherEntry?.[0]} other={other} />
        )}
        {room.mode === 'points' && (
          <PointsGame roomId={roomId} room={room} uid={uid} me={me} otherUid={otherEntry?.[0]} other={other} />
        )}
      </main>
    </div>
  )
}