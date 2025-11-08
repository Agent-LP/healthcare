import React, { useEffect, useRef, useState } from 'react'
import { Habit, HabitActionHandlers } from './habit-types'
import { icons } from '../../helpers/icons'

export interface HabitItemProps extends HabitActionHandlers {
  habit: Habit
}

export const HabitItem: React.FC<HabitItemProps> = ({ habit, onComplete, onSkip, onEdit, onDelete }) => {
  const [count, setCount] = useState(0)
  const initialTimer = Math.max(0, habit.duracionSegundos ?? 0)
  const [remaining, setRemaining] = useState(initialTimer)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = window.setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          // Auto stop when reaching zero
          if (intervalRef.current) window.clearInterval(intervalRef.current)
          setRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [running])

  const handleStart = () => {
    if (remaining === 0 && initialTimer > 0) setRemaining(initialTimer)
    setRunning(true)
  }
  const handlePause = () => setRunning(false)
  const handleReset = () => {
    setRunning(false)
    setRemaining(initialTimer)
  }

  const color = habit.categoriaColor ?? '#E2E7F0'

  const actionBtn = (label: string, onClick: () => void) => (
    <button
      className="p-1 rounded hover:bg-[#E2E7F0] focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
      onClick={onClick}
      aria-label={label}
    >
      {icons[label] ?? icons.delete /* fallback por si no existe */}
    </button>
  )

  return (
    <li className="flex items-center justify-between gap-4 py-3 px-3 rounded-md hover:bg-[#E2E7F0]">
      <div className="flex items-start gap-3">
        <span className="mt-1 size-4 rounded-full" style={{ backgroundColor: color }} />
        <div>
          <div className="text-sm font-semibold text-[#2D3648]">{habit.nombre}</div>
          <div className="text-xs text-[#717D96]">{habit.subcategoria.replace(/_/g, ' ')}</div>
        </div>
      </div>

      {habit.tipo === 'Contadora' && (
        <div className="flex items-center gap-2" aria-label="Contador manual">
          <button
            className="px-2 py-1 rounded bg-[#E2E7F0]"
            onClick={() => setCount((c) => Math.max(0, c - 1))}
            aria-label="Disminuir"
          >
            -
          </button>
          <div className="min-w-8 text-center" aria-live="polite">{count}</div>
          <button className="px-2 py-1 rounded bg-[#E2E7F0]" onClick={() => setCount((c) => c + 1)} aria-label="Aumentar">
            +
          </button>
        </div>
      )}

      {habit.tipo === 'Cronometrada' && (
        <div className="flex items-center gap-2" aria-label="Temporizador">
          <div className="tabular-nums min-w-14 text-center">{new Date(remaining * 1000).toISOString().substring(14, 19)}</div>
          {!running ? (
            <button className="px-2 py-1 rounded bg-[#E2E7F0]" onClick={handleStart} aria-label="Iniciar">▶</button>
          ) : (
            <button className="px-2 py-1 rounded bg-[#E2E7F0]" onClick={handlePause} aria-label="Pausar">❚❚</button>
          )}
          <button className="px-2 py-1 rounded bg-[#E2E7F0]" onClick={handleReset} aria-label="Reiniciar">↺</button>
        </div>
      )}
      {habit.tipo !== 'Cronometrada' && (
        <div className="min-w-14 text-center text-[#717D96]" aria-hidden>
          {/* Empty placeholder to align with timed habits */}
        </div>
      )}

      <div className="flex items-center gap-1 text-[#2D2E48]">
        {actionBtn('Completar', () => onComplete(habit.id))}
        {actionBtn('Omitir', () => onSkip(habit.id))}
        {actionBtn('Editar', () => onEdit(habit.id))}
        {actionBtn('Eliminar', () => onDelete(habit.id))}
      </div>
    </li>
  )
}

export default HabitItem


