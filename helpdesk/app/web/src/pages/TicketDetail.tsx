import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useTicket } from '../hooks/useTickets'            // ← singular
import { useTicketComments } from '../hooks/useTicketComment'
import type { TicketComment } from '../types/tickets'

import { useTicketAttachments } from '../hooks/useTicketAttachments'
import type { TicketAttachment } from '../types/tickets'

type TabKey = 'resumen' | 'comentarios' | 'adjuntos' | 'historial'

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>()
  const tid = Number(id)
  const { data: t, isLoading, error } = useTicket(tid)
  const {
    data: comments = [],
    isLoading: cLoading,
    error: cError,
    refetch: refetchComments,
  } = useTicketComments(tid, true)

  const {
    data: attachments = [],
    isLoading: aLoading,
    error: aError,
    refetch: refetchAtt,
  } = useTicketAttachments(tid, true)

  const [tab, setTab] = useState<TabKey>('resumen')
  const title = useMemo(() => (t?.TITULO ? t.TITULO : `Ticket #${tid}`), [t, tid])

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--hit-navy)]">{title}</h1>
          <p className="text-sm opacity-70">
            {t ? `#${t.TIC_TICKET} • ${t.ESTADO || '—'}` : `#${tid}`}
          </p>
        </div>

        <div className="flex items-center gap-8">
          <Link to="/tickets" className="hit-btn-primary">
            <img src="/icons/tickets.gif" alt="" />
            Volver a Tickets
          </Link>
        </div>
      </header>

      {/* Estado de carga / error */}
      {isLoading && <div className="hit-card">Cargando…</div>}
      {error && <div className="hit-card">Error: {(error as any)?.message || 'falló la carga'}</div>}
      {!isLoading && !t && !error && <div className="hit-empty">No encontrado.</div>}

      {/* Contenido cuando hay ticket */}
      {t && (
        <>
          {/* Tabs */}
          <nav className="hit-tabs">
            <button
              className={['hit-tab', tab === 'resumen' ? 'hit-tab-active' : ''].join(' ')}
              onClick={() => setTab('resumen')}
            >
              Resumen
            </button>
            <button
              className={['hit-tab', tab === 'comentarios' ? 'hit-tab-active' : ''].join(' ')}
              onClick={() => setTab('comentarios')}
            >
              Comentarios
            </button>
            <button
              className={['hit-tab', tab === 'adjuntos' ? 'hit-tab-active' : ''].join(' ')}
              onClick={() => setTab('adjuntos')}
            >
              Adjuntos
            </button>
            <button
              className={['hit-tab', tab === 'historial' ? 'hit-tab-active' : ''].join(' ')}
              onClick={() => setTab('historial')}
            >
              Historial
            </button>
          </nav>

          <section className="hit-tabpanel">
            {tab === 'resumen' && <Resumen t={t} />}

            {tab === 'comentarios' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm opacity-70">
                    {cLoading ? 'Cargando…' : `${comments.length} comentario(s)`}
                  </div>
                  <button onClick={() => refetchComments()} className="hit-btn-primary">
                    <img src="/icons/history.gif" alt="" />
                    Actualizar
                  </button>
                </div>

                {cError && (
                  <div className="hit-card">Error: {(cError as any)?.message || 'falló la carga'}</div>
                )}

                {!cLoading && comments.length === 0 && (
                  <div className="hit-empty">Aún no hay comentarios para este ticket.</div>
                )}

                {comments.length > 0 && (
                  <div className="hit-comments">
                    {comments.map((c: TicketComment) => (
                      <article
                        key={c.COMENTARIO_ID ?? `${c.TIC_TICKET}-${Math.random()}`}
                        className="hit-comment"
                      >
                        <div className="hit-comment-head">
                          <div className="hit-comment-author">
                            {c.AUTOR_NOMBRE || c.AUTOR_EMAIL || 'Anónimo'}
                          </div>
                          <div className="hit-comment-time">
                            {c.CREADO_EN ? new Date(c.CREADO_EN).toLocaleString() : ''}
                          </div>
                        </div>
                        <div className="hit-comment-text">{c.TEXTO || '—'}</div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'adjuntos' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm opacity-70">
                    {aLoading ? 'Cargando…' : `${attachments.length} adjunto(s)`}
                  </div>
                  <button onClick={() => refetchAtt()} className="hit-btn-primary">
                    <img src="/icons/history.gif" alt="" />
                    Actualizar
                  </button>
                </div>

                {aError && (
                  <div className="hit-card">Error: {(aError as any)?.message || 'falló la carga'}</div>
                )}

                {!aLoading && attachments.length === 0 && (
                  <div className="hit-empty">Aún no hay adjuntos para este ticket.</div>
                )}

                {attachments.length > 0 && (
                  <ul className="space-y-2">
                    {attachments.map((att: TicketAttachment) => (
                      <li key={att.ADJUNTO_ID ?? Math.random()} className="hit-card flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src="/icons/attachment.png" alt="" className="w-5 h-5" />
                            <div>
                              <div className="font-medium">{att.NOMBRE_ARCHIVO || '(sin nombre)'}</div>
                                <div className="text-xs opacity-70">
                                {att.MIME_TYPE || '—'} • {formatBytes(att.TAMANIO_BYTES)} •{' '}
                                {att.CREADO_EN ? new Date(att.CREADO_EN).toLocaleString() : ''}
                                {att.CREADO_POR_EMAIL ? ` • ${att.CREADO_POR_EMAIL}` : ''}
                              </div>
                            </div>
                        </div>

                        {/* Descarga: la activaremos cuando definamos almacenamiento */}
                        <button
                          className="rounded-lg px-3 py-1 bg-gray-100 text-sm"
                          disabled
                          title="Descarga aún no implementada"
                          >
                          Descargar
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
          </div>
          )}


            {tab === 'historial' && (
              <div className="text-sm opacity-70">
                Sin eventos de historial todavía. (Pronto conectaremos este tab al backend.)
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}

function Resumen({ t }: { t: any }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="hit-card">
          <div className="text-xs opacity-60 mb-1">Ticket</div>
          <div className="text-lg font-semibold hit-mono">#{t.TIC_TICKET}</div>
        </div>
        <div className="hit-card">
          <div className="text-xs opacity-60 mb-1">Estado</div>
          <div className="text-lg font-semibold">{t.ESTADO || '—'}</div>
        </div>
        <div className="hit-card">
          <div className="text-xs opacity-60 mb-1">Prioridad</div>
          <div className="text-lg font-semibold">{t.PRIORIDAD || '—'}</div>
        </div>
      </div>

      <div className="hit-card">
        <div className="text-xs opacity-60 mb-2">Descripción</div>
        <div className="prewrap">{t.DESCRIPCION || '—'}</div>
      </div>

      <div className="hit-card">
        <div className="text-xs opacity-60 mb-3">Metadatos</div>
        <dl className="hit-kv">
          <dt className="opacity-60">Categoría</dt>
          <dd>{t.CATEGORIA || '—'}</dd>

          <dt className="opacity-60">Subcategoría</dt>
          <dd>{t.SUBCATEGORIA || '—'}</dd>

          <dt className="opacity-60">Creado en</dt>
          <dd>{t.CREADO_EN ? new Date(t.CREADO_EN).toLocaleString() : '—'}</dd>

          <dt className="opacity-60">Cerrado en</dt>
          <dd>{t.CERRADO_EN ? new Date(t.CERRADO_EN).toLocaleString() : '—'}</dd>

          <dt className="opacity-60">Reportante</dt>
          <dd>{t.REPORTANTE_EMAIL || '—'}</dd>

          <dt className="opacity-60">Técnico actual</dt>
          <dd>
            {t.TECNICO_NOMBRE_ACTUAL
              ? `${t.TECNICO_NOMBRE_ACTUAL} (${t.TECNICO_EMAIL_ACTUAL || '—'})`
              : '—'}
          </dd>
        </dl>
      </div>
    </div>
  )
}


function formatBytes(n?: number | null) {
  if (n === null || n === undefined) return '—'
  const b = Number(n)
  if (Number.isNaN(b)) return '—'
  const u = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0, v = b
  while (v >= 1024 && i < u.length - 1) { v /= 1024; i++ }
  return `${v.toFixed(1)} ${u[i]}`
}


