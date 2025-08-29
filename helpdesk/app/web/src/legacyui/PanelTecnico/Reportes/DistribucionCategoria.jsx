import React from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa'; 
import './reportes.css';

const SummaryCard = ({ title, value, percentage }) => (
  <div className="summary-card">
    <div className="summary-value">{value}</div>
    <div className="summary-title">{title}</div>
    <div className="summary-percentage">{percentage}</div>
  </div>
);

const CategoryDetailList = ({ data }) => (
  <div className="category-detail-container">
    <div className="section-title">Detalle por Categoría</div>
    <ul className="category-list">
      {data.map((category, index) => (
        <li key={index} className="category-item">
          <div className="category-name-container">
            <span className="category-dot" />
            <span className="category-name">{category.name}</span>
          </div>
          <div className="category-stats">
            <span className="category-tickets">{category.tickets} tickets</span>
            <span className="category-percentage">{category.percentage}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const categoryData = [
  { name: 'Hardware', tickets: 45, percentage: '35%' },
  { name: 'Software', tickets: 38, percentage: '29%' },
  { name: 'Red', tickets: 25, percentage: '19%' },
  { name: 'Impresoras', tickets: 15, percentage: '12%' },
  { name: 'Otros', tickets: 7, percentage: '5%' },
];

const CategoryDistribution = () => {
  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="back-link">← Volver a Informes</div>
      </div>
      <div className="title-section">
        <h1>Distribución por Categorías</h1>
        <p>Análisis de tipos de problemas más frecuentes</p>
      </div>

      <div className="filter-export-buttons">
        <button className="button"><FaFilter /> Filtrar</button>
        <button className="button"><FaDownload /> Exportar</button>
      </div>

      <div className="summary-cards-container">
        {categoryData.map((category, index) => (
          <SummaryCard
            key={index}
            title={category.name}
            value={category.tickets}
            percentage={category.percentage}
          />
        ))}
      </div>

      <CategoryDetailList data={categoryData} />
    </div>
  );
};

export default CategoryDistribution;