import { useState, useMemo } from 'react'
import { useTickets } from '../hooks/useTickets'
import type { Ticket } from '../types/tickets'

export default function TicketsPage() {
  // Estado de consulta (por ahora: página, pageSize y estadoFinal)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [estadoFinal, setEstadoFinal] = useState<'S' | 'N' | null>('N') // Abiertos por defecto

  const { data, isLoading, isFetching, isError, error } = useTickets({ page, pageSize, estadoFinal })

  const totalPages = useMemo(() => {
    if (!data) return 1
    return Math.max(1, Math.ceil(data.total / data.pageSize))
  }, [data])

  function onChangeEstado(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value
    setPage(1)
    setEstadoFinal(v === 'ALL' ? null : (v as 'S' | 'N'))
  }

  return (
    <div>
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Tickets</h1>
          <p className="text-gray-600 text-sm">Listado inicial con paginación. Luego agregamos filtros y búsqueda.</p>
        </div>

        {/* Filtro rápido: abiertos / finalizados / todos */}
        <div className="flex items-center gap-2">
          <label className="text-sm">Mostrar:</label>
          <select
            value={estadoFinal === null ? 'ALL' : estadoFinal}
            onChange={onChangeEstado}
            className="rounded-lg border px-3 py-2 text-sm"
          >
            <option value="N">Abiertos</option>
            <option value="S">Finalizados</option>
            <option value="ALL">Todos</option>
          </select>
        </div>
      </header>

      {/* Estados de carga/error */}
      {isLoading && <div className="p-6">Cargando…</div>}
      {isError && <div className="p-6 text-red-600">Error: {(error as any)?.message || 'Falló la carga'}</div>}

      {/* Lista */}
      {data && (
        <>
          {data.items.length === 0 ? (
            <div className="p-6 text-gray-600">No hay resultados.</div>
          ) : (
            <ul className="grid gap-3">
              {data.items.map((t: Ticket) => (
                <li key={t.TIC_TICKET} className="rounded-xl border bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-base font-medium">{t.titulo}</div>
                      <div className="text-sm text-gray-600">
                        {t.categoria ?? '—'} / {t.subcategoria ?? '—'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone={estadoTone(t.estado)}>{t.estado ?? '—'}</Badge>
                      <Badge tone={prioridadTone(t.prioridad)}>{t.prioridad ?? '—'}</Badge>
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-700">
                    Asignado a: <span className="font-medium">{t.tecnico_nombre_actual ?? '—'}</span>
                  </div>

                  <div className="mt-1 text-xs text-gray-500">
                    Ticket #{t.TIC_TICKET} • Creado {formatDateTime(t.creado_en)}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Paginación */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {data.total > 0
                ? `Mostrando ${(data.page - 1) * data.pageSize + 1}–${Math.min(
                    data.page * data.pageSize,
                    data.total
                  )} de ${data.total}`
                : 'Sin resultados'}
              {isFetching && <span className="ml-2 text-gray-400">(actualizando…)</span>}
            </div>

            <div className="flex items-center gap-2">
              <button
                className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                ← Anterior
              </button>
              <span className="text-sm">
                Página <span className="font-medium">{page}</span> / {totalPages}
              </span>
              <button
                className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
              >
                Siguiente →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* ---------- helpers UI ---------- */

function Badge({ tone, children }: { tone: 'gray' | 'blue' | 'green' | 'amber' | 'red'; children: React.ReactNode }) {
  const tones: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-red-100 text-red-700',
  }
  return <span className={`inline-block rounded-full px-2.5 py-1 text-xs ${tones[tone]}`}>{children}</span>
}

function estadoTone(estado?: string | null): 'gray' | 'blue' | 'green' | 'amber' | 'red' {
  const e = (estado || '').toLowerCase()
  if (e.includes('proceso') || e.includes('abierto')) return 'blue'
  if (e.includes('termin') || e.includes('cerr')) return 'green'
  if (e.includes('historial')) return 'gray'
  if (e.includes('pendiente') || e.includes('espera')) return 'amber'
  return 'gray'
}

function prioridadTone(prio?: string | null): 'gray' | 'blue' | 'green' | 'amber' | 'red' {
  const p = (prio || '').toLowerCase()
  if (p.includes('alta') || p.includes('urgente') || p.includes('crit')) return 'red'
  if (p.includes('media')) return 'amber'
  if (p.includes('baja')) return 'green'
  return 'gray'
}

function formatDateTime(iso?: string | null) {
  if (!iso) return '—'
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch {
    return iso
  }
}
