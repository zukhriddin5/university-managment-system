import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

export default function Reports() {
  return (
    <Layout>
      <PageHeader
        title="Reports"
        description="View analytics and reports"
      />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-400">
          Reports page coming soon.
        </p>
      </div>
    </Layout>
  )
}