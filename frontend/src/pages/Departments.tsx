import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

export default function Departments() {
  return (
    <Layout>
      <PageHeader
        title="Departments"
        description="Manage university departments"
      />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-400">
          Departments management page coming soon.
        </p>
      </div>
    </Layout>
  )
}