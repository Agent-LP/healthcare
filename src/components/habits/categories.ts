export interface Category {
  id: string
  nombre: string
  color: string
  subcategorias: string[]
}

export const CATEGORIES: Category[] = [
  {
    id: 'salud-fisica',
    nombre: 'Salud Física',
    color: '#4CAF50',
    subcategorias: ['sueño', 'alimentación', 'hidratación', 'ejercicio', 'descanso']
  },
  {
    id: 'salud-mental',
    nombre: 'Salud Mental y Emocional',
    color: '#2196F3',
    subcategorias: ['meditación', 'diario_emocional', 'agradecimiento', 'lectura_reflexiva', 'desconexión_digital']
  },
  {
    id: 'productividad',
    nombre: 'Productividad y Organización',
    color: '#FFC107',
    subcategorias: ['planificación', 'tareas_prioritarias', 'aprendizaje', 'tiempo_foco', 'orden_espacio']
  },
  {
    id: 'social',
    nombre: 'Relaciones y Vida Social',
    color: '#FF7043',
    subcategorias: ['comunicación', 'familia', 'amistad', 'colaboración', 'tiempo_en_pareja']
  },
  {
    id: 'crecimiento-personal',
    nombre: 'Crecimiento Personal',
    color: '#9C27B0',
    subcategorias: ['aprendizaje_personal', 'auto_reflexión', 'objetivos_personales', 'gratitud', 'autocuidado']
  },
  {
    id: 'bienestar-general',
    nombre: 'Bienestar General / Otros',
    color: '#607D8B',
    subcategorias: ['finanzas', 'limpieza_hogar', 'rutina_mañana', 'rutina_noche', 'viajes']
  }
]

