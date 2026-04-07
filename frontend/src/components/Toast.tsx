import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { removeToast } from '../store/slices/uiSlice'
import { CheckCircle, AlertCircle, InfoIcon, AlertTriangle, X } from 'lucide-react'
import { useEffect } from 'react'

export default function Toast() {
  const { toasts } = useSelector((state: RootState) => state.ui)
  const dispatch = useDispatch()

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-600" size={20} />
      case 'error':
        return <AlertCircle className="text-red-600" size={20} />
      case 'warning':
        return <AlertTriangle className="text-yellow-600" size={20} />
      case 'info':
        return <InfoIcon className="text-blue-600" size={20} />
      default:
        return null
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 space-y-3 z-50 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          icon={getIcon(toast.type)}
          bgColor={getBgColor(toast.type)}
        />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: any
  icon: React.ReactNode
  bgColor: string
}

function ToastItem({ toast, icon, bgColor }: ToastItemProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id))
      }, toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast.id, toast.duration, dispatch])

  return (
    <div
      className={`${bgColor} border rounded-lg shadow-lg p-4 flex items-start gap-3 animate-slide-in-up pointer-events-auto`}
    >
      {icon}
      <div className="flex-1 text-sm">
        <p className="text-gray-900 dark:text-gray-900">{toast.message}</p>
      </div>
      <button
        onClick={() => dispatch(removeToast(toast.id))}
        className="text-gray-500 hover:text-gray-700"
      >
        <X size={16} />
      </button>
    </div>
  )
}