import React from 'react'
import HabitItem from './habit-item'
import { Habit, HabitActionHandlers } from './habit-types'

export interface HabitsSectionProps extends HabitActionHandlers {
  title?: string
  habits: Habit[]
}

export const HabitsSection: React.FC<HabitsSectionProps> = ({ title = 'Hábitos', habits, ...actions }) => {
  return (
    <section className="flex-1">
      <header className="flex items-center justify-between border border-[#E2E7F0] rounded-md bg-white px-4 py-3">
        <h2 className="text-xl font-semibold text-[#2D3648]">{title}</h2>
        <div className="text-xs text-[#717D96]">Placeholder imagen hábitos</div>
      </header>
      <ul className="mt-3 grid gap-1 bg-white rounded-md border border-[#E2E7F0] p-2">
        {habits.map((h) => (
          <HabitItem key={h.id} habit={h} {...actions} />)
        )}
      </ul>
    </section>
  )
}

export default HabitsSection


