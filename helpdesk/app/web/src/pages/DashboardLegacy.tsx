import React from 'react';

// Importa los estilos necesarios
import '../legacyui/PanelTecnico/modulo.css';
import '../legacyui/PanelTecnico/Reportes/reportes.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Importa el componente del Dashboard
import DashboardPage from '../legacyui/PanelTecnico/Dashboard';

// Importa el hook para los datos del dashboard
import { useStatsOverview } from '../hooks/useStats';

export default function DashboardLegacy() {
  const { data, refetch, dataUpdatedAt, isLoading, isError } = useStatsOverview();

  const cards = {
    total: data?.cards.total ?? 0,
    abiertos: data?.cards.abiertos ?? 0,
    enProceso: data?.cards.enProceso ?? 0,
    finalizados: data?.cards.finalizados ?? 0,
  };
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt) : null;

  return (
    <div className="legacy-sistemahelp">
      {isError && (
        <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">
          No se pudo cargar el resumen.
        </div>
      )}
      <DashboardPage
        cards={cards}
        lastUpdated={lastUpdated}
        onRefresh={() => refetch()}
        loading={isLoading}
      />
    </div>
  );
}