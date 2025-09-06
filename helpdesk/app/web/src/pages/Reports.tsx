import Reporteria from '../legacyui/PanelTecnico/Reportes/Reporteria';

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Informes</h1>
      <p className="text-sm text-gray-600">
        Panel de reportes (por categoría, rendimiento de técnicos, SLA, etc.).
      </p>

      {/* Reemplazamos el contenido de la página con tu componente de Reporteria */}
      <Reporteria />
    </div>
  );
}