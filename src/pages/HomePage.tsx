import React from "react";
import { useState } from "react";
import tareas from "../helpers/harcodedData/Tareas.json";
import TopNav from "../components/layout/top-nav";
import Sidebar from "../components/layout/sidebar";
import HabitsSection from "../components/habits/habits-section";
import { Habit } from "../components/habits/habit-types";
import CreateHabitModal from "../components/habits/create-habit-modal";
import { CATEGORIES } from "../helpers/categories";

const HomePage = () => {
    const [viewType, setViewType] = useState<'Habitos' | 'Calendario' | 'Graficas'>('Habitos')
    const [slot, setSlot] = useState<'Dia' | 'Tarde' | 'Noche'>('Dia')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [habits, setHabits] = useState<Habit[]>(() => {
        return tareas.tareas.map((t, i) => {
            const defaultCategory = CATEGORIES[i % CATEGORIES.length]
            const defaultSubcategory = defaultCategory.subcategorias[0]
            return {
                id: t.id,
                nombre: t.nombre,
                descripcion: t.descripcion || '',
                frecuencia: t.frecuencia,
                tipo: t.tipo as Habit['tipo'],
                categoria: defaultCategory.nombre,
                subcategoria: defaultSubcategory,
                categoriaColor: defaultCategory.color,
                fechaInicio: '',
                recordatorio: ''
            }
        })
    })
    const [completed, setCompleted] = useState<Habit[]>([])
    const [skipped, setSkipped] = useState<Habit[]>([])

    const handleComplete = (id: number) => {
        setHabits(prev => {
            const target = prev.find(h => h.id === id)
            if (!target) return prev
            setCompleted(c => [target, ...c])
            return prev.filter(h => h.id !== id)
        })
    }
    const handleSkip = (id: number) => {
        setHabits(prev => {
            const target = prev.find(h => h.id === id)
            if (!target) return prev
            setSkipped(s => [target, ...s])
            return prev.filter(h => h.id !== id)
        })
    }
    const handleEdit = (id: number) => console.log('edit', id)
    const handleDelete = (id: number) => {
        setHabits(prev => prev.filter(h => h.id !== id))
    }

    const handleCreate = (habitData: {
        nombre: string
        label: string
        tipo: 'Normal' | 'Contadora' | 'Cronometrada'
        categoria: string
        subcategoria: string
        fechaInicio: string
        recordatorio: string
        duracionSegundos?: number
        maxConteos?: number
    }) => {
        const selectedCategory = CATEGORIES.find(cat => cat.nombre === habitData.categoria)
        const newHabit: Habit = {
            id: habits.length > 0 ? Math.max(...habits.map(h => h.id), 0) + 1 : 1,
            nombre: habitData.nombre,
            descripcion: habitData.label || '',
            frecuencia: 'Diaria',
            tipo: habitData.tipo,
            categoria: habitData.categoria,
            subcategoria: habitData.subcategoria,
            categoriaColor: selectedCategory?.color || '#607D8B',
            fechaInicio: habitData.fechaInicio || undefined,
            recordatorio: habitData.recordatorio || undefined,
            duracionSegundos: habitData.tipo === 'Cronometrada' ? (habitData.duracionSegundos ?? 1500) : undefined
        }
        setHabits(prev => [...prev, newHabit])
    }

    return (
        <>
        <div className="flex flex-col h-screen bg-white">
            <TopNav active={viewType} onChange={setViewType} />
            <div className="flex min-h-0 flex-1">
                {/* Desktop sidebar */}
                <div className="hidden lg:flex">
                    <Sidebar activeSlot={slot} onSlotChange={setSlot} />
                </div>
                {/* Mobile/Tablet sidebar overlay */}
                {isSidebarOpen && (
                    <div className="lg:hidden fixed inset-0 z-40">
                        <div className="absolute inset-0 bg-black/30" onClick={() => setIsSidebarOpen(false)} aria-label="Cerrar sidebar" />
                        <div className="absolute left-0 top-0 h-full w-64 bg-[#EDF0F7] shadow">
                            <Sidebar activeSlot={slot} onSlotChange={(s)=>{setSlot(s); setIsSidebarOpen(false)}} />
                        </div>
                    </div>
                )}
                <main className="flex-1 p-4">
                    {viewType === 'Habitos' && (
                        <HabitsSection
                            habits={habits}
                            completed={completed}
                            skipped={skipped}
                            onComplete={handleComplete}
                            onSkip={handleSkip}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onToggleSidebar={() => setIsSidebarOpen((v)=>!v)}
                        />
                    )}
                    {viewType === 'Calendario' && (
                        <div className="h-full grid place-items-center text-[#717D96] border border-[#E2E7F0] rounded-md">
                            Placeholder Calendario
                        </div>
                    )}
                    {viewType === 'Graficas' && (
                        <div className="h-full grid place-items-center text-[#717D96] border border-[#E2E7F0] rounded-md">
                            Placeholder Gráficas
                        </div>
                    )}

                    <button
                        className="fixed left-6 bottom-24 md:bottom-20 lg:bottom-8 px-4 py-2 rounded-full bg-[#0C41FF] text-white shadow focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
                        aria-label="Añadir tarea"
                        onClick={() => setIsModalOpen(true)}
                    > 
                        Añadir Hábito ＋
                    </button>
                    <button
                        className="fixed right-6 bottom-24 md:bottom-20 lg:bottom-8 px-4 py-2 rounded-full bg-[#2D2E48] text-white shadow focus:outline-none focus:ring-2 focus:ring-[#0C41FF]"
                        aria-label="Abrir chatbot"
                        onClick={() => alert('Chatbot (placeholder)')}
                    >
                        Chatbot
                    </button>
                </main>
            </div>
        </div>
        <CreateHabitModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreate}
        />
        </>
    )
}
export default HomePage 