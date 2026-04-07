import api from '../lib/api'
import { Department, PaginatedResponse } from '../types'

export const departmentsService = {
  async getAll(params?: Record<string, any>): Promise<PaginatedResponse<Department>> {
    try {
      const response = await api.get<PaginatedResponse<Department>>('/departments/', {
        params,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getById(id: string): Promise<Department> {
    try {
      const response = await api.get<Department>(`/departments/${id}/`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async create(data: Partial<Department>): Promise<Department> {
    try {
      const response = await api.post<Department>('/departments/', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async update(id: string, data: Partial<Department>): Promise<Department> {
    try {
      const response = await api.put<Department>(`/departments/${id}/`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/departments/${id}/`)
    } catch (error) {
      throw error
    }
  },
}