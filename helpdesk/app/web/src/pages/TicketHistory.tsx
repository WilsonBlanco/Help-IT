import { Link, useSearchParams } from 'react-router-dom'
import { useTickets } from '../hooks/useTickets'

export default function HistoryPage() {
  const [sp, setSp] = useSearchParams({ page: '1', pageSize: '10' })
  const page = Math.max(1, Number(sp.get('page') || 1))
  const pageSize = Math.max(1, Number(sp.get('pageSize') || 10))

  // Pedimos SOLO finalizados (estadoFinal='S')
  const { data, isLoading, error } = useTickets({
    page,
    pageSize,
    estadoFinal: 'S',
  })

  function goto(p: number) {
    setSp({ page: String(p), pageSize: String(pageSize) })
  }

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--hit-navy)]">Historial de Tickets</h1>
          <p className="text-sm opacity-70">Tickets finalizados (cerrados) ordenados por fecha.</p>
        </div>

        <Link to="/tickets" className="hit-btn-primary">
          <img src="/icons/tickets.gif" alt="" />
          Volver a Tickets
        </Link>
      </header>

      {isLoading && <div className="hit-card">Cargando…</div>}
      {error && <div className="hit-card">Error: {(error as any)?.message || 'falló la carga'}</div>}

      {data && data.items.length === 0 && (
        <div className="hit-empty">No hay tickets finalizados.</div>
      )}

      {data && data.items.length > 0 && (
        <div className="space-y-3">
          {data.items.map((t: any) => (
            <article key={t.TIC_TICKET} className="hit-card">
              <div className="hit-row">
                {/* Columna 1: ID / fecha */}
                <div className="text-sm opacity-70">
                  <div className="font-semibold">#{t.TIC_TICKET}</div>
                  <div>{new Date(t.CREADO_EN).toLocaleString()}</div>
                </div>

                {/* Columna 2: título + meta */}
                <div>
                  <div className="text-lg font-semibold">{t.TITULO || '—'}</div>
                  <div className="text-sm opacity-80">
                    {t.CATEGORIA} / {t.SUBCATEGORIA} • Prioridad {t.PRIORIDAD}
                    {t.TECNICO_NOMBRE_ACTUAL ? ` • Técnico: ${t.TECNICO_NOMBRE_ACTUAL}` : ' • Sin técnico'}
                  </div>
                </div>

                {/* Columna 3: estado + link */}
                <div className="flex items-center gap-10">
                  <span className="hit-badge success">
                    <span>✔</span> Finalizado
                  </span>
                  <Link to={`/tickets/${t.TIC_TICKET}`} className="text-[var(--hit-royal)] font-semibold hover:underline">
                    Ver detalle
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {/* Paginación */}
          <div className="hit-pager">
            <button onClick={() => goto(Math.max(1, page - 1))} disabled={page === 1}>
              ← Anterior
            </button>
            <div className="text-sm opacity-70">
              Página {page} / {Math.max(1, Math.ceil((data.total || 0) / pageSize))}
            </div>
            <button
              onClick={() => goto(page + 1)}
              disabled={page * pageSize >= (data.total || 0)}
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
