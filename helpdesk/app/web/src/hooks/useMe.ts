import { useQuery } from '@tanstack/react-query'
import type { MeResponse, MeUser } from '../types/auth'

export function useMe() {
  return useQuery<MeUser | null>({
    queryKey: ['me'],
    queryFn: async () => {
      const r = await fetch('/api/auth/me', { credentials: 'include' })
      if (r.status === 401) return null            // sin sesión
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const data: MeResponse = await r.json()
      return data.user
    },
    // 👉 Siempre fresco en pantallas protegidas:
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: 'always',
    retry: false, // evita reintentos ruidosos si hay 401
  })
}
