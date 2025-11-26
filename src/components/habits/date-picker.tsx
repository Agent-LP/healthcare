import React, { useEffect, useRef, useState } from 'react'

export interface CompactDatePickerProps {
  value?: string
  onChange?: (date: string) => void
  placeholder?: string
}

export const DatePicker: React.FC<CompactDatePickerProps> = ({
  value = '',
  onChange,
  placeholder = 'Seleccionar fecha'
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<string>(value || '')
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const daysContainerRef = useRef<HTMLDivElement | null>(null)
  const datepickerContainerRef = useRef<HTMLDivElement | null>(null)
  const inputContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value)
    }
  }, [value])

  useEffect(() => {
    if (isCalendarOpen && daysContainerRef.current) {
      renderCalendar()
    }
  }, [currentDate, isCalendarOpen, selectedDate])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isCalendarOpen &&
        datepickerContainerRef.current &&
        inputContainerRef.current &&
        !datepickerContainerRef.current.contains(event.target as Node) &&
        !inputContainerRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false)
      }
    }

    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCalendarOpen])

  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const daysContainer = daysContainerRef.current
    if (!daysContainer) return

    daysContainer.innerHTML = ''

    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyDiv = document.createElement('div')
      daysContainer.appendChild(emptyDiv)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDiv = document.createElement('div')
      dayDiv.className =
        'flex items-center justify-center cursor-pointer w-[24px] h-[24px] text-[#2D2E48] text-[10px] rounded-full hover:bg-[#0C41FF] hover:text-white'
      dayDiv.textContent = i.toString()

      dayDiv.addEventListener('click', () => {
        const selectedDateValue = `${year}-${month + 1}-${i}`
        setSelectedDate(selectedDateValue)
        onChange?.(selectedDateValue)

        daysContainer
          .querySelectorAll('div')
          .forEach((d) => d.classList.remove('bg-[#0C41FF]', 'text-white'))

        dayDiv.classList.add('bg-[#0C41FF]', 'text-white')
      })

      if (selectedDate) {
        const [selMonth, selDay, selYear] = selectedDate.split('/').map(Number)
        if (selYear === year && selMonth === month + 1 && selDay === i) {
          dayDiv.classList.add('bg-[#0C41FF]', 'text-white')
        }
      }

      daysContainer.appendChild(dayDiv)
    }
  }

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    })
  }

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    })
  }

  const handleApply = () => {
    if (selectedDate) {
      onChange?.(selectedDate)
      setIsCalendarOpen(false)
    }
  }

  const handleCancel = () => {
    setSelectedDate(value || '')
    setIsCalendarOpen(false)
  }

  const handleToggleCalendar = () => {
    setIsCalendarOpen((v) => !v)
  }

  return (
    <div className="relative w-full" ref={inputContainerRef}>
      <div className="relative flex items-center">
        <span className="absolute left-2 text-[#717D96] z-10">
          <svg
            className="fill-current"
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 3.3125H15.8125V2.625C15.8125 2.25 15.5 1.90625 15.0937 1.90625C14.6875 1.90625 14.375 2.21875 14.375 2.625V3.28125H5.59375V2.625C5.59375 2.25 5.28125 1.90625 4.875 1.90625C4.46875 1.90625 4.15625 2.21875 4.15625 2.625V3.28125H2.5C1.4375 3.28125 0.53125 4.15625 0.53125 5.25V16.125C0.53125 17.1875 1.40625 18.0937 2.5 18.0937H17.5C18.5625 18.0937 19.4687 17.2187 19.4687 16.125V5.25C19.4687 4.1875 18.5625 3.3125 17.5 3.3125Z"
              fill="currentColor"
            />
          </svg>
        </span>

        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-md border border-[#E2E7F0] bg-white py-1.5 pl-8 pr-8 text-xs text-[#2D2E48] outline-none transition focus:border-[#0C41FF] focus:ring-2 focus:ring-[#0C41FF]"
          value={selectedDate || ''}
          readOnly
          onClick={handleToggleCalendar}
        />

        <span
          className="absolute right-2 cursor-pointer text-[#717D96] z-10"
          onClick={handleToggleCalendar}
        >
          <svg
            className="fill-current stroke-current"
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.29635 5.15354L2.29632 5.15357L2.30055 5.1577L7.65055 10.3827L8.00157 10.7255L8.35095 10.381L13.701 5.10603L13.701 5.10604L13.7035 5.10354C13.722 5.08499 13.7385 5.08124 13.7499 5.08124C13.7613 5.08124 13.7778 5.08499 13.7963 5.10354C13.8149 5.12209 13.8187 5.13859 13.8187 5.14999C13.8187 5.1612 13.815 5.17734 13.7973 5.19552L8.04946 10.8433L8.04945 10.8433L8.04635 10.8464C8.01594 10.8768 7.99586 10.8921 7.98509 10.8992C7.97746 10.8983 7.97257 10.8968 7.96852 10.8952C7.96226 10.8929 7.94944 10.887 7.92872 10.8721L2.20253 5.2455C2.18478 5.22733 2.18115 5.2112 2.18115 5.19999C2.18115 5.18859 2.18491 5.17209 2.20346 5.15354C2.222 5.13499 2.2385 5.13124 2.2499 5.13124C2.2613 5.13124 2.2778 5.13499 2.29635 5.15354Z"
              fill="currentColor"
              stroke="currentColor"
            />
          </svg>
        </span>
      </div>

      {isCalendarOpen && (
        <div
          ref={datepickerContainerRef}
          className="absolute z-50 mt-1 rounded-lg border border-[#E2E7F0] bg-white pt-1.5 shadow-lg"
          style={{ minWidth: '220px', maxWidth: '220px' }}
        >
          <div className="flex items-center justify-between px-2">
            <button
              className="rounded-md p-0.5 text-[#2D2E48] hover:bg-[#EDF0F7]"
              onClick={handlePrevMonth}
            >
              <svg
                className="fill-current"
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5312 17.9062C13.3437 17.9062 13.1562 17.8438 13.0312 17.6875L5.96875 10.5C5.6875 10.2187 5.6875 9.78125 5.96875 9.5L13.0312 2.3125C13.3125 2.03125 13.75 2.03125 14.0312 2.3125C14.3125 2.59375 14.3125 3.03125 14.0312 3.3125L7.46875 10L14.0625 16.6875C14.3438 16.9688 14.3438 17.4062 14.0625 17.6875C13.875 17.8125 13.7187 17.9062 13.5312 17.9062Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            <div className="text-xs font-medium text-[#2D2E48]">
              {currentDate.toLocaleDateString('es-ES', {
                month: 'short',
                year: 'numeric'
              })}
            </div>

            <button
              className="rounded-md p-0.5 text-[#2D2E48] hover:bg-[#EDF0F7]"
              onClick={handleNextMonth}
            >
              <svg
                className="fill-current"
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.46875 17.9063C6.28125 17.9063 6.125 17.8438 5.96875 17.7188C5.6875 17.4375 5.6875 17 5.96875 16.7188L12.5312 10L5.96875 3.3125C5.6875 3.03125 5.6875 2.59375 5.96875 2.3125C6.25 2.03125 6.6875 2.03125 6.96875 2.3125L14.0313 9.5C14.3125 9.78125 14.3125 10.2187 14.0313 10.5L6.96875 17.6875C6.84375 17.8125 6.65625 17.9063 6.46875 17.9063Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <div
            id="days-of-week"
            className="mb-0.5 mt-1.5 grid grid-cols-7 gap-0.5 px-2"
          >
            <div className="text-center text-[10px] font-medium text-[#717D96]">D</div>
            <div className="text-center text-[10px] font-medium text-[#717D96]">L</div>
            <div className="text-center text-[10px] font-medium text-[#717D96]">Ma</div>
            <div className="text-center text-[10px] font-medium text-[#717D96]">Mi</div>
            <div className="text-center text-[10px] font-medium text-[#717D96]">J</div>
            <div className="text-center text-[10px] font-medium text-[#717D96]">V</div>
            <div className="text-center text-[10px] font-medium text-[#717D96]">S</div>
          </div>

          <div
            ref={daysContainerRef}
            id="days-container"
            className="mt-0.5 grid grid-cols-7 gap-0.5 px-2 pb-1.5"
          >
            {/* Days rendered by renderCalendar */}
          </div>

          <div className="mt-0.5 flex justify-end gap-1.5 border-t border-[#E2E7F0] p-1">
            <button
              className="rounded-md border border-[#E2E7F0] px-1.5 py-0.5 text-[10px] font-medium text-[#2D2E48] hover:bg-[#EDF0F7]"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              className="rounded-md bg-[#0C41FF] px-1.5 py-0.5 text-[10px] font-medium text-white hover:bg-[#0A35D9]"
              onClick={handleApply}
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker

