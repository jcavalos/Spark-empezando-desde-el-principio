import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { KNOW_ME_QUESTIONS } from '../data/knowMeQuestions'

export default function KnowMe({ roomId, room, uid, me, otherUid, other }) {
  const spice = room.spice || 2
  const questions = KNOW_ME_QUESTIONS.filter((q) => !q.spicy || spice >= 3)
  const k = room.knowState || { index: 0, phase: 'answer', answers: {}, guesses: {} }
  const index = k.index || 0
  const question = questions[index]
  const ref = doc(db, 'rooms', roomId)

  const [draft, setDraft] = useState('')

  if (!question) {
    return <p className="text-center text-muted text-sm">Ya jugaron todas las preguntas de este nivel. Suban el medidor para más.</p>
  }

  const myAnswer = k.answers?.[uid]?.[question.id]
  const otherAnswer = k.answers?.[otherUid]?.[question.id]
  const myGuess = k.guesses?.[uid]?.[question.id]
  const otherGuess = k.guesses?.[otherUid]?.[question.id]

  const bothAnswered = myAnswer !== undefined && otherAnswer !== undefined
  const bothGuessed = myGuess !== undefined && otherGuess !== undefined

  async function submitAnswer(e) {
    e.preventDefault()
    if (!draft.trim()) return
    await updateDoc(ref, {
      [`knowState.answers.${uid}.${question.id}`]: draft.trim(),
      'knowState.index': index,
      'knowState.phase': 'answer',
    })
    setDraft('')
  }

  async function submitGuess(e) {
    e.preventDefault()
    if (!draft.trim()) return
    await updateDoc(ref, {
      [`knowState.guesses.${uid}.${question.id}`]: draft.trim(),
    })
    setDraft('')
  }

  async function nextQuestion() {
    await updateDoc(ref, { 'knowState.index': index + 1 })
  }

  const phase = !bothAnswered ? 'answer' : !bothGuessed ? 'guess' : 'reveal'

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted text-center mb-2">
        Pregunta {index + 1} de {questions.length}
      </p>
      <p className="font-display text-xl text-center mb-6">{question.text}</p>

      {phase === 'answer' && (
        <div className="card p-5">
          {myAnswer === undefined ? (
            <form onSubmit={submitAnswer} className="space-y-3">
              <p className="text-sm text-muted">Tu respuesta (no la ve tu amiga todavía):</p>
              <input className="input" value={draft} onChange={(e) => setDraft(e.target.value)} autoFocus />
              <button className="btn-gold w-full">Guardar respuesta</button>
            </form>
          ) : (
            <p className="text-sm text-muted text-center">
              Ya respondiste. Esperando a {other?.name || 'tu amiga'}…
            </p>
          )}
        </div>
      )}

      {phase === 'guess' && (
        <div className="card p-5">
          {myGuess === undefined ? (
            <form onSubmit={submitGuess} className="space-y-3">
              <p className="text-sm text-muted">
                Adivina qué respondió {other?.name || 'tu amiga'}:
              </p>
              <input className="input" value={draft} onChange={(e) => setDraft(e.target.value)} autoFocus />
              <button className="btn-gold w-full">Adivinar</button>
            </form>
          ) : (
            <p className="text-sm text-muted text-center">Ya adivinaste. Esperando el resultado…</p>
          )}
        </div>
      )}

      {phase === 'reveal' && (
        <div className="space-y-3 animate-reveal">
          <div className="card p-4">
            <p className="text-xs text-gold mb-1">Tu respuesta</p>
            <p className="text-sm mb-3">{myAnswer}</p>
            <p className="text-xs text-gold mb-1">Lo que {other?.name || 'ella'} adivinó de ti</p>
            <p className="text-sm">{otherGuess}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-gold mb-1">Respuesta de {other?.name || 'tu amiga'}</p>
            <p className="text-sm mb-3">{otherAnswer}</p>
            <p className="text-xs text-gold mb-1">Lo que tú adivinaste</p>
            <p className="text-sm">{myGuess}</p>
          </div>
          <button onClick={nextQuestion} className="btn-primary w-full">Siguiente pregunta</button>
        </div>
      )}
    </div>
  )
}
