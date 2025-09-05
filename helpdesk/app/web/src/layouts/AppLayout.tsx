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
    <div className="min-h-screen grid grid-cols-[220px_1fr]">
      {/* Sidebar */}
      <aside className="hit-sb p-4 flex flex-col">
        <div className="text-2xl font-bold text-[var(--hit-navy)] mb-4">HelpDesk</div>

        <ul className="hit-sb-list flex-1">
          <li><NavItem to="/tickets" label="Tickets" icon="tickets.gif" /></li>

          {/* Visible para TECH o ADMIN */}
          {(me?.role === 'TECH' || me?.role === 'ADMIN') && (
            <>
              <li><NavItem to="/dashboard" label="Dashboard" icon="dashboard.png" /></li>
              <li><NavItem to="/reports" label="Informes" icon="reports.png" /></li>
            </>
          )}

          <li><NavItem to="/tickets/history" label="Historial de Tickets" icon="history.png" /></li>

          {/* Solo ADMIN */}
          {me?.role === 'ADMIN' && (
            <li><NavItem to="/admin" label="Admin" icon="admin.png" /></li>
          )}
        </ul>

        <div className="hit-sb-user">
          <div className="font-semibold">{me?.email}</div>
          <div className="opacity-80">Rol: {me?.role}</div>
          <button
            onClick={handleLogout}
            className="mt-3 w-full rounded-xl py-2 bg-white text-[var(--hit-royal)] font-semibold shadow hover:shadow-md"
          >
            Salir
          </button>
        </div>
      </aside>

      {/* Contenido */}
      <main className="bg-[#f5f9ff] p-8">
        <Outlet />
      </main>
    </div>
  )
}

function NavItem({ to, label, icon }: { to: string; label: string; icon?: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        ['hit-sb-link', isActive ? 'hit-sb-link-active' : ''].join(' ')
      }
    >
      {icon && <img src={`/icons/${icon}`} alt="" />}
      <span>{label}</span>
    </NavLink>
  )
}


