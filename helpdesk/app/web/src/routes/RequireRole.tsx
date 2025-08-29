import { Navigate, Outlet } from 'react-router-dom'
import { useMe } from '../hooks/useMe'
import type { Role } from '../types/auth'

export function RequireRole({ roles }: { roles: Role[] }) {
  const { data: me, isLoading } = useMe()

  if (isLoading) {
    return <div className="min-h-screen grid place-items-center">Cargando…</div>
  }
  if (!me) {
    return <Navigate to="/login" replace />
  }
  if (!roles.includes(me.role)) {
    return <Navigate to="/tickets" replace />
  }
  return <Outlet />
}
