export interface Habit {
  id: number
  nombre: string
  descripcion: string
  frecuencia: string
  tipo: 'Normal' | 'Contadora' | 'Cronometrada'
  categoria: string
  subcategoria: string
  categoriaColor: string
  fechaInicio?: string
  recordatorio?: string
}

export interface HabitActionHandlers {
  onComplete: (habitId: number) => void
  onSkip: (habitId: number) => void
  onEdit: (habitId: number) => void
  onDelete: (habitId: number) => void
}


