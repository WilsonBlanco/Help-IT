import { useQuery } from '@tanstack/react-query'
import { apiGet } from '../lib/api'
import type { StatsOverviewResponse } from '../types/stats'

export function useStatsOverview() {
  return useQuery<StatsOverviewResponse>({
    queryKey: ['stats', 'overview'],
    queryFn: async () => apiGet<StatsOverviewResponse>('/stats/overview'),
    staleTime: 10_000,      // 10s “fresco”
    refetchOnWindowFocus: true,
  })
}
