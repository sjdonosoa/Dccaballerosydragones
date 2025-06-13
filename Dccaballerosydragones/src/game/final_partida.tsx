import React from 'react';
import './final_partida.css';
import { useAuth } from '../comun/AuthContext';
import Navbar_usuario from '../comun/componentes/Navbar_usuario';
import Navbar from '../comun/componentes/Navbar';
import Dragon from '../comun/componentes/Dragon';
import Caballero from '../comun/componentes/Caballero';
import VolverInicio from '../comun/componentes/Volverinicio';

const jugadores = [
    { nombre: 'SAMUELDON12', puntaje: 12 },
    { nombre: 'BENGRASSI23', puntaje: 10 },
    { nombre: 'JOSE1233', puntaje: 8 },
    { nombre: 'ISIDORAI23', puntaje: 2 },
    { nombre: 'MKRDU', puntaje: 1 },
    { nombre: 'ERIROMAL', puntaje: 0 },
];

const ganador = jugadores[0].nombre;

const FinalPartida: React.FC = () => {
    const { isAuthenticated } = useAuth();

    const handleVolverAJugar = () => {
        window.location.href = '/juego';
    };

    const handleSalir = () => {
        window.location.href = '/';
    };

    return (
        <div className="final-partida">
            {isAuthenticated ? <Navbar_usuario /> : <Navbar />}
            <Dragon />
            <Caballero />
            <h1 className="final-title">DCCABALLEROS Y DRAGONES</h1>
            <div className="ganador">Ganador: <span className="ganador-nombre">{ganador}</span></div>
            <div className="partida-finalizada">PARTIDA FINALIZADA</div>
            <table className="final-table">
                <thead>
                    <tr>
                        <th>Jugador</th>
                        <th>Puntaje</th>
                    </tr>
                </thead>
                <tbody>
                    {jugadores.map((jugador, idx) => (
                        <tr key={idx}>
                            <td>{jugador.nombre}</td>
                            <td>{jugador.puntaje}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="buttons-container">
                <button className="play-again-button" onClick={handleVolverAJugar}>VOLVER A JUGAR</button>
                <button className="exit-button" onClick={handleSalir}>SALIR</button>
            </div>
            <VolverInicio />
        </div>
    );
};

export default FinalPartida;