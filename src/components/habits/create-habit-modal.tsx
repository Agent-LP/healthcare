import React, { useEffect, useMemo, useState } from 'react'
import DatePicker from './date-picker'
import { Category } from '../../helpers/categories'
import { Habit } from './habit-types'

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

export interface CreateHabitModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (habitData: HabitFormValues, habitId?: number) => void
  categories: Category[]
  onAddCategory: (payload: { nombre: string; color: string }) => string
  initialHabit?: Habit | null
}

export const CreateHabitModal: React.FC<CreateHabitModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
  onAddCategory,
  initialHabit
}) => {
  const [nombre, setNombre] = useState('')
  const [label, setLabel] = useState('')
  const [tipo, setTipo] = useState<string |'Normal' | 'Contador' | 'Pomodoro'>('Normal')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [recordatorio, setRecordatorio] = useState('07:30')
  const [duracionMinutos, setDuracionMinutos] = useState<number>(25)
  const [maxConteos, setMaxConteos] = useState<number>(1)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryColor, setNewCategoryColor] = useState('#607D8B')

  const selectedCategory = useMemo(() => categories.find((cat) => cat.idCategoria === selectedCategoryId), [categories, selectedCategoryId])

  const resetForm = () => {
    setNombre('')
    setLabel('')
    setTipo('Normal')
    setSelectedCategoryId('')
    setFechaInicio('')
    setFechaFin('')
    setRecordatorio('07:30')
    setDuracionMinutos(25)
    setMaxConteos(1)
    setNewCategoryName('')
    setNewCategoryColor('#607D8B')
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }
    if (initialHabit) {
      setNombre(initialHabit.nombre)
      setLabel(initialHabit.descripcion)
      setTipo(initialHabit.tipo)
      setFechaInicio(initialHabit.fechaInicio ?? '')
      setFechaFin(initialHabit.fechaFin ?? '')
      setRecordatorio(initialHabit.recordatorio ?? '07:30')
      setDuracionMinutos(initialHabit.duracionSegundos ? Math.max(1, Math.floor(initialHabit.duracionSegundos / 60)) : 25)
      setMaxConteos(initialHabit.maxConteos ?? 1)
      setSelectedCategoryId(
        categories.find((cat) => cat.nombre === initialHabit.categoria)?.idCategoria ?? categories[0]?.idCategoria ?? ''
      )
      return
    }
    resetForm()
  }, [initialHabit, isOpen, categories])

  if (!isOpen) return null

  const handleModalClose = () => {
    resetForm()
    onClose()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleModalClose()
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!nombre.trim() || !selectedCategory) return

    onSubmit(
      {
        nombre: nombre.trim(),
        label,
        tipo,
        categoria: selectedCategory.nombre,
        fechaInicio,
        fechaFin: fechaFin || undefined,
        recordatorio,
        duracionSegundos: tipo === 'Pomodoro' ? Math.max(60, Math.floor(duracionMinutos) * 60) : undefined,
        maxConteos: tipo === 'Contador' ? Math.max(1, maxConteos) : undefined
      },
      initialHabit?.id
    )

    handleModalClose()
  }

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return
    const newId = onAddCategory({
      nombre: newCategoryName.trim(),
      color: newCategoryColor
    })
    setSelectedCategoryId(newId)
    setNewCategoryName('')
  }

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={handleModalClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Modal para crear o editar hábito"
    >
      <div
        className="bg-[#EDF0F7] rounded-lg border border-[#E2E7F0] p-4 w-full max-w-md mx-4 shadow-lg max-h-[90vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-[#2D2E48] mb-3">{initialHabit ? 'Editar hábito' : 'Agregar hábito'}</h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label htmlFor="nombre" className="block text-xs font-medium text-[#2D2E48] mb-1">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-[#E2E7F0] bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
              required
            />
          </div>

          <div>
            <label htmlFor="Descripcion" className="block text-xs font-medium text-[#2D2E48] mb-1">
              Descripción
            </label>
            <input
              id="Descripcion"
              type="text"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-[#E2E7F0] bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
            />
          </div>

          <div>
            <label htmlFor="tipo" className="block text-xs font-medium text-[#2D2E48] mb-1">
              Tipo de hábito
            </label>
            <div className="flex gap-2">
              <select
                id="tipo"
                value={tipo}
                onChange={(event) => setTipo(event.target.value as 'Normal' | 'Contador' | 'Pomodoro')}
                className="flex-1 px-2 py-1.5 text-sm border border-[#E2E7F0] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0C41FF] appearance-none bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3E%3Cpath fill=\'none\' stroke=\'%23343a40\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M2 5l6 6 6-6\'/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.5rem_center]"
              >
                <option value="Normal">Normal</option>
                <option value="Contador">Contador</option>
                <option value="Pomodoro">Pomodoro</option>
              </select>
              {tipo === 'Normal' && (
                <input
                  type="text"
                  disabled
                  placeholder="Sin configuraciones"
                  className="flex-1 px-2 py-1.5 text-sm border border-[#E2E7F0] rounded-md bg-[#EDF0F7] text-[#717D96] cursor-not-allowed"
                />
              )}
              {tipo === 'Contador' && (
                <input
                  type="number"
                  min={1}
                  value={maxConteos}
                  onChange={(event) => setMaxConteos(Number(event.target.value))}
                  placeholder="Max conteos"
                  className="flex-1 px-2 py-1.5 text-sm border border-[#E2E7F0] bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
                />
              )}
              {tipo === 'Pomodoro' && (
                <input
                  type="number"
                  min={1}
                  value={duracionMinutos}
                  onChange={(event) => setDuracionMinutos(Number(event.target.value))}
                  placeholder="Minutos"
                  className="flex-1 px-2 py-1.5 text-sm border border-[#E2E7F0] bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#2D2E48] mb-1">
              Fecha inicio y fin
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <DatePicker value={fechaInicio} onChange={setFechaInicio} placeholder="Fecha inicio" />
              </div>
              <div className="flex-1">
                <DatePicker value={fechaFin} onChange={setFechaFin} placeholder="Fecha fin" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="recordatorio" className="block text-xs font-medium text-[#2D2E48] mb-1">
              Recordatorio
            </label>
            <div className="relative w-full">
              <input
                id="recordatorio"
                type="time"
                value={recordatorio}
                onChange={(event) => setRecordatorio(event.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-[#E2E7F0] bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF] cursor-pointer"
                onClick={(event) => event.currentTarget.showPicker?.()}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#2D2E48] mb-1">Categoría</label>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label htmlFor="new-category" className="sr-only">
                  Nombre de categoría
                </label>
                <input
                  id="new-category"
                  type="text"
                  value={newCategoryName}
                  onChange={(event) => setNewCategoryName(event.target.value)}
                  placeholder="Nueva categoría"
                  className="w-full px-2 py-1.5 text-sm border border-[#E2E7F0] bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
                />
              </div>
              <div>
                <label htmlFor="category-color" className="sr-only">
                  Seleccionar color
                </label>
                <input
                  id="category-color"
                  type="color"
                  value={newCategoryColor}
                  onChange={(event) => setNewCategoryColor(event.target.value)}
                  className="p-1 h-10 w-14 block  cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none  dark:border-neutral-700"
                  title="Elige un color para la categoría"
                />
              </div>
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-3 py-1.5 text-sm bg-[#0C41FF] text-white rounded-md hover:bg-[#0A35D9] focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
              >
                Agregar
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3 max-h-24 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat.idCategoria}
                  type="button"
                  onClick={() => setSelectedCategoryId(cat.idCategoria)}
                  className="px-3 py-1 rounded-md text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C41FF]"
                  style={{
                    backgroundColor: cat.color,
                    opacity: selectedCategoryId === cat.idCategoria ? 1 : 0.7
                  }}
                  aria-pressed={selectedCategoryId === cat.idCategoria}
                  aria-label={`Seleccionar categoría ${cat.nombre}`}
                >
                  {cat.nombre}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleModalClose}
              className="flex-1 px-3 py-1.5 text-sm border border-[#E2E7F0] rounded-md text-[#2D2E48] hover:bg-[#EDF0F7] focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-3 py-1.5 text-sm bg-[#0C41FF] text-white rounded-md hover:bg-[#0A35D9] focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
            >
              {initialHabit ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateHabitModal

