import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { LEVELS } from '../data/prompts'

export default function SpiceSlider({ roomId, spice }) {
  async function setSpice(level) {
    await updateDoc(doc(db, 'rooms', roomId), { spice: level })
  }

  const current = LEVELS.find((l) => l.id === spice) || LEVELS[1]

  return (
    <div className="flex items-center gap-2">
      {LEVELS.map((l) => (
        <button
          key={l.id}
          onClick={() => setSpice(l.id)}
          title={l.label}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
            l.id === spice
              ? 'bg-wine scale-110 ring-2 ring-gold/60'
              : l.id < spice
                ? 'bg-wine/40'
                : 'bg-white/5'
          }`}
        >
          {l.emoji}
        </button>
      ))}
      <span className="text-xs text-muted ml-1 hidden sm:inline">{current.label}</span>
    </div>
  )
}
