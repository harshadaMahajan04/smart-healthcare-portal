import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

// For pages that require login — redirects to /login if not authenticated
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" replace />
  return children
}

// For pages like /login and /register — redirects to /dashboard if already logged in
export function PublicRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

// Keep default export for any existing imports
export default ProtectedRoute