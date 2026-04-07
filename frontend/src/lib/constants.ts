export const APP_NAME = 'University Management System'
const viteMeta = import.meta as ImportMeta & { env?: { VITE_API_URL?: string } }
export const API_URL = viteMeta.env?.VITE_API_URL || 'http://localhost:8000/api/v1'

export const ROLE_CHOICES = {
  admin: 'Administrator',
  faculty: 'Faculty',
  student: 'Student',
}

export const STUDENT_STATUS = {
  active: 'Active',
  inactive: 'Inactive',
  graduated: 'Graduated',
  suspended: 'Suspended',
}

export const ENROLLMENT_STATUS = {
  enrolled: 'Enrolled',
  dropped: 'Dropped',
  completed: 'Completed',
}

export const LETTER_GRADES = ['A', 'B', 'C', 'D', 'F']

export const SEMESTERS = ['Fall 2023', 'Spring 2024', 'Summer 2024', 'Fall 2024']

export const PAGINATION_SIZES = [10, 20, 50, 100]

export const API_ENDPOINTS = {
  auth: {
    login: '/token/',
    refresh: '/token/refresh/',
    register: '/auth/register/',
    logout: '/auth/logout/',
  },
  users: {
    me: '/users/me/',
    list: '/users/',
    detail: '/users/{id}/',
    update: '/users/{id}/',
  },
  students: {
    list: '/students/',
    detail: '/students/{id}/',
    create: '/students/',
    update: '/students/{id}/',
    delete: '/students/{id}/',
    enrollments: '/students/{id}/enrollments/',
    transcript: '/students/{id}/transcript/',
    gpa: '/students/{id}/gpa/',
  },
  courses: {
    list: '/courses/',
    detail: '/courses/{id}/',
    create: '/courses/',
    update: '/courses/{id}/',
    delete: '/courses/{id}/',
    students: '/courses/{id}/students/',
  },
  enrollments: {
    list: '/enrollments/',
    detail: '/enrollments/{id}/',
    create: '/enrollments/',
    update: '/enrollments/{id}/',
    delete: '/enrollments/{id}/',
  },
  grades: {
    list: '/grades/',
    detail: '/grades/{id}/',
    create: '/grades/',
    update: '/grades/{id}/',
    delete: '/grades/{id}/',
  },
  faculty: {
    list: '/faculty/',
    detail: '/faculty/{id}/',
    create: '/faculty/',
    update: '/faculty/{id}/',
    delete: '/faculty/{id}/',
  },
  departments: {
    list: '/departments/',
    detail: '/departments/{id}/',
    create: '/departments/',
    update: '/departments/{id}/',
    delete: '/departments/{id}/',
  },
  reports: {
    analytics: '/reports/analytics/',
    enrollments: '/reports/enrollments/',
    transcripts: '/reports/transcripts/{student_id}/',
  },
}