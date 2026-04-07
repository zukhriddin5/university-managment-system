import { ChevronRight } from 'lucide-react'

interface Breadcrumb {
  label: string
  path?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  action?: {
    label: string
    onClick: () => void
    icon?: React.ReactNode
  }
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 mb-4 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {crumb.path ? (
                <a href={crumb.path} className="text-blue-600 hover:text-blue-700">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-gray-500">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRight size={16} className="text-gray-300" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Title and Action */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {description && (
            <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
          )}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap"
          >
            {action.icon}
            {action.label}
          </button>
        )}
      </div>
    </div>
  )
}