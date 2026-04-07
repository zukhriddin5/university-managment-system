import api from '../lib/api'
import { Course, PaginatedResponse } from '../types'

export const coursesService = {
  async getAll(params?: Record<string, any>): Promise<PaginatedResponse<Course>> {
    try {
      const response = await api.get<PaginatedResponse<Course>>('/courses/', {
        params,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getById(id: string): Promise<Course> {
    try {
      const response = await api.get<Course>(`/courses/${id}/`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async create(data: Partial<Course>): Promise<Course> {
    try {
      const response = await api.post<Course>('/courses/', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async update(id: string, data: Partial<Course>): Promise<Course> {
    try {
      const response = await api.put<Course>(`/courses/${id}/`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/courses/${id}/`)
    } catch (error) {
      throw error
    }
  },

  async getStudents(courseId: string): Promise<PaginatedResponse<any>> {
    try {
      const response = await api.get(`/courses/${courseId}/students/`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async search(query: string): Promise<PaginatedResponse<Course>> {
    try {
      const response = await api.get<PaginatedResponse<Course>>('/courses/', {
        params: { search: query },
      })
      return response.data
    } catch (error) {
      throw error
    }
  },
}