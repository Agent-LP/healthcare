import React, { useState } from 'react'

export interface SidebarProps {
  activeSlot: 'Dia' | 'Tarde' | 'Noche'
  onSlotChange: (slot: 'Dia' | 'Tarde' | 'Noche') => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSlot, onSlotChange }) => {
  const [openUser, setOpenUser] = useState(false)

  const handleToggleUser = () => setOpenUser((v) => !v)
  const handleLogout = () => alert('Logout (placeholder)')
  const handleProfile = () => alert('Ir a perfil (placeholder)')

  const slotBtn = (slot: 'Dia' | 'Tarde' | 'Noche') => (
    <button
      key={slot}
      className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0C41FF] ${
        activeSlot === slot ? 'bg-[#2D2E48] text-white' : 'text-[#2D3648] hover:bg-[#E2E7F0]'
      }`}
      onClick={() => onSlotChange(slot)}
      tabIndex={0}
      aria-label={`Filtrar por ${slot}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSlotChange(slot)
      }}
    >
      <div className="flex items-center gap-2">
        <span className="size-3 rounded-full bg-[#E2E7F0]" />
        {slot}
      </div>
    </button>
  )

  return (
    <aside className="h-full bg-[#EDF0F7] border-r border-[#E2E7F0] w-64 flex flex-col">
      <div className="p-4 border-b border-[#E2E7F0]">
        <button
          className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-white text-[#2D3648] hover:bg-[#E2E7F0] focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
          onClick={handleToggleUser}
          aria-expanded={openUser}
          aria-label="Usuario"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleToggleUser()
          }}
        >
          <span className="flex items-center gap-2">
            <span className="size-6 rounded-full bg-[#2D2E48]" />
            User
          </span>
          <span aria-hidden>▾</span>
        </button>
        {openUser && (
          <div className="mt-2 grid gap-1">
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-[#E2E7F0]"
              onClick={handleProfile}
              aria-label="Ir al perfil"
            >
              Perfil
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md text-[#EA5455] hover:bg-[#E2E7F0]"
              onClick={handleLogout}
              aria-label="Cerrar sesión"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-xs uppercase text-[#717D96] mb-2">Filtros por horario</div>
        <div className="grid gap-2">
          {slotBtn('Dia')}
          {slotBtn('Tarde')}
          {slotBtn('Noche')}
        </div>
      </div>

    </aside>
  )
}

export default Sidebar


