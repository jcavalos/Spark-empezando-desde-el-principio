import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { WOULD_YOU_RATHER } from '../data/wouldYouRather'
import { LEVELS } from '../data/prompts'

export default function WouldYouRather({ roomId, room, uid, otherUid, other }) {
  const spice = room.spice || 2
  const questions = WOULD_YOU_RATHER[spice] || []
  const p = room.preferState || { index: 0, choices: {}, matches: 0 }
  const index = p.index || 0
  const matches = p.matches || 0
  const q = questions[index]
  const ref = doc(db, 'rooms', roomId)

  const myChoice = p.choices?.[uid]
  const otherChoice = p.choices?.[otherUid]
  const bothChose = myChoice !== undefined && otherChoice !== undefined
  const levelInfo = LEVELS.find((l) => l.id === spice)

  async function choose(optionId) {
    if (myChoice) return
    await updateDoc(ref, { [`preferState.choices.${uid}`]: optionId })
  }

  async function nextQuestion() {
    const matched = myChoice === otherChoice
    await updateDoc(ref, {
      'preferState.index': index + 1,
      'preferState.choices': {},
      'preferState.matches': matched ? matches + 1 : matches,
    })
  }

  if (!q) {
    return (
      <div className="card p-6 text-center space-y-3">
        <p className="font-display text-lg">¡Se acabaron las de este nivel!</p>
        <p className="text-sm text-muted">
          Coincidieron en {matches} de {questions.length}. Sube el medidor de intensidad
          para más preguntas, o reinicien esta ronda.
        </p>
        <button
          onClick={() => updateDoc(ref, { preferState: { index: 0, choices: {}, matches: 0 } })}
          className="btn-primary"
        >
          Reiniciar ronda
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3 text-xs text-muted">
        <span>Pregunta {index + 1} de {questions.length} · {levelInfo?.emoji} {levelInfo?.label}</span>
        <span>Coincidencias: {matches}</span>
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
            {myChoice === otherChoice ? '✨ ¡Coincidieron!' : 'No coincidieron esta vez'}
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
          <button onClick={nextQuestion} className="btn-primary">Siguiente</button>
        </div>
      )}
    </div>
  )
}