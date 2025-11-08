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
  // Duration in seconds only for Cronometrada habits; others can be undefined
  duracionSegundos?: number
}

export interface HabitActionHandlers {
  onComplete: (habitId: number) => void
  onSkip: (habitId: number) => void
  onEdit: (habitId: number) => void
  onDelete: (habitId: number) => void
}


