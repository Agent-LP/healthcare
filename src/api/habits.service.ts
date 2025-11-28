import { apiClient } from './client'
import type {
  HabitResponse,
  CreateHabitRequest,
  UpdateCounterHabitRequest,
  UpdateTimedHabitRequest,
  UpdateHabitStateRequest
} from './types'

export const habitsService = {
  async getAllHabits(): Promise<HabitResponse[]> {
    try {
      const response = await apiClient.get<HabitResponse[]>('/api/habits')
      return response.data
    } catch (error) {
      throw error
    } 
  },

  async getHabitById(id: number): Promise<HabitResponse> {
    try {
      const response = await apiClient.get<HabitResponse>(`/api/habits/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async createHabit(idUsuario: number, data: CreateHabitRequest): Promise<HabitResponse> {
    try {
      const response = await apiClient.post<HabitResponse>(`/api/habits?idUsuario=${idUsuario}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateHabit(idHabit: number, idUsuario: number, data: CreateHabitRequest): Promise<HabitResponse> {
    try {
      const response = await apiClient.put<HabitResponse>(`/api/habits/${idHabit}?idUsuario=${idUsuario}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deleteHabit(id: number): Promise<void> {
    try {
      await apiClient.delete(`/api/habits/${id}`)
    } catch (error) {
      throw error
    }
  },

  async updateHabitState(id: number, estado: string): Promise<void> {
    try {
      await apiClient.put<UpdateHabitStateRequest>(`/api/habits/${id}/estado?estado=${estado}`)
    } catch (error) {
      throw error
    }
  },

  async updateCounterHabit(idHabit: number, data: UpdateCounterHabitRequest): Promise<void> {
    try {
      await apiClient.put(`/api/habitos-contadores/${idHabit}`, data)
    } catch (error) {
      throw error
    }
  },

  async updateTimedHabit(idHabit: number, data: UpdateTimedHabitRequest): Promise<void> {
    try {
      await apiClient.put(`/api/habitos-temporizados/${idHabit}`, data)
    } catch (error) {
      throw error
    }
  }
}

