import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

export default function Faculty() {
  return (
    <Layout>
      <PageHeader
        title="Faculty"
        description="Manage faculty members"
      />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-400">
          Faculty management page coming soon.
        </p>
      </div>
    </Layout>
  )
}