import React, { useState } from 'react';
import PerformanceDashboard from './RendimientoTecnico'; 
import CategoryDistribution from './DistribucionCategoria'; 
import './reportes.css'; 

const ReporteTecnico = () => {
  const [view, setView] = useState('performance'); // Estado para controlar qué vista se muestra

  return (
    <div className="report-container">
      <div className="nav-buttons">
        <button
          className={`nav-button ${view === 'performance' ? 'active' : ''}`}
          onClick={() => setView('performance')}
        >
          Rendimiento
        </button>
        <button
          className={`nav-button ${view === 'categories' ? 'active' : ''}`}
          onClick={() => setView('categories')}
        >
          Categorías
        </button>
      </div>

      <div className="report-content">
        {view === 'performance' ? <PerformanceDashboard /> : <CategoryDistribution />}
      </div>
    </div>
  );
};

export default ReporteTecnico;