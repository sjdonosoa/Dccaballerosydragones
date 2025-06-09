import React from 'react';
import './partida.css'; // Asegúrate de tener estilos parecidos a lo mostrado
import { useNavigate } from 'react-router-dom';


const Partida = () => {

    const navigate = useNavigate();

    const handleSalir = () => {
    navigate('/');
    };
    return (
        <div className="partida">
            <h1>DCCaballeros y Dragones</h1>

            <div className="mapa">
                <p>[Mapa aquí]</p>
            </div>

            <div className="informacion-lateral">
                <div className="partida-info">
                    <h3>Partida de: BENGRASS123</h3>
                    <p>15 / 48 territorios conquistados</p>
                </div>

                <div className="bonificacion">
                    <h4>Bonificación</h4>
                    <ul>
                        <li>6 regiones → 3 puntos</li>
                        <li>9 regiones → 5 puntos</li>
                        <li>12 regiones → 7 puntos</li>
                    </ul>
                </div>

                <button className="accion-btn">Atacar</button>
                <button className="accion-btn">Terminar Turno</button>
            </div>

            <div className="panel-inferior">
                <p>Puntos: 6 | Territorios: 11 | Dragones: 1</p>

                <div className="pocimas">
                    <span>Pócima 1</span>
                    <span>Pócima 2</span>
                    <span>Pócima 3</span>
                </div>

                <div className="poderes">
                    <button className="usar-poder">Usar poder</button>
                </div>

                <div className="acciones-finales">
                    <button className="tienda">Tienda</button>
                    <button className="salir" onClick={handleSalir}>Salir</button>
                </div>
            </div>
        </div>
    );
};

export default Partida;
