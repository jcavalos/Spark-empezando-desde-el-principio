import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { STORY, STORY_START_ID } from '../data/story'

export default function Adventure({ roomId, room, uid, otherUid, other }) {
  const a = room.adventureState || { nodeId: STORY_START_ID, choices: {} }
  const nodeId = a.nodeId || STORY_START_ID
  const node = STORY[nodeId]
  const ref = doc(db, 'rooms', roomId)

  const myChoice = a.choices?.[uid]
  const otherChoice = a.choices?.[otherUid]
  const bothChose = myChoice !== undefined && otherChoice !== undefined

  async function choose(optionId) {
    if (myChoice) return
    const nextChoices = { ...(a.choices || {}), [uid]: optionId }
    const willBothChoose = nextChoices[uid] !== undefined && nextChoices[otherUid] !== undefined

    if (willBothChoose && otherUid) {
      const matched = nextChoices[uid] === nextChoices[otherUid]
      const nextId = matched ? node.onMatch : node.onMismatch
      await updateDoc(ref, {
        'adventureState.nodeId': nextId,
        'adventureState.choices': {},
      })
    } else {
      await updateDoc(ref, {
        [`adventureState.choices.${uid}`]: optionId,
      })
    }
  }

  async function restart() {
    await updateDoc(ref, {
      adventureState: { nodeId: STORY_START_ID, choices: {} },
    })
  }

  if (!node) return null

  if (node.end) {
    return (
      <div className="card p-6 text-center space-y-4 animate-reveal">
        <p className="text-xs uppercase tracking-wide text-gold">{node.resultLabel}</p>
        <p className="font-display text-xl">{node.text}</p>
        <button onClick={restart} className="btn-primary">Empezar otra historia</button>
      </div>
    )
  }

  return (
    <div>
      <div className="card p-6 mb-5">
        <p className="text-sm leading-relaxed">{node.text}</p>
      </div>

      {!myChoice ? (
        <div className="space-y-2">
          {node.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => choose(opt.id)}
              className="card w-full text-left p-4 hover:border-gold/40 transition-colors"
            >
              {opt.label}
            </button>
          ))}
          <p className="text-center text-xs text-muted pt-2">
            Eliges en secreto. Nadie ve tu opción hasta que ambos hayan elegido.
          </p>
        </div>
      ) : (
        <p className="text-center text-muted text-sm">
          {bothChose ? 'Calculando el rumbo de la historia…' : `Esperando a que ${other?.name || 'tu amiga'} elija…`}
        </p>
      )}
    </div>
  )
}
