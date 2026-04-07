import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DataState {
  students: {
    items: any[]
    loading: boolean
    error: string | null
  }
  courses: {
    items: any[]
    loading: boolean
    error: string | null
  }
  enrollments: {
    items: any[]
    loading: boolean
    error: string | null
  }
  grades: {
    items: any[]
    loading: boolean
    error: string | null
  }
}

const initialState: DataState = {
  students: { items: [], loading: false, error: null },
  courses: { items: [], loading: false, error: null },
  enrollments: { items: [], loading: false, error: null },
  grades: { items: [], loading: false, error: null },
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setStudentsLoading: (state, action: PayloadAction<boolean>) => {
      state.students.loading = action.payload
    },
    setStudents: (state, action: PayloadAction<any[]>) => {
      state.students.items = action.payload
    },
    setCoursesLoading: (state, action: PayloadAction<boolean>) => {
      state.courses.loading = action.payload
    },
    setCourses: (state, action: PayloadAction<any[]>) => {
      state.courses.items = action.payload
    },
  },
})

export const {
  setStudentsLoading,
  setStudents,
  setCoursesLoading,
  setCourses,
} = dataSlice.actions
export default dataSlice.reducer