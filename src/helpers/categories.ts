export interface Category {
  idCategoria: string
  nombre: string
  color: string
}

export const CATEGORIES: Category[] = [
  {
    idCategoria: 'salud-fisica',
    nombre: 'Salud Física',
    color: '#4CAF50'
  },
  {
    idCategoria: 'salud-mental',
    nombre: 'Salud Mental y Emocional',
    color: '#2196F3'
  },
  {
    idCategoria: 'productividCategoriaad',
    nombre: 'ProductividCategoriaad y Organización',
    color: '#FFC107'
  },
  {
    idCategoria: 'social',
    nombre: 'Relaciones y VidCategoriaa Social',
    color: '#FF7043'
  },
  {
    idCategoria: 'crecimiento-personal',
    nombre: 'Crecimiento Personal',
    color: '#9C27B0'
  },
  {
    idCategoria: 'bienestar-general',
    nombre: 'Bienestar General / Otros',
    color: '#607D8B'
  }
]

