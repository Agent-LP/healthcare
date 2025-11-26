import { apiClient } from './client'
import type { CategoryResponse } from './types'

export const categoriesService = {
  async getCategoriesByUserId(userId: number): Promise<CategoryResponse[]> {
    try {
      const response = await apiClient.get<CategoryResponse[]>(`/api/categorias/byUser?IdUsuario=${userId}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}





