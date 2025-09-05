import React, { useState } from 'react';
import './App.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 

import DashboardPage from './legacyui/PanelTecnico/Dashboard';
import TicketsModule from './legacyui/PanelTecnico/Ticket';
import DetalleTicketPage from './legacyui/PanelTecnico/DetalleTicket';
import Reporteria from './legacyui/PanelTecnico/Reportes/Reporteria';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' },
  { id: 'tickets', label: 'Historial de Tickets', icon: 'fas fa-ticket-alt' },
  { id: 'detalle', label: 'Detalle de Ticket', icon: 'fas fa-clipboard-list' },
  { id: 'informes', label: 'Informes', icon: 'fas fa-chart-pie' },
];

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardPage />;
      case 'tickets':
        return <TicketsModule />;
      case 'detalle':
        return <DetalleTicketPage />;
      case 'informes':
        return <Reporteria />;
      default:
        return <div>Seleccione un módulo</div>;
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <p>Panel Técnico</p>
          <p className="help-desk-text">HelpDesk Pro</p>
        </div>
        <nav className="nav-menu">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeModule === item.id ? 'active' : ''}`}
              onClick={() => setActiveModule(item.id)}
            >
              <i className={item.icon}></i> {item.label}
            </button>
          ))}
        </nav>
      </div>
      <main className="main-content">
        {renderModule()}
      </main>
    </div>
  );
}

export default App;