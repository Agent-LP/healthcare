import React, { useEffect, useRef, useState } from 'react'
import { Habit, HabitActionHandlers } from './habit-types'
import { icons } from '../../helpers/icons'

export interface HabitItemProps extends HabitActionHandlers {
  habit: Habit
}

export const HabitItem: React.FC<HabitItemProps> = ({ habit, onComplete, onSkip, onEdit, onDelete }) => {
  const [count, setCount] = useState<string>('0')
  const initialTimer = Math.max(0, habit.duracionSegundos ?? 0)
  const [remaining, setRemaining] = useState(initialTimer)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    setCount('0')
  }, [habit.id])

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

  const handleCountChange = (value: string) => {
    const sanitized = value.replace(/[^\d]/g, '')
    setCount(sanitized || '0')
  }

  const handleIncreaseCount = () => {
    if (habit.maxConteos && Number(count) >= habit.maxConteos) {
      setCount(String(habit.maxConteos))
      return
    }
    setCount((prev) => String(Number(prev) + 1))
  }

  const handleDecreaseCount = () => {
    const nextValue = Math.max(0, Number(count) - 1)
    setCount(String(nextValue))
  }

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
          <div className="text-xs text-[#717D96]">{habit.descripcion || habit.categoria}</div>
        </div>
      </div>

      {habit.tipo === 'Contadora' && (
        <div className="flex flex-1 items-center justify-center gap-3" aria-label="Contador manual">
          <input
            type="text"
            inputMode="numeric"
            value={count}
            onChange={(event) => handleCountChange(event.target.value)}
            className="w-16 rounded-md border border-[#E2E7F0] bg-white px-2 py-1 text-center text-sm text-[#2D3648] focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
            aria-label="Cantidad realizada"
          />
          <span className="text-sm text-[#717D96] border-l border-[#E2E7F0] pl-2">
            / {habit.maxConteos ?? '∞'}
          </span>
          <div className="flex flex-col gap-1">
            <button
              className="rounded-md bg-[#E2E7F0] px-2 py-1 text-sm text-[#2D2E48]"
              onClick={handleIncreaseCount}
              aria-label="Incrementar contador"
            >
              ▲
            </button>
            <button
              className="rounded-md bg-[#E2E7F0] px-2 py-1 text-sm text-[#2D2E48]"
              onClick={handleDecreaseCount}
              aria-label="Disminuir contador"
            >
              ▼
            </button>
          </div>
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


