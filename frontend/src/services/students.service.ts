import api from '../lib/api'
import { Student, PaginatedResponse, Transcript } from '../types'

export const studentsService = {
  async getAll(params?: Record<string, any>): Promise<PaginatedResponse<Student>> {
    try {
      const response = await api.get<PaginatedResponse<Student>>('/students/', {
        params,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getById(id: string): Promise<Student> {
    try {
      const response = await api.get<Student>(`/students/${id}/`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async create(data: Partial<Student>): Promise<Student> {
    try {
      const response = await api.post<Student>('/students/', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async update(id: string, data: Partial<Student>): Promise<Student> {
    try {
      const response = await api.put<Student>(`/students/${id}/`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/students/${id}/`)
    } catch (error) {
      throw error
    }
  },

  async getTranscript(studentId: string): Promise<Transcript> {
    try {
      const response = await api.get<Transcript>(`/students/${studentId}/transcript/`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getGPA(studentId: string): Promise<{ gpa: number }> {
    try {
      const response = await api.get<{ gpa: number }>(`/students/${studentId}/gpa/`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getEnrollments(studentId: string): Promise<PaginatedResponse<any>> {
    try {
      const response = await api.get(`/students/${studentId}/enrollments/`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async search(query: string): Promise<PaginatedResponse<Student>> {
    try {
      const response = await api.get<PaginatedResponse<Student>>('/students/', {
        params: { search: query },
      })
      return response.data
    } catch (error) {
      throw error
    }
  },
}