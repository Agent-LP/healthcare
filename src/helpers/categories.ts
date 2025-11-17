export interface Category {
  id: string
  nombre: string
  color: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'salud-fisica',
    nombre: 'Salud Física',
    color: '#4CAF50'
  },
  {
    id: 'salud-mental',
    nombre: 'Salud Mental y Emocional',
    color: '#2196F3'
  },
  {
    id: 'productividad',
    nombre: 'Productividad y Organización',
    color: '#FFC107'
  },
  {
    id: 'social',
    nombre: 'Relaciones y Vida Social',
    color: '#FF7043'
  },
  {
    id: 'crecimiento-personal',
    nombre: 'Crecimiento Personal',
    color: '#9C27B0'
  },
  {
    id: 'bienestar-general',
    nombre: 'Bienestar General / Otros',
    color: '#607D8B'
  }
]

