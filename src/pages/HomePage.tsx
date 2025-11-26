import React, { useState, useEffect, useCallback } from "react";
import TopNav from "../components/layout/top-nav";
import Sidebar from "../components/layout/sidebar";
import HabitsSection from "../components/habits/habits-section";
import { Habit } from "../components/habits/habit-types";
import CreateHabitModal, { HabitFormValues } from "../components/habits/create-habit-modal";
import { Category } from "../helpers/categories";
import { habitsService } from "../api/habits.service";
import { categoriesService } from "../api/categories.service";
import { mapHabitResponseToHabit, mapCategoryResponseToCategory } from "../api/mappers";
import { getUserId } from "../helpers/user";

const HomePage = () => {
    const [viewType, setViewType] = useState<'Habitos' | 'Calendario' | 'Graficas'>('Habitos')
    const [slot, setSlot] = useState<'Dia' | 'Tarde' | 'Noche'>('Dia')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [habits, setHabits] = useState<Habit[]>([])
    const [completed, setCompleted] = useState<Habit[]>([])
    const [skipped, setSkipped] = useState<Habit[]>([])
    const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const userId = getUserId()

    const fetchHabits = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const habitsResponse = await habitsService.getAllHabits()
            const mappedHabits = habitsResponse.map(mapHabitResponseToHabit)
            
            const active = mappedHabits.filter(h => h.idEstado === 1 || !h.idEstado)
            const completedHabits = mappedHabits.filter(h => h.idEstado === 2)
            const skippedHabits = mappedHabits.filter(h => h.idEstado === 3)
            
            setHabits(active)
            console.log(active)
            setCompleted(completedHabits)
            setSkipped(skippedHabits)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar hábitos')
            console.error('Error fetching habits:', err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const fetchCategories = useCallback(async () => {
        try {
            const categoriesResponse = await categoriesService.getCategoriesByUserId(userId)
            const mappedCategories = categoriesResponse.map(mapCategoryResponseToCategory)
            console.log(mappedCategories)
            setCategories(mappedCategories)
        } catch (err) {
            console.error('Error fetching categories:', err)
        }
    }, [userId])

    useEffect(() => {
        fetchHabits()
        fetchCategories()
    }, [fetchHabits, fetchCategories])

    const handleComplete = async (id: number) => {
        try {
            await habitsService.updateHabitState(id, 2)
            await fetchHabits()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al completar hábito')
            console.error('Error completing habit:', err)
        }
    }

    const handleSkip = async (id: number) => {
        try {
            await habitsService.updateHabitState(id, 3)
            await fetchHabits()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al omitir hábito')
            console.error('Error skipping habit:', err)
        }
    }
    const handleEdit = (id: number) => {
        const target = habits.find(h => h.id === id) || completed.find(h => h.id === id) || skipped.find(h => h.id === id) || null
        if (!target) return
        setEditingHabit(target)
        setIsModalOpen(true)
    }
    const handleDelete = async (id: number) => {
        try {
            await habitsService.deleteHabit(id)
            await fetchHabits()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar hábito')
            console.error('Error deleting habit:', err)
        }
    }

    const handleSaveHabit = async (habitData: HabitFormValues, habitId?: number) => {
        try {
            setError(null)
            const selectedCategory = categories.find(cat => cat.nombre === habitData.categoria)
            if (!selectedCategory) {
                setError('Debe seleccionar una categoría')
                return
            }

            const tipoMap: Record<'Normal' | 'Contador' | 'Pomodoro', number> = {
                'Normal': 1,
                'Contador': 2,
                'Pomodoro': 3
            }

            const requestData = {
                nombre: habitData.nombre,
                descripcion: habitData.label || '',
                idTipo: tipoMap[habitData.tipo],
                idEstado: 1,
                fechaInicio: habitData.fechaInicio || new Date().toISOString().split('T')[0],
                fechaFin: habitData.fechaFin || undefined,
                recordatorio: habitData.recordatorio || undefined,
                categorias: [{
                    nombre: selectedCategory.nombre,
                    color: selectedCategory.color
                }],
                repeticiones: habitData.tipo === 'Contador' ? {
                    repeticionesObjetivo: habitData.maxConteos || 1,
                    repeticionesLogradas: habitId && editingHabit?.repeticionesLogradas !== undefined 
                        ? editingHabit.repeticionesLogradas 
                        : 0
                } : null,
                duracion: habitData.tipo === 'Pomodoro' ? {
                    duracionObjetivo: habitData.duracionSegundos || 1500,
                    tiempoLogrado: habitId && editingHabit?.tiempoLogrado !== undefined 
                        ? editingHabit.tiempoLogrado 
                        : 0
                } : null
            }
            console.log(requestData.fechaInicio)
            console.log(requestData.fechaFin)

            if (habitId) {
                await habitsService.updateHabit(habitId, userId, requestData)
            } else {
                await habitsService.createHabit(userId, requestData)
            }
            
            await fetchHabits()
            setEditingHabit(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al guardar hábito')
            console.error('Error saving habit:', err)
        }
    }

    const handleAddCategory = ({ nombre, color }: { nombre: string; color: string }) => {
        const baseId = nombre.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || `categoria-${Date.now()}`
        let uniqueId = baseId
        let counter = 1
        while (categories.some(cat => cat.idCategoria === uniqueId)) {
            uniqueId = `${baseId}-${counter}`
            counter += 1
        }
        const newCategory: Category = {
            idCategoria: uniqueId,
            nombre,
            color
        }
        setCategories(prev => [...prev, newCategory])
        return newCategory.idCategoria
    }

    const handleOpenCreate = () => {
        setEditingHabit(null)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setEditingHabit(null)
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
                    {error && (
                        <div className="mb-4 p-3 bg-[#EA5455] text-white rounded-md text-sm">
                            {error}
                        </div>
                    )}
                    {viewType === 'Habitos' && (
                        <>
                            {isLoading ? (
                                <div className="flex items-center justify-center h-64 text-[#717D96]">
                                    Cargando hábitos...
                                </div>
                            ) : (
                                <HabitsSection
                                    habits={habits}
                                    completed={completed}
                                    skipped={skipped}
                                    onComplete={handleComplete}
                                    onSkip={handleSkip}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onToggleSidebar={() => setIsSidebarOpen((v)=>!v)}
                                    onUpdate={fetchHabits}
                                />
                            )}
                        </>
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
                        onClick={handleOpenCreate}
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
            onClose={handleCloseModal}
            onSubmit={handleSaveHabit}
            categories={categories}
            onAddCategory={handleAddCategory}
            initialHabit={editingHabit || undefined}
        />
        </>
    )
}
export default HomePage 