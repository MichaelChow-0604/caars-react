import { Navigate, useLocation } from 'react-router'
import { useAuthStore } from '@/stores/authStore'

const LOGIN_PATH = '/login'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_PATH} state={{ from: location }} replace />
  }

  return <>{children}</>
}
