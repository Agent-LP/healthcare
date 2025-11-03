import React, { useState } from 'react'
import { CATEGORIES, Category } from './categories'

export interface CreateHabitModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (habitData: {
    nombre: string
    label: string
    tipo: 'Normal' | 'Contadora' | 'Cronometrada'
    categoria: string
    subcategoria: string
    fechaInicio: string
    recordatorio: string
  }) => void
}

export const CreateHabitModal: React.FC<CreateHabitModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [nombre, setNombre] = useState('')
  const [label, setLabel] = useState('')
  const [tipo, setTipo] = useState<'Normal' | 'Contadora' | 'Cronometrada'>('Normal')
  const [categoriaId, setCategoriaId] = useState<string>('')
  const [subcategoria, setSubcategoria] = useState<string>('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [recordatorio, setRecordatorio] = useState('07:30')

  if (!isOpen) return null

  const selectedCategory: Category | undefined = CATEGORIES.find(cat => cat.id === categoriaId)

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoriaId(e.target.value)
    setSubcategoria('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre || !categoriaId || !subcategoria) return

    onCreate({
      nombre,
      label,
      tipo,
      categoria: selectedCategory?.nombre || '',
      subcategoria,
      fechaInicio,
      recordatorio
    })

    handleClose()
  }

  const handleClose = () => {
    setNombre('')
    setLabel('')
    setTipo('Normal')
    setCategoriaId('')
    setSubcategoria('')
    setFechaInicio('')
    setRecordatorio('07:30')
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Modal para crear hábito"
    >
      <div
        className=" bg-[#EDF0F7] rounded-lg border border-[#black] p-6 w-full max-w-md mx-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-[#2D2E48] mb-6">Crea un habito</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-[#2D2E48] mb-2">
              Name
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 border border-[#E2E7F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
              required
            />
          </div>

          <div>
            <label htmlFor="label" className="block text-sm font-medium text-[#2D2E48] mb-2">
              Label
            </label>
            <input
              id="label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 border border-[#E2E7F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
            />
          </div>

          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-[#2D2E48] mb-2">
              Tipo de hábito
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as 'Normal' | 'Contadora' | 'Cronometrada')}
              className="w-full px-3 py-2 border border-[#E2E7F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF] appearance-none bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3E%3Cpath fill=\'none\' stroke=\'%23343a40\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M2 5l6 6 6-6\'/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.5rem_center] pr-10"
            >
              <option value="Normal">Normal</option>
              <option value="Contadora">Contadora</option>
              <option value="Cronometrada">Cronometrada</option>
            </select>
          </div>

          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-[#2D2E48] mb-2">
              Categoria
            </label>
            <select
              id="categoria"
              value={categoriaId}
              onChange={handleCategoriaChange}
              className="w-full px-3 py-2 border border-[#E2E7F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF] appearance-none bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3E%3Cpath fill=\'none\' stroke=\'%23FFFFFF\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M2 5l6 6 6-6\'/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.5rem_center] pr-10"
              required
              style={
                selectedCategory
                  ? {
                      backgroundColor: selectedCategory.color,
                      color: '#FFFFFF'
                    }
                  : {}
              }
            >
              <option value="" style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>Select</option>
              {CATEGORIES.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  style={{
                    backgroundColor: cat.color,
                    color: '#FFFFFF'
                  }}
                >
                  {cat.nombre}
                </option>
              ))}
            </select>

            {selectedCategory && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedCategory.subcategorias.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSubcategoria(sub)}
                    className={`px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0C41FF] ${
                      subcategoria === sub
                        ? 'bg-[#2D2E48] text-white'
                        : 'bg-[#EDF0F7] text-[#717D96] hover:bg-[#E2E7F0]'
                    }`}
                  >
                    {sub.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="fechaInicio" className="block text-sm font-medium text-[#2D2E48] mb-2">
              Fecha inicio
            </label>
            <div className="flex gap-2">
              <input
                id="fechaInicio"
                type="text"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                placeholder="xx/xx/xxxx"
                className="w-full px-3 py-2 border border-[#E2E7F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
              />
              <input
                type="text"
                placeholder="xx/xx/xxxx"
                className="w-full px-3 py-2 border border-[#E2E7F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
                disabled
              />
            </div>
          </div>

          <div>
            <label htmlFor="recordatorio" className="block text-sm font-medium text-[#2D2E48] mb-2">
              Recordatorio
            </label>
            <div className="relative">
              <input
                id="recordatorio"
                type="time"
                value={recordatorio}
                onChange={(e) => setRecordatorio(e.target.value)}
                className="w-full px-3 py-2 border border-[#E2E7F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF] pr-10"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#717D96]">
                🕐
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-[#E2E7F0] rounded-md text-[#2D2E48] hover:bg-[#EDF0F7] focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#0C41FF] text-white rounded-md hover:bg-[#0A35D9] focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateHabitModal

