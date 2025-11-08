import React from 'react'
import HabitItem from './habit-item'
import { Habit, HabitActionHandlers } from './habit-types'

export interface HabitsSectionProps extends HabitActionHandlers {
  title?: string
  habits: Habit[]
  completed?: Habit[]
  skipped?: Habit[]
  onToggleSidebar?: () => void
}

export const HabitsSection: React.FC<HabitsSectionProps> = ({ title = 'Hábitos', habits, completed = [], skipped = [], onToggleSidebar, ...actions }) => {
  return (
    <section className="flex-1">
      <header className="relative flex items-center justify-center border border-[#E2E7F0] rounded-md bg-white px-4 py-3">
        {/* Sidebar toggle visible on small and medium screens */}
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-[#EDF0F7] text-[#2D2E48] hover:bg-[#E2E7F0] focus:outline-none focus:ring-2 focus:ring-[#0C41FF] lg:hidden"
          onClick={onToggleSidebar}
          aria-label="Mostrar/Ocultar barra lateral"
        >
          ☰
        </button>
        <h2 className="text-xl font-semibold text-[#2D3648]">{title}</h2>
      </header>

      {/* Activos */}
      <div className="mt-3 bg-white rounded-md border border-[#E2E7F0]">
        <div className="px-3 py-2 text-sm font-medium text-[#2D3648] border-b border-[#E2E7F0]">Activos</div>
        <ul className="grid gap-1 p-2">
          {habits.map((h) => (
            <HabitItem key={h.id} habit={h} {...actions} />
          ))}
        </ul>
      </div>

      {/* Completados */}
      <div className="mt-4 bg-white rounded-md border border-[#E2E7F0]">
        <div className="px-3 py-2 text-sm font-medium text-[#2D3648] border-b border-[#E2E7F0]">Completados</div>
        <ul className="grid gap-1 p-2">
          {completed.map((h) => (
            <HabitItem key={h.id} habit={h} {...actions} />
          ))}
        </ul>
      </div>

      {/* Omitidos */}
      <div className="mt-4 bg-white rounded-md border border-[#E2E7F0]">
        <div className="px-3 py-2 text-sm font-medium text-[#2D3648] border-b border-[#E2E7F0]">Omitidos</div>
        <ul className="grid gap-1 p-2">
          {skipped.map((h) => (
            <HabitItem key={h.id} habit={h} {...actions} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HabitsSection


