import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import StatsCard from '../components/StatsCard'
import { Users, BookOpen, Bookmark, BarChart3 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <Layout>
      <PageHeader
        title={`Welcome back, ${user?.first_name}!`}
        description="Here's an overview of your university management system"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value="125"
          icon={<Users size={24} />}
          trend={{ value: 12, label: 'from last month', isPositive: true }}
          variant="primary"
        />
        <StatsCard
          title="Total Courses"
          value="45"
          icon={<BookOpen size={24} />}
          trend={{ value: 5, label: 'from last semester', isPositive: true }}
          variant="success"
        />
        <StatsCard
          title="Active Enrollments"
          value="320"
          icon={<Bookmark size={24} />}
          trend={{ value: 8, label: 'from last week', isPositive: false }}
          variant="warning"
        />
        <StatsCard
          title="Faculty Members"
          value="32"
          icon={<BarChart3 size={24} />}
          trend={{ value: 2, label: 'new this year', isPositive: true }}
          variant="danger"
        />
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">New student enrolled</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">John Doe enrolled in CS101</p>
              <p className="text-xs text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Grade posted</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Midterm grades for CS101 posted</p>
              <p className="text-xs text-gray-400">1 day ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Course created</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Math201 course added to system</p>
              <p className="text-xs text-gray-400">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}