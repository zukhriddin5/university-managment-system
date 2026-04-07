import { Link } from 'react-router-dom'
import { AlertCircle, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="text-center">
        <AlertCircle className="mx-auto mb-4 text-white" size={64} />
        <h1 className="text-4xl font-bold text-white mb-2">404</h1>
        <p className="text-xl text-blue-100 mb-8">Page not found</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
        >
          <Home size={20} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}