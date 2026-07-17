import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { PROMPTS, LEVELS } from '../data/prompts'

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function TruthOrDare({ roomId, room, uid, me, otherUid, other }) {
  const spice = room.spice || 2
  const t = room.truthState || {}
  const isMyTurn = t.turnUid === uid
  const ref = doc(db, 'rooms', roomId)

  async function startGame() {
    await updateDoc(ref, {
      truthState: { turnUid: uid, current: null, passes: {} },
    })
  }

  async function draw(type) {
    const options = PROMPTS[spice]?.[type] || []
    if (options.length === 0) return
    await updateDoc(ref, {
      'truthState.current': { type, text: randomFrom(options), level: spice },
    })
  }

  async function nextTurn() {
    if (!otherUid) return
    await updateDoc(ref, {
      'truthState.turnUid': otherUid,
      'truthState.current': null,
    })
  }

  async function pass() {
    const passes = t.passes || {}
    const mine = (passes[uid] || 0) + 1
    if (mine >= 2) {
      await updateDoc(ref, {
        [`truthState.passes.${uid}`]: 0,
        spice: Math.min(5, spice + 1),
        'truthState.turnUid': otherUid || uid,
        'truthState.current': null,
      })
    } else {
      await updateDoc(ref, {
        [`truthState.passes.${uid}`]: mine,
        'truthState.turnUid': otherUid || uid,
        'truthState.current': null,
      })
    }
  }

  const levelInfo = LEVELS.find((l) => l.id === spice)

  if (!t.turnUid) {
    return (
      <div className="card p-6 text-center">
        <p className="text-sm text-muted mb-4">
          Nivel actual: {levelInfo?.emoji} {levelInfo?.label}
        </p>
        <button onClick={startGame} className="btn-gold">Empezar el juego</button>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-wide text-muted">Turno de</p>
        <p className="font-display text-2xl">
          {isMyTurn ? 'ti' : other?.name || 'tu amiga'}
        </p>
      </div>

      {!t.current && isMyTurn && (
        <div className="flex gap-3 justify-center mb-4">
          <button onClick={() => draw('truth')} className="btn-primary">Sacar Verdad</button>
          <button onClick={() => draw('dare')} className="btn-gold">Sacar Reto</button>
        </div>
      )}

      {!t.current && !isMyTurn && (
        <p className="text-center text-muted text-sm">Esperando a que {other?.name || 'tu amiga'} elija…</p>
      )}

      {t.current && (
        <div className="card p-6 animate-reveal text-center space-y-4">
          <p className="text-xs uppercase tracking-wide text-gold">
            {t.current.type === 'truth' ? 'Verdad' : 'Reto'}
          </p>
          <p className="font-display text-xl">{t.current.text}</p>
          {isMyTurn && (
            <div className="flex gap-3 justify-center pt-2">
              <button onClick={pass} className="btn-ghost">Paso</button>
              <button onClick={nextTurn} className="btn-primary">Ya respondí, siguiente</button>
            </div>
          )}
        </div>
      )}

      <p className="text-center text-xs text-muted mt-6">
        Pasar dos veces seguidas sube el nivel un escalón. Nivel actual: {levelInfo?.emoji} {levelInfo?.label}
      </p>
    </div>
  )
}
