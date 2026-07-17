import { useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import Lobby from './components/Lobby'
import GameRoom from './components/GameRoom'

export default function App() {
  const { loading } = useAuth()
  const [roomId, setRoomId] = useState(null)

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted">Cargando…</div>
  }

  if (!roomId) {
    return <Lobby onEnterRoom={setRoomId} />
  }

  return <GameRoom roomId={roomId} onLeave={() => setRoomId(null)} />
}
