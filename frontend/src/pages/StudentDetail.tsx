import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

export default function StudentDetail() {
  const { id } = useParams()

  return (
    <Layout>
      <PageHeader
        title="Student Details"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Students', path: '/students' },
          { label: 'Details' },
        ]}
      />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p>Student ID: {id}</p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          This page will display detailed information about the student.
        </p>
      </div>
    </Layout>
  )
}