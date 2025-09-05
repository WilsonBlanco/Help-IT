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

// API: GET /tickets/:id
export interface TicketDetail {
  TIC_TICKET: number
  TITULO: string | null
  DESCRIPCION: string | null
  CREADO_EN: string | null
  CERRADO_EN: string | null
  CATEGORIA: string | null
  SUBCATEGORIA: string | null
  PRIORIDAD: string | null
  ESTADO: string | null
  TECNICO_NOMBRE_ACTUAL: string | null
  TECNICO_EMAIL_ACTUAL: string | null
  REPORTANTE_EMAIL: string | null
}

export interface TicketDetailResponse {
  ok: boolean
  ticket: TicketDetail
  comments: any[]        // placeholder; los tipamos bien cuando hagamos esa parte
  attachments: any[]
  history: any[]
}


export interface TicketComment {
  COMENTARIO_ID?: number | null
  TIC_TICKET: number
  TEXTO: string | null
  CREADO_EN: string | null
  AUTOR_EMAIL: string | null
  AUTOR_NOMBRE: string | null
  ES_INTERNO?: string | null // 'S'|'N' si aplica
}

export interface TicketCommentsResponse {
  ok: boolean
  items: TicketComment[]
}

export interface TicketAttachment {
  ADJUNTO_ID: number;
  TIC_TICKET: number;
  NOMBRE_ARCHIVO?: string | null;
  MIME_TYPE?: string | null;
  TAMANIO_BYTES?: number | null;
  CREADO_EN?: string | null;
  CREADO_POR_EMAIL?: string | null;
  VISIBILIDAD?: string | null;
}


