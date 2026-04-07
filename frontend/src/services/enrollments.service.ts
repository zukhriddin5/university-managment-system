import api from '../lib/api'
import { Enrollment, PaginatedResponse } from '../types'

export const enrollmentsService = {
  async getAll(params?: Record<string, any>): Promise<PaginatedResponse<Enrollment>> {
    try {
      const response = await api.get<PaginatedResponse<Enrollment>>('/enrollments/', {
        params,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getById(id: string): Promise<Enrollment> {
    try {
      const response = await api.get<Enrollment>(`/enrollments/${id}/`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async create(data: Partial<Enrollment>): Promise<Enrollment> {
    try {
      const response = await api.post<Enrollment>('/enrollments/', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async update(id: string, data: Partial<Enrollment>): Promise<Enrollment> {
    try {
      const response = await api.put<Enrollment>(`/enrollments/${id}/`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/enrollments/${id}/`)
    } catch (error) {
      throw error
    }
  },
}