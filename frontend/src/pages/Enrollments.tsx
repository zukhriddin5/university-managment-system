import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

export default function Enrollments() {
  return (
    <Layout>
      <PageHeader
        title="Enrollments"
        description="Manage student enrollments in courses"
      />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-400">
          Enrollments management page coming soon.
        </p>
      </div>
    </Layout>
  )
}