export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: 'admin' | 'faculty' | 'student'
  phone?: string
  bio?: string
  profile_image?: string
  is_verified: boolean
}

export interface Student {
  id: string
  user: User
  student_id: string
  enrollment_date: string
  gpa: number
  status: 'active' | 'inactive' | 'graduated' | 'suspended'
}

export interface Course {
  id: string
  code: string
  name: string
  description: string
  credits: number
  capacity: number
}

export interface Enrollment {
  id: string
  student: string | Student
  course: string | Course
  semester: string
  status: 'enrolled' | 'dropped' | 'completed'
}

export interface Grade {
  id: string
  enrollment: string
  grade_point: number
  letter_grade: string
}

export interface Faculty {
  id: string
  user: User
  employee_id: string
  department: string
  specialization: string
}

export interface Department {
  id: string
  code: string
  name: string
  description?: string
}

export interface Transcript {
  student: Student
  enrollments: Enrollment[]
  gpa: number
}

export interface ReportData {
  total_students: number
  total_courses: number
  total_enrollments: number
  total_faculty: number
  avg_gpa: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  password_confirm: string
  first_name: string
  last_name: string
  role: string
}

export interface AuthResponse {
  access: string
  refresh: string
  user?: User
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}