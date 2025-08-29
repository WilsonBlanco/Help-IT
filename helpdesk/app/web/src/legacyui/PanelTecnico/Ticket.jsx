import React, { useState } from 'react';
import './modulo.css'; 

const mockTickets = [
    {
        id: 1,
        title: 'Configuración de correo electrónico',
        status: 'terminado',
        category: 'software',
        assignedTo: 'Ana Silva',
        date: '20/1/2025',
        description: 'Nuevo empleado necesita configuración de correo corporativo.'
    },
    {
        id: 2,
        title: 'Instalación de software especializado',
        status: 'abierto',
        category: 'software',
        assignedTo: 'Roberto Díaz',
        date: '20/1/2025',
        description: 'Instalar AutoCAD en 5 equipos del departamento de diseño'
    },
    {
        id: 3,
        title: 'Fallo en la red de la oficina',
        status: 'en-proceso',
        category: 'hardware',
        assignedTo: 'Luis Mendoza',
        date: '19/1/2025',
        description: 'Intermitencia en la conexión a internet en el departamento de contabilidad.'
    },
    {
        id: 4,
        title: 'Reparación de impresora',
        status: 'cerrado',
        category: 'hardware',
        assignedTo: 'Luis Mendoza',
        date: '18/1/2025',
        description: 'La impresora no enciende y no da señal de vida.'
    },
];

const TicketsModule = () => {
    // Estado para guardar el filtro seleccionado: 'todos', 'abierto', 'en-proceso', etc.
    const [filtroActual, setFiltroActual] = useState('todos');

    // Lógica para filtrar los tickets según el estado
    const ticketsFiltrados = mockTickets.filter(ticket => {
        if (filtroActual === 'todos') {
            return true; // Si el filtro es "todos", muestra todos los tickets
        }
        return ticket.status === filtroActual;
    });

    const getTagClass = (tagType) => {
        switch (tagType) {
            case 'terminado': return 'status-tag terminado';
            case 'abierto': return 'status-tag abierto';
            case 'en-proceso': return 'status-tag en-proceso';
            case 'cerrado': return 'status-tag cerrado';
            case 'software': return 'type-tag software';
            case 'hardware': return 'type-tag hardware';
            default: return '';
        }
    };

    return (
        <div className="tickets-module-container">
            <header className="tickets-header">
                <h2>Lista de Tickets</h2>
                <div className="filter-buttons">
                    <button 
                        className={`filter-btn ${filtroActual === 'todos' ? 'active' : ''}`} 
                        onClick={() => setFiltroActual('todos')}>
                        Todos ({mockTickets.length})
                    </button>
                    <button 
                        className={`filter-btn ${filtroActual === 'abierto' ? 'active' : ''}`} 
                        onClick={() => setFiltroActual('abierto')}>
                        Abiertos ({mockTickets.filter(t => t.status === 'abierto').length})
                    </button>
                    <button 
                        className={`filter-btn ${filtroActual === 'en-proceso' ? 'active' : ''}`} 
                        onClick={() => setFiltroActual('en-proceso')}>
                        En Proceso ({mockTickets.filter(t => t.status === 'en-proceso').length})
                    </button>
                    <button 
                        className={`filter-btn ${filtroActual === 'terminado' ? 'active' : ''}`} 
                        onClick={() => setFiltroActual('terminado')}>
                        Terminados ({mockTickets.filter(t => t.status === 'terminado').length})
                    </button>
                    <button 
                        className={`filter-btn ${filtroActual === 'cerrado' ? 'active' : ''}`} 
                        onClick={() => setFiltroActual('cerrado')}>
                        Cerrados ({mockTickets.filter(t => t.status === 'cerrado').length})
                    </button>
                </div>
            </header>

            <div className="tickets-list">
                {ticketsFiltrados.length > 0 ? (
                    ticketsFiltrados.map(ticket => (
                        <div key={ticket.id} className="ticket-item-card">
                            <div className="ticket-item-header">
                                <h3>{ticket.title}</h3>
                                <div className="ticket-tags">
                                    <span className={getTagClass(ticket.status)}>{ticket.status}</span>
                                    <span className={getTagClass(ticket.category)}>{ticket.category}</span>
                                </div>
                            </div>
                            <p className="ticket-description">{ticket.description}</p>
                            <div className="ticket-meta">
                                <p><i className="fas fa-user-circle"></i> Asignado a: {ticket.assignedTo}</p>
                                <p><i className="fas fa-calendar-alt"></i> Fecha: {ticket.date}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-tickets-message">
                        <p>No hay tickets en este estado.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketsModule;