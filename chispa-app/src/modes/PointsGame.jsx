import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { TWENTY_QUESTIONS, PUNISHMENTS } from '../data/pointsGame'

const TOTAL = TWENTY_QUESTIONS.length

function randomPunishment() {
  return PUNISHMENTS[Math.floor(Math.random() * PUNISHMENTS.length)]
}

export default function PointsGame({ roomId, room, uid, otherUid, other }) {
  const p = room.pointsState || { index: 0, choices: {}, scores: {} }
  const index = p.index || 0
  const scores = p.scores || {}
  const q = TWENTY_QUESTIONS[index]
  const ref = doc(db, 'rooms', roomId)

  const myChoice = p.choices?.[uid]
  const otherChoice = p.choices?.[otherUid]
  const bothChose = myChoice !== undefined && otherChoice !== undefined
  const myScore = scores[uid] || 0
  const otherScore = otherUid ? (scores[otherUid] || 0) : 0

  async function choose(optionId) {
    if (myChoice) return
    await updateDoc(ref, { [`pointsState.choices.${uid}`]: optionId })
  }

  async function nextRound() {
    const matched = myChoice === otherChoice
    const newScores = { ...scores }
    if (matched && otherUid) {
      newScores[uid] = (newScores[uid] || 0) + 1
      newScores[otherUid] = (newScores[otherUid] || 0) + 1
    }
    const nextIndex = index + 1

    if (nextIndex >= TOTAL) {
      const finalMine = newScores[uid] || 0
      const finalOther = otherUid ? (newScores[otherUid] || 0) : 0
      let punishedUid = null
      if (finalMine < finalOther) punishedUid = uid
      else if (finalOther < finalMine) punishedUid = otherUid
      await updateDoc(ref, {
        'pointsState.index': nextIndex,
        'pointsState.choices': {},
        'pointsState.scores': newScores,
        'pointsState.punishedUid': punishedUid,
        'pointsState.punishment': punishedUid ? randomPunishment() : null,
      })
    } else {
      await updateDoc(ref, {
        'pointsState.index': nextIndex,
        'pointsState.choices': {},
        'pointsState.scores': newScores,
      })
    }
  }

  async function restart() {
    await updateDoc(ref, { pointsState: { index: 0, choices: {}, scores: {} } })
  }

  const finished = index >= TOTAL

  if (finished) {
    const iAmPunished = p.punishedUid === uid
    const tie = !p.punishedUid
    return (
      <div className="card p-6 text-center space-y-4 animate-reveal">
        <p className="text-xs uppercase tracking-wide text-gold">Resultado final</p>
        <div className="flex justify-center gap-8 text-sm">
          <div><p className="text-muted text-xs">Tú</p><p className="font-display text-2xl">{myScore}</p></div>
          <div><p className="text-muted text-xs">{other?.name || 'Ella'}</p><p className="font-display text-2xl">{otherScore}</p></div>
        </div>
        {tie ? (
          <p className="text-sm text-muted">¡Empate! Nadie saca castigo esta vez… o pueden sacar uno cada quien, si se animan.</p>
        ) : (
          <div className="border-t border-white/10 pt-4">
            <p className="text-sm text-muted mb-2">
              {iAmPunished ? 'Tú tuviste menos puntos. Tu castigo:' : `${other?.name || 'Ella'} tuvo menos puntos. Su castigo:`}
            </p>
            <p className="font-display text-lg text-blush">{p.punishment}</p>
          </div>
        )}
        <button onClick={restart} className="btn-primary">Jugar otra ronda</button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3 text-xs text-muted">
        <span>Pregunta {index + 1} de {TOTAL}</span>
        <span>Tú {myScore} · {other?.name || 'Ella'} {otherScore}</span>
      </div>

      {!bothChose ? (
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => choose('a')}
            disabled={!!myChoice}
            className={`card p-5 text-center transition-colors ${myChoice === 'a' ? 'border-gold ring-2 ring-gold/40' : 'hover:border-gold/40'} disabled:cursor-default`}
          >
            <p className="font-display text-lg">{q.a}</p>
          </button>
          <div className="text-center text-xs text-muted">o</div>
          <button
            onClick={() => choose('b')}
            disabled={!!myChoice}
            className={`card p-5 text-center transition-colors ${myChoice === 'b' ? 'border-gold ring-2 ring-gold/40' : 'hover:border-gold/40'} disabled:cursor-default`}
          >
            <p className="font-display text-lg">{q.b}</p>
          </button>
          {myChoice && (
            <p className="text-center text-muted text-sm pt-1">
              Esperando a que {other?.name || 'tu amiga'} elija…
            </p>
          )}
        </div>
      ) : (
        <div className="card p-6 text-center space-y-3 animate-reveal">
          <p className={myChoice === otherChoice ? 'text-gold font-medium' : 'text-muted'}>
            {myChoice === otherChoice ? '✨ ¡Coincidieron! +1 punto para cada uno' : 'No coincidieron — sin puntos esta ronda'}
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <div>
              <p className="text-xs text-muted mb-1">Tú</p>
              <p>{myChoice === 'a' ? q.a : q.b}</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">{other?.name || 'Ella'}</p>
              <p>{otherChoice === 'a' ? q.a : q.b}</p>
            </div>
          </div>
          <button onClick={nextRound} className="btn-primary">Siguiente</button>
        </div>
      )}
    </div>
  )
}