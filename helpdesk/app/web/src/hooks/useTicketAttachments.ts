import { useQuery } from '@tanstack/react-query'
import type { TicketAttachment } from '../types/tickets'

export function useTicketAttachments(ticketId: number, enabled = true) {
  return useQuery<TicketAttachment[]>({
    queryKey: ['ticket', ticketId, 'attachments'],
    enabled: enabled && !!ticketId,
    queryFn: async () => {
      const r = await fetch(`/api/tickets/${ticketId}/attachments`, {
        credentials: 'include',
      })
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const j = await r.json()
      return (j.items ?? []) as TicketAttachment[]
    },
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: 'always',
  })
}
