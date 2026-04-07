import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser, setToken, setError } from '../store/slices/authSlice'
import { addToast } from '../store/slices/uiSlice'
import { authService } from '../services/auth.service'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

export default function Login() {
  const [email, setEmail] = useState('admin@university.edu')
  const [password, setPassword] = useState('admin@123456')
  const [loading, setLoading] = useState(false)
  const [error, setErrorState] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorState('')
    setLoading(true)

    try {
      const result = await authService.login(email, password)
      dispatch(setToken(result.access))

      const user = await authService.getMe()
      dispatch(setUser(user))

      dispatch(
        addToast({
          id: uuidv4(),
          message: `Welcome back, ${user.first_name}!`,
          type: 'success',
          duration: 3000,
        })
      )

      navigate('/dashboard')
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Invalid credentials'
      setErrorState(errorMessage)
      dispatch(
        addToast({
          id: uuidv4(),
          message: errorMessage,
          type: 'error',
          duration: 5000,
        })
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              U
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white">University Management System</h1>
          <p className="text-blue-100 mt-2">Manage students, courses, and grades efficiently</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                  placeholder="admin@university.edu"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-blue-800">
              <p><strong>Admin:</strong> admin@university.edu / admin@123456</p>
              <p><strong>Faculty:</strong> faculty@university.edu / faculty@123456</p>
              <p><strong>Student:</strong> student@university.edu / student@123456</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-blue-100 text-sm">
            © 2024 University Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}