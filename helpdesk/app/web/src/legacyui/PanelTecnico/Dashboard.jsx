import React from 'react';
import './modulo.css';

/**
 * @param {{
 *   cards?: { total?: number, abiertos?: number, enProceso?: number, finalizados?: number },
 *   lastUpdated?: Date | null,
 *   onRefresh?: () => void,
 *   loading?: boolean
 * }} props
 */
const DashboardPage = (props = {}) => {
  // Valores en vivo (con defaults a 0 si no llegan)
  const cards = props.cards || {};
  const totalTickets = cards.total ?? 0;
  const openTickets = cards.abiertos ?? 0;
  const inProgressTickets = cards.enProceso ?? 0;
  const completedTickets = cards.finalizados ?? 0;

  const loading = !!props.loading;
  const onRefresh = props.onRefresh;
  const lastUpdated = props.lastUpdated || null;
  const lastUpdatedLabel = lastUpdated
    ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
    : '—';

  // MOCK: mantenemos los listados por ahora
  const mockDashboardData = {
    recentTickets: [
      {
        id: 1,
        title: 'Configuración de correo electrónico',
        description: 'Nuevo empleado necesita configuración de correo corporativo.',
        status: 'terminado',
        category: 'software',
        assignedTo: 'Ana Silva',
        date: '20/1/2025',
        time: '11:30',
      },
      {
        id: 2,
        title: 'Instalación de software especializado',
        description: 'Instalar AutoCAD en 5 equipos del departamento de diseño',
        status: 'abierto',
        category: 'software',
        assignedTo: 'Roberto Díaz',
        date: '20/1/2025',
        time: '11:00',
      },
    ],
    notifications: [
      { id: 1, type: 'error', message: 'Nuevo ticket crítico asignado: Error en sistema de facturación', date: '20/1/2025', time: '09:00' },
      { id: 2, type: 'success', message: 'Ticket completado: Configuración de correo electrónico', date: '20/1/2025', time: '11:30' },
      { id: 3, type: 'info', message: 'Recordatorio: 3 tickets pendientes requieren atención', date: '20/1/2025', time: '06:00' },
      { id: 4, type: 'success', message: 'Sistema actualizado correctamente', date: '19/1/2025', time: '22:00' },
    ],
  };

  const { recentTickets, notifications } = mockDashboardData;

  const getTagClass = (tagType) => {
    switch (tagType) {
      case 'terminado': return 'status-tag terminado';
      case 'abierto': return 'status-tag abierto';
      case 'software': return 'type-tag software';
      default: return '';
    }
  };

  const getNotificationClass = (type) => {
    switch (type) {
      case 'error': return 'notification-item error';
      case 'success': return 'notification-item success';
      case 'info': return 'notification-item info';
      default: return 'notification-item';
    }
  };

  const getNotificationIconClass = (type) => {
    switch (type) {
      case 'error': return 'fas fa-exclamation-circle';
      case 'success': return 'fas fa-check-circle';
      case 'info': return 'fas fa-info-circle';
      default: return 'fas fa-info-circle';
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-info">
          <h1>Dashboard Principal</h1>
          <p>Resumen general de tickets y actividad del sistema</p>
        </div>
        <div className="header-time" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <i className="fas fa-clock"></i>
          <span>Última actualización: {lastUpdatedLabel}</span>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="btn-refrescar"
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              background: '#2563eb',
              color: 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
            title="Actualizar"
          >
            {loading ? 'Actualizando…' : 'Actualizar'}
          </button>
        </div>
      </header>

      {/* Tarjetas del diseño original, ahora con datos REALES */}
      <section className="summary-cards">
        <div className="card total-tickets">
          <div className="card-content">
            <p className="card-title">Total Tickets</p>
            <h2 className="card-value">{loading ? '…' : totalTickets}</h2>
          </div>
          <div className="card-icon"><i className="fas fa-list-alt"></i></div>
        </div>

        <div className="card open-tickets">
          <div className="card-content">
            <p className="card-title">Abiertos</p>
            <h2 className="card-value">{loading ? '…' : openTickets}</h2>
          </div>
          <div className="card-icon"><i className="fas fa-circle-notch"></i></div>
        </div>

        <div className="card in-process-tickets">
          <div className="card-content">
            <p className="card-title">En Proceso</p>
            <h2 className="card-value">{loading ? '…' : inProgressTickets}</h2>
          </div>
          <div className="card-icon"><i className="fas fa-spinner"></i></div>
        </div>

        <div className="card completed-tickets">
          <div className="card-content">
            <p className="card-title">Completados</p>
            <h2 className="card-value">{loading ? '…' : completedTickets}</h2>
          </div>
          <div className="card-icon"><i className="fas fa-check-circle"></i></div>
        </div>
      </section>

      <div className="main-content-grid">
        <section className="tickets-recentes">
          <h3>Tickets Más Recientes</h3>
          <p className="subtitle">Los 3 tickets actualizados recientemente</p>
          {recentTickets.map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-header">
                <h4>{ticket.title}</h4>
                <span className="media-tag">media</span>
              </div>
              <p className="ticket-description">{ticket.description}</p>
              <div className="ticket-tags">
                <span className={getTagClass(ticket.status)}>{ticket.status}</span>
                <span className={getTagClass(ticket.category)}>{ticket.category}</span>
              </div>
              <div className="ticket-info">
                <p><i className="fas fa-user-circle"></i> {ticket.assignedTo}</p>
                <p><i className="fas fa-calendar-alt"></i> {ticket.date}, {ticket.time}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="notificaciones-panel">
          <div className="notificaciones-header">
            <h3>Notificaciones</h3>
            <span className="notification-count">{notifications.length}</span>
          </div>
          <div className="notificaciones-list">
            {notifications.map(notification => (
              <div key={notification.id} className={getNotificationClass(notification.type)}>
                <i className={getNotificationIconClass(notification.type)}></i>
                <div className="notification-content">
                  <p><strong>{notification.message}</strong></p>
                  <small>{notification.date}, {notification.time}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
