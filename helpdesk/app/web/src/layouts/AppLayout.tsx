import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useMe } from '../hooks/useMe'
import { useQueryClient } from '@tanstack/react-query'
import { apiPost } from '../lib/api'

export default function AppLayout() {
  const { data: me } = useMe()
  const qc = useQueryClient()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await apiPost('/auth/logout', {})
    } finally {
      await qc.invalidateQueries({ queryKey: ['me'] })
      navigate('/login', { replace: true })
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside className="bg-white border-r p-4">
        <div className="text-xl font-semibold mb-6">HelpDesk</div>

        <nav className="space-y-1">
          <NavItem to="/tickets" label="Tickets" />

          {/* Solo TECH/ADMIN */}

          {(me?.role === 'TECH' || me?.role === 'ADMIN') && (
          <NavItem to="/dashboard" label="Dashboard" />
          )}

          {(me?.role === 'TECH' || me?.role === 'ADMIN') && (<>
          <NavItem to="/reports" label="Informes" /></>)}

          {/* Historial visible para todos */}
          <NavItem to="/tickets/history" label="Historial de Tickets" />

          {/* Solo ADMIN verá “Admin” */}
          {me?.role === 'ADMIN' && <NavItem to="/admin" label="Admin" />}
        </nav>

        <div className="mt-8 border-t pt-4 text-sm text-gray-600">
          <div className="font-medium">{me?.email}</div>
          <div className="opacity-70">Rol: {me?.role}</div>
          <button
            onClick={handleLogout}
            className="mt-3 w-full rounded-lg bg-gray-100 hover:bg-gray-200 py-2"
          >
            Salir
          </button>
        </div>
      </aside>

      {/* Contenido */}
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  )
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'block px-3 py-2 rounded-lg',
          isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-100',
        ].join(' ')
      }
    >
      {label}
    </NavLink>
  )
}
