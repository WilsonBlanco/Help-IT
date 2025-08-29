import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiPost, apiGet } from '../lib/api'
import { useState } from 'react'
import type { LoginResponse, MeResponse } from '../types/auth'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'


const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
})
type LoginInput = z.infer<typeof LoginSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' }
  })
  const { register, handleSubmit } = form

  async function onSubmit(values: LoginInput) {
    setErrorMsg(null)
    try {
      // 1) Login: el backend setea cookie httpOnly
      await apiPost<LoginResponse>('/auth/login', values)

      // 2) Confirma sesión y guarda en cache para ProtectedRoute
      const meResp = await apiGet<MeResponse>('/auth/me')
      qc.setQueryData(['me'], meResp.user)

      // 3) Ir a zona protegida
      navigate('/tickets', { replace: true })
    } catch (e: any) {
      setErrorMsg(e?.message || 'Error al iniciar sesión')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Iniciar sesión</h1>

        {errorMsg && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@local.test"
              {...register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Admin1234"
              {...register('password')}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {form.formState.isSubmitting ? 'Ingresando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
