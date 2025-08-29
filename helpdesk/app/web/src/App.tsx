import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import { RequireRole } from './routes/RequireRole'   // ⬅️ named import

import AppLayout from './layouts/AppLayout'
import LoginPage from './pages/Login'
import TicketsPage from './pages/Tickets'

import AdminPage from './pages/Admin'
import DashboardLegacy from './pages/DashboardLegacy'

import TicketHistoryPage from './pages/TicketHistory'   // ← nuevo
import ReportsPage from './pages/Reports'               // ← nuevo
import TicketDetailPage from './pages/TicketDetail'     // ← nuevo

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protegido */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/tickets" replace />} />

            {/* Tickets (lista + detalle) */}
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/tickets/:id" element={<TicketDetailPage />} />

            {/* Historial (accesible para cualquier rol autenticado) */}
            <Route path="/tickets/history" element={<TicketHistoryPage />} />

            {/* Solo TECH o ADMIN */}
            <Route element={<RequireRole roles={['TECH', 'ADMIN']} />}>
            <Route path="/dashboard" element={<DashboardLegacy />} />
            <Route path="/reports" element={<ReportsPage />} />
            </Route>

            {/* Solo ADMIN */}
            <Route element={<RequireRole roles={['ADMIN']} />}>
            <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/tickets" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
