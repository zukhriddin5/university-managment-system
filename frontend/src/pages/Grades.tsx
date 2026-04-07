import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

export default function Grades() {
  return (
    <Layout>
      <PageHeader
        title="Grades"
        description="View and manage student grades"
      />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-400">
          Grades management page coming soon.
        </p>
      </div>
    </Layout>
  )
}