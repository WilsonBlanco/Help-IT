import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useMe } from '../hooks/useMe'

export default function ProtectedRoute() {
  const { data: me, isLoading } = useMe()
  const location = useLocation()

  if (isLoading) {
    return <div className="min-h-screen grid place-items-center">Cargando…</div>
  }
  if (!me) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <Outlet />
}
