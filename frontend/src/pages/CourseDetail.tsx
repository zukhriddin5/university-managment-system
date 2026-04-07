import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

export default function CourseDetail() {
  const { id } = useParams()

  return (
    <Layout>
      <PageHeader
        title="Course Details"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Courses', path: '/courses' },
          { label: 'Details' },
        ]}
      />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p>Course ID: {id}</p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          This page will display detailed information about the course.
        </p>
      </div>
    </Layout>
  )
}