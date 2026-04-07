import api from '../lib/api'
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../types'

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/token/', {
        email,
        password,
      })
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access)
        if (response.data.refresh) {
          localStorage.setItem('refresh_token', response.data.refresh)
        }
      }
      return response.data
    } catch (error) {
      throw error
    }
  },

  async register(data: RegisterRequest): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>('/auth/register/', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getMe(): Promise<User> {
    try {
      const response = await api.get<User>('/users/me/')
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await api.put<User>('/users/me/', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout/')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
    }
  },

  async refreshToken(): Promise<string> {
    try {
      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken) throw new Error('No refresh token')

      const response = await api.post<{ access: string }>('/token/refresh/', {
        refresh: refreshToken,
      })
      localStorage.setItem('access_token', response.data.access)
      return response.data.access
    } catch (error) {
      throw error
    }
  },
}