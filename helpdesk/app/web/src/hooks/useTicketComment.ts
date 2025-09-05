import { useQuery } from '@tanstack/react-query'
import { apiGet } from '../lib/api'
import type { TicketCommentsResponse, TicketComment } from '../types/tickets'

export function useTicketComments(id: number, enabled = true) {
  return useQuery<TicketComment[]>({
    queryKey: ['ticketComments', id],
    queryFn: async () => {
      const data = await apiGet<TicketCommentsResponse>(`/tickets/${id}/comments`)
      return data.items ?? []
    },
    enabled: enabled && Number.isFinite(id) && id > 0,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    retry: false,
  })
}
