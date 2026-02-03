import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="p-10 text-center">Loading...</div>

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (role) {
    // Check if role is an array or single string
    const roles = Array.isArray(role) ? role : [role]
    if (!roles.includes(user.role)) {
      // User has no access, redirect to their dashboard or home
      // To avoid infinite loops or confusing redirects, go to "/" (Landing) or specific dashboard
      return <Navigate to="/" replace />
    }
  }

  return children
}
