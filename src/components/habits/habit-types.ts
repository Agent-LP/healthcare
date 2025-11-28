export interface Habit {
  id: number
  nombre: string
  descripcion: string
  frecuencia: string
  tipo: string | 'Normal' | 'Contador' | 'Pomodoro' 
  categoria: string
  categoriaColor: string
  fechaInicio?: string
  fechaFin?: string
  recordatorio?: string
  // Duration in seconds only for Cronometrada habits; others can be undefined
  duracionSegundos?: number
  maxConteos?: number
  // Backend fields
  estado?: string // 1 = activo, 2 = completado, 3 = omitido
  repeticionesLogradas?: number // For counter habits
  tiempoLogrado?: number // For timed habits (in seconds)
  
}

export interface HabitFormValues {
  nombre: string
  label: string
  tipo: string |'Normal' | 'Contador' | 'Pomodoro'
  categoria: string
  fechaInicio: string
  fechaFin?: string
  recordatorio: string
  duracionSegundos?: number
  maxConteos?: number
}

export interface HabitActionHandlers {
  onComplete: (habitId: number) => void
  onSkip: (habitId: number) => void
  onEdit: (habitId: number) => void
  onDelete: (habitId: number) => void
}


