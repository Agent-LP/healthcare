import type { HabitResponse } from './types'
import type { Habit } from '../components/habits/habit-types'
import type { Category } from '../helpers/categories'

export const mapHabitResponseToHabit = (response: HabitResponse): Habit => {
  
  const primaryCategory = response.categorias?.[0] || { nombre: 'Sin categoría', color: '#607D8B' }

  return {
    id: response.idHabito,
    nombre: response.nombre,
    descripcion: response.descripcion,
    frecuencia: 'Diaria',
    tipo: response.tipo ,
    categoria: primaryCategory.nombre,
    categoriaColor: primaryCategory.color,
    fechaInicio: response.fechaInicio,
    fechaFin: response.fechaFin,
    recordatorio: response.recordatorio,
    maxConteos: response.habitoContador?.repeticionesObjetivo,
    duracionSegundos: response.habitoTemporizado?.duracionObjetivo,
    idEstado: response.idEstado || 1,
    repeticionesLogradas: response.habitoContador?.repeticionesLogradas,
    tiempoLogrado: response.habitoTemporizado?.tiempoLogrado
  }
}

export const mapCategoryResponseToCategory = (response: { idCategoria: number; nombre: string; color: string }): Category => {
  return {
    idCategoria: String(response.idCategoria),
    nombre: response.nombre,
    color: response.color
  }
}






