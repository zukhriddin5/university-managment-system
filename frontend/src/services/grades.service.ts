import api from '../lib/api'
import { Grade, PaginatedResponse } from '../types'

export const gradesService = {
  async getAll(params?: Record<string, any>): Promise<PaginatedResponse<Grade>> {
    try {
      const response = await api.get<PaginatedResponse<Grade>>('/grades/', {
        params,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getById(id: string): Promise<Grade> {
    try {
      const response = await api.get<Grade>(`/grades/${id}/`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async create(data: Partial<Grade>): Promise<Grade> {
    try {
      const response = await api.post<Grade>('/grades/', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async update(id: string, data: Partial<Grade>): Promise<Grade> {
    try {
      const response = await api.put<Grade>(`/grades/${id}/`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/grades/${id}/`)
    } catch (error) {
      throw error
    }
  },
}