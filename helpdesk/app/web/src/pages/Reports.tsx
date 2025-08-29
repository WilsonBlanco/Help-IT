export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Informes</h1>
      <p className="text-sm text-gray-600">
        Panel de reportes (por categoría, rendimiento de técnicos, SLA, etc.).
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">(Pendiente) Tickets por categoría</div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">(Pendiente) Rendimiento por técnico</div>
        </div>
      </div>
    </div>
  );
}
