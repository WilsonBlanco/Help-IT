import React from 'react';
import './reportes.css'; 

const SummaryCard = ({ title, value, color }) => (
  <div className="summary-card">
    <div className="summary-value" style={{ color }}>{value}</div>
    <div className="summary-title">{title}</div>
  </div>
);

const TechnicianDashboard = () => {

  const technician = {
    name: 'Juan Pérez',
    activeTickets: 4,
    resolvedTickets: 45,
    averageTime: '2.3h',
    satisfaction: '4.8/5'
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="back-link">← Volver a Informes</div>
      </div>
      <div className="title-section">
        <h1>Mi Rendimiento</h1>
        <p>Análisis detallado de tu desempeño individual</p>
      </div>
      
      <div className="summary-cards-container">
        <SummaryCard title="Tickets Abiertos" value={technician.activeTickets} color="#007bff" />
        <SummaryCard title="Tickets Resueltos" value={technician.resolvedTickets} color="#28a745" />
        <SummaryCard title="Tiempo Promedio" value={technician.averageTime} color="#ffc107" />
        <SummaryCard title="Satisfacción" value={technician.satisfaction} color="#6610f2" />
      </div>
    </div>
  );
};

export default TechnicianDashboard;