import { useParams, Link } from 'react-router-dom';

export default function TicketDetailPage() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Ticket #{id}</h1>
        <Link to="/tickets" className="text-sm text-blue-700 hover:underline">← Volver a Tickets</Link>
      </div>

      <div className="grid gap-4">
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">(Pendiente) Resumen del ticket</div>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">(Pendiente) Comentarios</div>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">(Pendiente) Adjuntos</div>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">(Pendiente) Historial de cambios</div>
        </div>
      </div>
    </div>
  );
}
