import api from '../lib/api'
import { ReportData, Transcript } from '../types'

export const reportsService = {
  async getAnalytics(): Promise<ReportData> {
    try {
      const response = await api.get<ReportData>('/reports/analytics/')
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getEnrollmentStats(): Promise<any> {
    try {
      const response = await api.get('/reports/enrollments/')
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getTranscript(studentId: string): Promise<Transcript> {
    try {
      const response = await api.get<Transcript>(`/reports/transcripts/${studentId}/`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}