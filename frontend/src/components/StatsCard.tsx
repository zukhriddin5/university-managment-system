import { TrendingUp, TrendingDown } from 'lucide-react'
import { classNames } from '../lib/utils'

interface Trend {
  value: number
  label: string
  isPositive: boolean
}

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: Trend
  variant?: 'primary' | 'success' | 'warning' | 'danger'
  onClick?: () => void
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'primary',
  onClick,
}: StatsCardProps) {
  const variantClasses = {
    primary: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
    danger: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700',
  }

  const trendColors = {
    primary: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400',
  }

  return (
    <div
      onClick={onClick}
      className={classNames(
        'bg-white dark:bg-gray-800 rounded-lg shadow p-6 border',
        variantClasses[variant],
        onClick && 'cursor-pointer hover:shadow-lg transition'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={classNames('p-3 rounded-lg', trendColors[variant])}>
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-2">
          {trend.isPositive ? (
            <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
          ) : (
            <TrendingDown size={16} className="text-red-600 dark:text-red-400" />
          )}
          <span
            className={classNames(
              'text-sm font-medium',
              trend.isPositive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            )}
          >
            {trend.value}% {trend.label}
          </span>
        </div>
      )}
    </div>
  )
}