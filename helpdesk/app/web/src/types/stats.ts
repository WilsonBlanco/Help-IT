export type StatsCards = {
  abiertos: number
  enProceso: number
  finalizados: number
  total: number
}

export type StatsOverviewResponse = {
  ok: boolean
  cards: StatsCards
  source?: string
}
