import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import { studentsService } from '../services/students.service'
import { Student } from '../types'
import { Plus } from 'lucide-react'
import { useDebounce } from '../hooks/useDebounce'

export default function Students() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    fetchStudents()
  }, [debouncedSearch])

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const response = await studentsService.getAll({
        search: debouncedSearch,
        page: 1,
      })
      setStudents(response.results || [])
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { key: 'student_id', label: 'ID' },
    {
      key: 'user.first_name',
      label: 'Name',
      render: (_: any, row: Student) => `${row.user.first_name} ${row.user.last_name}`,
    },
    { key: 'user.email', label: 'Email' },
    { key: 'gpa', label: 'GPA' },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'active'
            ? 'bg-green-100 text-green-800'
            : value === 'graduated'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
  ]

  return (
    <Layout>
      <PageHeader
        title="Students"
        description="Manage and view all students in the system"
        action={{
          label: 'Add Student',
          onClick: () => alert('Add student form'),
          icon: <Plus size={20} />,
        }}
      />

      <DataTable
        columns={columns}
        data={students}
        isLoading={loading}
        searchPlaceholder="Search by ID, name or email..."
        onSearch={setSearchQuery}
        title="Student List"
      />
    </Layout>
  )
}