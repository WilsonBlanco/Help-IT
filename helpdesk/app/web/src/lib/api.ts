const API = '/api' // Vite proxy lo envía a http://localhost:4000

async function handle(r: Response) {
  if (!r.ok) {
    // intenta leer JSON o texto para un error más claro
    try {
      const data = await r.json()
      throw new Error(data?.error || JSON.stringify(data))
    } catch {
      const text = await r.text().catch(() => '')
      throw new Error(text || `HTTP ${r.status}`)
    }
  }
  // si no hay cuerpo, evita error
  const text = await r.text()
  return text ? JSON.parse(text) : null
}

export async function apiGet<T = unknown>(path: string): Promise<T> {
  const r = await fetch(API + path, { credentials: 'include' })
  return handle(r)
}

export async function apiPost<T = unknown>(path: string, body: unknown): Promise<T> {
  const r = await fetch(API + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // importante para la cookie httpOnly
    body: JSON.stringify(body),
  })
  return handle(r)
}

export async function apiPatch<T = unknown>(path: string, body: unknown): Promise<T> {
  const r = await fetch(API + path, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  })
  return handle(r)
}

export async function apiDelete<T = unknown>(path: string): Promise<T> {
  const r = await fetch(API + path, {
    method: 'DELETE',
    credentials: 'include',
  })
  return handle(r)
}
