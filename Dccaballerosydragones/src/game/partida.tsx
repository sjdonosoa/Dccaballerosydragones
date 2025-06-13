import React from 'react';
import './partida.css';
import { useNavigate } from 'react-router-dom';

const Partida = () => {
    const navigate = useNavigate();

    const handleSalir = () => {
        navigate('/');
    };

    const rows = [
        { pattern: "abababababa", marginLeft: 0 },     // Fila 1
        { pattern: "ababababababa", marginLeft: 0 },    // Fila 2
        { pattern: "babababababab", marginLeft: 0 },    // Fila 3
        { pattern: "bababababab", marginLeft: 0 }      // Fila 4
    ];

    return (
        <div className="partida">
            <div className="header">
                <h1>DCCABALLEROS Y DRAGONES</h1>
                <h2>PARTIDA DE SANVILLE</h2>
            </div>

            <div className="contenedor-principal">
                <div className="mapa-container">
                    <div className="mapa">
                        <div className="triangulos-container">
                            {rows.map((row, rowIdx) => (
                                <div
                                    key={rowIdx}
                                    className="fila-triangulos"
                                    style={{ marginLeft: `${row.marginLeft}px` }}
                                >
                                    {row.pattern.split('').map((type, colIdx) => (
                                        <div
                                            key={`${rowIdx}-${colIdx}`}
                                            className={`triangulo ${type}`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="control-territorios">
                        <h3>CONTROL DE TERRITORIOS</h3>
                        <p>20/48</p>
                    </div>
                </div>

                <div className="panel-derecho">
                    <div className="bonificacion">
                        <h3>BONIFICACIÓN</h3>
                        <div className="bonificacion-item">
                            <span>6 TERRITORIOS</span>
                            <span>3 PUNTOS</span>
                        </div>
                        <div className="bonificacion-item">
                            <span>9 TERRITORIOS</span>
                            <span>5 PUNTOS</span>
                        </div>
                        <div className="bonificacion-item">
                            <span>12 TERRITORIOS</span>
                            <span>7 PUNTOS</span>
                        </div>
                    </div>

                    <button className="btn-accion atacar">ATACAR</button>
                    <button className="btn-accion terminar">TERMINAR TURNO</button>
                </div>
            </div>

            <div className="panel-inferior">
                <div className="estadisticas">
                    <span>PUNTOS: 9</span>
                    <span>TERRITORIOS: 12</span>
                    <span>DRAGONES: 2</span>
                </div>

                <div className="items">
                    <span>PÓCIMA 1</span>
                    <span>PÓCIMA 2</span>
                    <span>PÓCIMA 3</span>
                    <button className="btn-poder">USAR PODER</button>
                </div>

                <button className="btn-salir" onClick={handleSalir}>SALIR</button>
            </div>
        </div>
    );
};

export default Partida;
