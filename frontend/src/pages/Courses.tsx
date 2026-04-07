import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import { coursesService } from '../services/courses.service'
import { Course } from '../types'
import { Plus } from 'lucide-react'

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await coursesService.getAll()
      setCourses(response.results || [])
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <PageHeader
        title="Courses"
        description="Manage and view all courses offered"
        action={{
          label: 'Add Course',
          onClick: () => alert('Add course form'),
          icon: <Plus size={20} />,
        }}
      />

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {course.code}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{course.name}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded">
                  {course.credits} Credits
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {course.description}
              </p>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Capacity: {course.capacity}</span>
                <button className="text-blue-600 dark:text-blue-400 hover:underline">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}