import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { RootState } from '../store'
import { setSidebarOpen } from '../store/slices/uiSlice'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Bookmark,
  BarChart3,
  Users2,
  Building2,
  FileText,
  ChevronRight,
} from 'lucide-react'
import { classNames } from '../lib/utils'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: BookOpen, label: 'Courses', path: '/courses' },
  { icon: Bookmark, label: 'Enrollments', path: '/enrollments' },
  { icon: BarChart3, label: 'Grades', path: '/grades' },
  { icon: Users2, label: 'Faculty', path: '/faculty' },
  { icon: Building2, label: 'Departments', path: '/departments' },
  { icon: FileText, label: 'Reports', path: '/reports' },
]

export default function Sidebar() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { sidebarOpen } = useSelector((state: RootState) => state.ui)
  const { user } = useSelector((state: RootState) => state.auth)

  const isActive = (path: string) => location.pathname === path

  const getVisibleMenuItems = () => {
    if (user?.role === 'student') {
      return menuItems.filter((item) => ['Dashboard', 'Courses', 'Grades'].includes(item.label))
    }
    if (user?.role === 'faculty') {
      return menuItems.filter((item) => ['Dashboard', 'Students', 'Courses', 'Grades'].includes(item.label))
    }
    return menuItems
  }

  const visibleMenuItems = getVisibleMenuItems()

  return (
    <>
      {/* Sidebar */}
      <aside
        className={classNames(
          'w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300',
          'flex flex-col border-r border-gray-200 dark:border-gray-700',
          'fixed lg:static h-full z-40',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">U</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">UniManage</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">v1.0</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => dispatch(setSidebarOpen(false))}
                className={classNames(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  active
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {active && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Need Help?</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Contact support or check documentation
            </p>
            <button className="w-full mt-3 px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition">
              Get Help
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}
    </>
  )
}