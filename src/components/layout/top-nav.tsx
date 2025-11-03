import React from 'react'

export interface TopNavProps {
  active: 'Habitos' | 'Calendario' | 'Graficas'
  onChange: (view: 'Habitos' | 'Calendario' | 'Graficas') => void
}

export const TopNav: React.FC<TopNavProps> = ({ active, onChange }) => {
  const baseBtn =
    'inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0C41FF] transition-colors'

  const getBtn = (label: 'Habitos' | 'Calendario' | 'Graficas') =>
    `${baseBtn} ${active === label ? 'bg-[#2D2E48] text-white' : 'text-[#2D3648] hover:bg-[#E2E7F0]'}`

  return (
    <div className="w-full border-b border-[#E2E7F0] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <button
          className={getBtn('Habitos')}
          onClick={() => onChange('Habitos')}
          tabIndex={0}
          aria-label="Ver hábitos"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onChange('Habitos')
          }}
        >
          <span className="size-2 rounded-full bg-[#2D2E48]" />
          Hábitos
        </button>
        <button
          className={getBtn('Calendario')}
          onClick={() => onChange('Calendario')}
          tabIndex={0}
          aria-label="Ver calendario"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onChange('Calendario')
          }}
        >
          <span className="size-2 rounded-full bg-[#717D96]" />
          Calendario
        </button>
        <button
          className={getBtn('Graficas')}
          onClick={() => onChange('Graficas')}
          tabIndex={0}
          aria-label="Ver gráficas"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onChange('Graficas')
          }}
        >
          <span className="size-2 rounded-full bg-[#0C41FF]" />
          Gráficas
        </button>
      </div>
    </div>
  )
}

export default TopNav


