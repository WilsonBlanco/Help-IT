export interface Ticket {
  TIC_TICKET: number;
  titulo: string;
  descripcion?: string | null;
  categoria?: string | null;
  subcategoria?: string | null;
  estado?: string | null;
  prioridad?: string | null;
  tecnico_nombre_actual?: string | null;
  tecnico_email_actual?: string | null;
  reportante_email?: string | null;
  creado_en?: string | null;   // ISO date
  es_final?: 'S' | 'N' | null;
}

export interface TicketsResponse {
  ok: boolean;
  page: number;
  pageSize: number;
  total: number;
  items: Ticket[];
}
