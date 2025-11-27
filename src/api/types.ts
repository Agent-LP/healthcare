export interface CategoryResponse {
  idCategoria: number
  nombre: string
  color: string
}

export interface HabitResponse {
  idHabito: number
  nombre: string
  descripcion: string
  tipo: string
  fechaInicio: string
  fechaFin?: string
  recordatorio?: string
  categorias: CategoryResponse[]
  habitoContador?: RepeticionesResponse
  habitoTemporizado?: DuracionResponse
  idEstado?: number
}

export interface CreateHabitRequest {
  nombre: string
  descripcion: string
  idTipo: number
  idEstado: number
  fechaInicio: string
  fechaFin?: string
  recordatorio?: string
  categorias: Array<{
    nombre: string
    color: string
  }>
  repeticiones?: {
    repeticionesObjetivo: number
    repeticionesLogradas: number
  } | null
  duracion?: {
    duracionObjetivo: number
    tiempoLogrado: number
  } | null
}

export interface DuracionResponse{
    idHabito: number;
    duracionObjetivo: number; // en milisegundos
    tiempoLogrado: number;
}

export interface RepeticionesResponse {
    idHabito: number;
    repeticionesObjetivo: number;
    repeticionesLogradas: number;
}

export interface UpdateCounterHabitRequest {
  repeticionesObjetivo: number
  repeticionesLogradas: number
}

export interface UpdateTimedHabitRequest {
  duracionObjetivo: number
  tiempoLogrado: number
}

export interface UpdateHabitStateRequest {
  idEstado: number
}






