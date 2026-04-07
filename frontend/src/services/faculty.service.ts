import api from '../lib/api'
import { Faculty, PaginatedResponse } from '../types'

export const facultyService = {
  async getAll(params?: Record<string, any>): Promise<PaginatedResponse<Faculty>> {
    try {
      const response = await api.get<PaginatedResponse<Faculty>>('/faculty/', {
        params,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getById(id: string): Promise<Faculty> {
    try {
      const response = await api.get<Faculty>(`/faculty/${id}/`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async create(data: Partial<Faculty>): Promise<Faculty> {
    try {
      const response = await api.post<Faculty>('/faculty/', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async update(id: string, data: Partial<Faculty>): Promise<Faculty> {
    try {
      const response = await api.put<Faculty>(`/faculty/${id}/`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/faculty/${id}/`)
    } catch (error) {
      throw error
    }
  },
}