import { useState } from 'react'
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
  const [draft, setDraft] = useState('')
  const [counterDraft, setCounterDraft] = useState('')
  const [showCounter, setShowCounter] = useState(false)

  const current = t.current

  async function startGame() {
    await updateDoc(ref, {
      truthState: { turnUid: uid, current: null, passes: {} },
    })
  }

  function newPrompt(type) {
    const options = PROMPTS[spice]?.[type] || []
    return { type, text: randomFrom(options), level: spice }
  }

  async function draw(type) {
    const base = newPrompt(type)
    if (type === 'truth') {
      await updateDoc(ref, {
        'truthState.current': { ...base, answer: null, verdict: null },
      })
    } else {
      await updateDoc(ref, {
        'truthState.current': { ...base, proposedDate: null, dareStatus: null },
      })
    }
  }

  // Responder una Verdad
  async function submitTruthAnswer(e) {
    e.preventDefault()
    if (!draft.trim()) return
    await updateDoc(ref, { 'truthState.current.answer': draft.trim() })
    setDraft('')
  }

  // Pasar en Verdad: no salta el turno, te manda directo a un Reto
  async function passTruthToDare() {
    const base = newPrompt('dare')
    await updateDoc(ref, {
      'truthState.current': { ...base, proposedDate: null, dareStatus: null },
    })
  }

  // La otra persona califica la respuesta de Verdad
  async function judgeTruth(verdict) {
    await updateDoc(ref, { 'truthState.current.verdict': verdict })
  }

  // Proponer fecha para cumplir el Reto
  async function submitDareDate(e) {
    e.preventDefault()
    if (!draft.trim()) return
    await updateDoc(ref, {
      'truthState.current.proposedDate': draft.trim(),
      'truthState.current.dareStatus': 'proposed',
    })
    setDraft('')
  }

  async function acceptDare() {
    await updateDoc(ref, { 'truthState.current.dareStatus': 'accepted' })
  }

  async function counterDare(e) {
    e.preventDefault()
    if (!counterDraft.trim()) return
    await updateDoc(ref, {
      'truthState.current.proposedDate': counterDraft.trim(),
      'truthState.current.dareStatus': 'countered',
    })
    setCounterDraft('')
    setShowCounter(false)
  }

  // Pasar en Reto: sí salta el turno de verdad, cuenta para subir el nivel
  async function passDare() {
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

  async function nextTurn() {
    if (!otherUid) return
    await updateDoc(ref, {
      'truthState.turnUid': otherUid,
      'truthState.current': null,
    })
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
        <p className="font-display text-2xl">{isMyTurn ? 'ti' : other?.name || 'tu amiga'}</p>
      </div>

      {!current && isMyTurn && (
        <div className="flex gap-3 justify-center mb-4">
          <button onClick={() => draw('truth')} className="btn-primary">Sacar Verdad</button>
          <button onClick={() => draw('dare')} className="btn-gold">Sacar Reto</button>
        </div>
      )}
      {!current && !isMyTurn && (
        <p className="text-center text-muted text-sm">Esperando a que {other?.name || 'tu amiga'} elija…</p>
      )}

      {current?.type === 'truth' && (
        <div className="card p-6 animate-reveal space-y-4">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wide text-gold mb-2">Verdad</p>
            <p className="font-display text-xl">{current.text}</p>
          </div>

          {current.answer === null && isMyTurn && (
            <form onSubmit={submitTruthAnswer} className="space-y-3 pt-2">
              <textarea
                className="input min-h-[80px]"
                placeholder="Escribe tu respuesta aquí…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                autoFocus
              />
              <div className="flex gap-3 justify-center">
                <button type="button" onClick={passTruthToDare} className="btn-ghost">Paso (te vas a un Reto)</button>
                <button type="submit" className="btn-gold">Responder</button>
              </div>
            </form>
          )}
          {current.answer === null && !isMyTurn && (
            <p className="text-center text-muted text-sm">Esperando su respuesta…</p>
          )}

          {current.answer !== null && (
            <div className="border-t border-white/10 pt-4 space-y-3 animate-reveal">
              <p className="text-sm italic text-center">"{current.answer}"</p>

              {current.verdict === null && !isMyTurn && (
                <div className="flex justify-center gap-3">
                  <button onClick={() => judgeTruth('verdad')} className="btn-primary">Creo que es Verdad</button>
                  <button onClick={() => judgeTruth('mentira')} className="btn-ghost">Creo que es Mentira</button>
                </div>
              )}
              {current.verdict === null && isMyTurn && (
                <p className="text-center text-muted text-sm">Esperando su veredicto…</p>
              )}
              {current.verdict !== null && (
                <p className="text-center font-display text-lg">
                  {other?.name || 'Ella'} dice: {current.verdict === 'verdad' ? '✅ Verdad' : '🤨 Mentira'}
                </p>
              )}

              {current.verdict !== null && (
                <div className="flex justify-center pt-2">
                  <button onClick={nextTurn} className="btn-primary">Siguiente turno</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {current?.type === 'dare' && (
        <div className="card p-6 animate-reveal space-y-4">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wide text-gold mb-2">Reto</p>
            <p className="font-display text-xl">{current.text}</p>
          </div>

          {current.dareStatus === null && isMyTurn && (
            <form onSubmit={submitDareDate} className="space-y-3 pt-2">
              <input
                className="input"
                placeholder="¿Cuándo lo vas a cumplir? (ej. hoy en la noche, el viernes…)"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                autoFocus
              />
              <div className="flex gap-3 justify-center">
                <button type="button" onClick={passDare} className="btn-ghost">Paso</button>
                <button type="submit" className="btn-gold">Enviar</button>
              </div>
            </form>
          )}
          {current.dareStatus === null && !isMyTurn && (
            <p className="text-center text-muted text-sm">Esperando que proponga cuándo lo cumple…</p>
          )}

          {current.dareStatus === 'proposed' && (
            <div className="border-t border-white/10 pt-4 space-y-3 text-center animate-reveal">
              <p className="text-sm text-muted">Propone cumplirlo:</p>
              <p className="font-display text-lg">{current.proposedDate}</p>

              {!isMyTurn && !showCounter && (
                <div className="flex justify-center gap-3">
                  <button onClick={acceptDare} className="btn-primary">Aceptar fecha</button>
                  <button onClick={() => setShowCounter(true)} className="btn-ghost">Pedir que sea antes</button>
                </div>
              )}
              {!isMyTurn && showCounter && (
                <form onSubmit={counterDare} className="flex gap-2 justify-center">
                  <input
                    className="input"
                    placeholder="Nueva fecha límite que propones"
                    value={counterDraft}
                    onChange={(e) => setCounterDraft(e.target.value)}
                    autoFocus
                  />
                  <button className="btn-gold shrink-0">Proponer</button>
                </form>
              )}
              {isMyTurn && (
                <p className="text-muted text-sm">Esperando que {other?.name || 'ella'} responda…</p>
              )}
            </div>
          )}

          {(current.dareStatus === 'accepted' || current.dareStatus === 'countered') && (
            <div className="border-t border-white/10 pt-4 space-y-3 text-center animate-reveal">
              <p className="text-sm text-muted">
                {current.dareStatus === 'accepted' ? 'Fecha aceptada:' : 'Nueva fecha acordada:'}
              </p>
              <p className="font-display text-lg text-gold">{current.proposedDate}</p>
              <button onClick={nextTurn} className="btn-primary">Siguiente turno</button>
            </div>
          )}
        </div>
      )}

      <p className="text-center text-xs text-muted mt-6">
        Pasar dos veces seguidas en Reto sube el nivel un escalón. Nivel actual: {levelInfo?.emoji} {levelInfo?.label}
      </p>
    </div>
  )
}