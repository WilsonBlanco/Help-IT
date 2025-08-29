import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { apiGet } from '../lib/api'
import type { TicketsResponse } from '../types/tickets'

export type TicketsParams = {
  page?: number;
  pageSize?: number;
  estadoFinal?: 'S' | 'N' | null;
  search?: string;
  categoria?: string;
  subcategoria?: string;
  tecnico?: string;
}

/*function toQS(q: TicketsParams) {
  const params = new URLSearchParams()
  if (q.page) params.set('page', String(q.page))
  if (q.pageSize) params.set('pageSize', String(q.pageSize))
  // 👇 no mandamos estadoFinal si es null/undefined (evita 400 en Zod)
  if (q.estadoFinal === 'S' || q.estadoFinal === 'N') {
    params.set('estadoFinal', q.estadoFinal)
  }
  if (q.search) params.set('search', q.search)
  if (q.categoria) params.set('categoria', q.categoria)
  if (q.subcategoria) params.set('subcategoria', q.subcategoria)
  if (q.tecnico) params.set('tecnico', q.tecnico)
  const s = params.toString()
  return s ? `?${s}` : ''
}*/

export function useTickets(params: TicketsParams) {
  const qs = new URLSearchParams()
  qs.set('page', String(params.page))
  qs.set('pageSize', String(params.pageSize))
  if (params.estadoFinal) qs.set('estadoFinal', params.estadoFinal)
  if (params.search) qs.set('search', params.search)

  return useQuery({
    queryKey: ['tickets', params],
    queryFn: () => apiGet<TicketsResponse>(`/tickets?${qs.toString()}`),
    placeholderData: keepPreviousData,
  })
}

