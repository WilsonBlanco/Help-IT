import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const mockTickets = [
    { id: 'T-005', title: 'Impresora sin conexión', status: 'en-proceso', user: 'Juan Pérez' },
    { id: 'T-012', title: 'Acceso a red denegado', status: 'abierto', user: 'Ana López' },
    { id: 'T-018', title: 'Error en software de contabilidad', status: 'en-proceso', user: 'María González' },
    { id: 'T-025', title: 'Fallo de correo electrónico', status: 'abierto', user: 'Pedro Soto' },
    { id: 'T-030', title: 'Problema de licencia', status: 'resuelto', user: 'Carlos Ruiz' },
];

function ReporteTicketsPendientes() {
    const [filterText, setFilterText] = useState('');
    const pendingStatuses = ['abierto', 'en-proceso'];

    const filteredTickets = mockTickets.filter(ticket =>
        pendingStatuses.includes(ticket.status) &&
        (ticket.id.toLowerCase().includes(filterText.toLowerCase()) || 
         ticket.title.toLowerCase().includes(filterText.toLowerCase()) ||
         ticket.user.toLowerCase().includes(filterText.toLowerCase()))
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.title}><i className="bi bi-exclamation-circle-fill me-2"></i>Tickets Pendientes</h2>
            <p style={styles.subtitle}>Lista de tickets con estado 'abierto' o 'en-proceso'.</p>

            <div style={styles.filterSection}>
                <div style={styles.inputGroup}>
                    <i className="bi bi-search" style={styles.searchIcon}></i>
                    <input
                        type="text"
                        style={styles.filterInput}
                        placeholder="Filtrar por ID, título o usuario..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                </div>
            </div>

            <div style={styles.list}>
                {filteredTickets.length > 0 ? (
                    filteredTickets.map(ticket => (
                        <div key={ticket.id} style={{ ...styles.card, ...styles.cardPendientes }}>
                            <div style={styles.cardHeader}>
                                <span style={styles.cardId}>
                                    <i className="bi bi-hash me-1"></i>
                                    #{ticket.id}
                                </span>
                                <span style={{ ...styles.statusTag, ...styles[ticket.status] }}>
                                    {ticket.status === 'en-proceso' ? (
                                        <i className="bi bi-gear-fill me-1"></i>
                                    ) : (
                                        <i className="bi bi-bell-fill me-1"></i>
                                    )}
                                    {ticket.status}
                                </span>
                            </div>
                            <h3 style={styles.cardTitle}>
                                <i className="bi bi-file-earmark-text-fill me-2"></i>{ticket.title}
                            </h3>
                            <p style={styles.cardInfo}>
                                <i className="bi bi-person-fill me-2"></i>Solicitante: <strong style={styles.userName}>{ticket.user}</strong>
                            </p>
                        </div>
                    ))
                ) : (
                    <p style={styles.noData}>
                        <i className="bi bi-exclamation-circle me-2"></i>
                        No se encontraron tickets pendientes con ese filtro.
                    </p>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: { padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' },
    title: { fontSize: '1.8em', marginBottom: '5px', color: '#333' },
    subtitle: { fontSize: '0.9em', color: '#777', marginBottom: '20px' },
    filterSection: { marginBottom: '20px' },
    inputGroup: { position: 'relative', display: 'flex', alignItems: 'center' },
    searchIcon: { position: 'absolute', left: '10px', color: '#888' },
    filterInput: { padding: '8px 8px 8px 35px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', outline: 'none' },
    list: { display: 'flex', flexDirection: 'column', gap: '15px' },
    card: {
        backgroundColor: 'white',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    cardPendientes: { borderLeft: '5px solid #007bff' },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    cardId: { fontWeight: 'bold', color: '#495057', display: 'flex', alignItems: 'center', gap: '5px' },
    statusTag: {
        fontSize: '0.8em',
        padding: '3px 8px',
        borderRadius: '12px',
        color: 'white',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    'en-proceso': { backgroundColor: '#007bff' },
    abierto: { backgroundColor: '#f0ad4e' },
    cardTitle: { fontSize: '1.2em', margin: '0', display: 'flex', alignItems: 'center', gap: '10px' },
    cardInfo: { fontSize: '0.9em', color: '#6c757d', display: 'flex', alignItems: 'center', gap: '10px' },
    userName: { fontWeight: 'bold' },
    noData: { textAlign: 'center', color: '#adb5bd', fontStyle: 'italic', marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' },
};

export default ReporteTicketsPendientes;