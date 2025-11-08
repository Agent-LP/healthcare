import React, { useState } from 'react'
import { CATEGORIES, Category } from '../../helpers/categories'
import DatePicker from './date-picker'

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
    duracionSegundos?: number
    maxConteos?: number
  }) => void
}

export const CreateHabitModal: React.FC<CreateHabitModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [nombre, setNombre] = useState('')
  const [label, setLabel] = useState('')
  const [tipo, setTipo] = useState<'Normal' | 'Contadora' | 'Cronometrada'>('Normal')
  const [categoriaId, setCategoriaId] = useState<string>('')
  const [subcategoria, setSubcategoria] = useState<string>('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [recordatorio, setRecordatorio] = useState('07:30')
  const [duracionMinutos, setDuracionMinutos] = useState<number>(25)
  const [maxConteos, setMaxConteos] = useState<number>(1)

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
      recordatorio,
      duracionSegundos: tipo === 'Cronometrada' ? Math.max(60, Math.floor(duracionMinutos) * 60) : undefined,
      maxConteos: tipo === 'Contadora' ? maxConteos : undefined
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
    setFechaFin('')
    setRecordatorio('07:30')
    setDuracionMinutos(25)
    setMaxConteos(1)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Modal para crear hábito"
    >
      <div
        className="bg-[#EDF0F7] rounded-lg border border-[#E2E7F0] p-4 w-full max-w-md mx-4 shadow-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-[#2D2E48] mb-3">Agregar hábito</h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label htmlFor="nombre" className="block text-xs font-medium text-[#2D2E48] mb-1">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
              onChange={(e) => setLabel(e.target.value)}
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
                onChange={(e) => setTipo(e.target.value as 'Normal' | 'Contadora' | 'Cronometrada')}
                className="flex-1 px-2 py-1.5 text-sm border border-[#E2E7F0] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0C41FF] appearance-none bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3E%3Cpath fill=\'none\' stroke=\'%23343a40\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M2 5l6 6 6-6\'/%3E%3C/svg%3E')] bg-no-repeat bg-position-[right_0.5rem_center]"
              >
                <option value="Normal">Normal</option>
                <option value="Contadora">Contadora</option>
                <option value="Cronometrada">Cronometrada</option>
              </select>
              {tipo === 'Normal' && (
                <input
                  type="text"
                  disabled
                  placeholder=""
                  className="flex-1 px-2 py-1.5 text-sm border border-[#E2E7F0] rounded-md bg-[#EDF0F7] text-[#717D96] cursor-not-allowed"
                />
              )}
              {tipo === 'Contadora' && (
                <input
                  type="number"
                  min={1}
                  value={maxConteos}
                  onChange={(e) => setMaxConteos(Number(e.target.value))}
                  placeholder="Max conteos"
                  className="flex-1 px-2 py-1.5 text-sm border border-[#E2E7F0] bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
                />
              )}
              {tipo === 'Cronometrada' && (
                <input
                  type="number"
                  min={1}
                  value={duracionMinutos}
                  onChange={(e) => setDuracionMinutos(Number(e.target.value))}
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
                <DatePicker
                  value={fechaInicio}
                  onChange={setFechaInicio}
                  placeholder="Fecha inicio"
                />
              </div>
              <div className="flex-1">
                <DatePicker
                  value={fechaFin}
                  onChange={setFechaFin}
                  placeholder="Fecha fin"
                />
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
                onChange={(e) => setRecordatorio(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-[#E2E7F0] bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C41FF] cursor-pointer"
                onClick={(e) => {
                  // Make the entire field clickable to open time picker
                  e.currentTarget.showPicker?.()
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="categoria" className="block text-xs font-medium text-[#2D2E48] mb-1">
              Categoria
            </label>
            <div className="relative rounded-md border border-[#E2E7F0] bg-white overflow-hidden">
              {selectedCategory && (
                <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ backgroundColor: selectedCategory.color }} />
              )}
              <select
                id="categoria"
                value={categoriaId}
                onChange={handleCategoriaChange}
                className="w-full px-2 py-1.5 text-sm border-0 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0C41FF] appearance-none bg-white  viewBox=\'0 0 16 16\'%3E%3Cpath fill=\'none\' stroke=\'%23343a40\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M2 5l6 6 6-6\'/%3E%3C/svg%3E')] bg-no-repeat bg-position-[right_0.5rem_center]"
                required
                style={
                  selectedCategory
                    ? {
                        paddingTop: 'calc(0.5rem + 4px)'
                      }
                    : {}
                }
              >
                <option value="" style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>Selecciona una categoría</option>
                {CATEGORIES.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: '#000000'
                    }}
                  >
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedCategory.subcategorias.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSubcategoria(sub)}
                    className={`px-3 py-1 rounded-md text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0C41FF] ${
                      subcategoria === sub
                        ? 'bg-[#2D2E48] text-white'
                        : 'bg-white text-[#717D96] hover:bg-[#E2E7F0]'
                    }`}
                  >
                    {sub.replace(/_/g, ' ')}
                  </button>
                ))} 
              </div>
            )}
          </div>

          

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-3 py-1.5 text-sm border border-[#E2E7F0] rounded-md text-[#2D2E48] hover:bg-[#EDF0F7] focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-3 py-1.5 text-sm bg-[#0C41FF] text-white rounded-md hover:bg-[#0A35D9] focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
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

