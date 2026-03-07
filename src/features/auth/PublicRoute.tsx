import { Navigate } from 'react-router'
import { useAuthStore } from '@/stores/authStore'

const DEFAULT_REDIRECT = '/calendar'

interface PublicRouteProps {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={DEFAULT_REDIRECT} replace />
  }

  return <>{children}</>
}
