import { useState } from 'react';
import './partida.css';
import { useNavigate } from 'react-router-dom';
import tiendaImg from '../assets/images/tienda.svg';
import Dragon_chico from '../comun/componentes/Dragon_chico';
import alquimia from '../assets/images/poderes/alquimia.svg';
import guardian from '../assets/images/poderes/guardian.svg';
import maldicion from '../assets/images/poderes/maldicion.svg';
import muro from '../assets/images/poderes/muro.svg';
import dragonImg from '../assets/images/dragon.png'; // Importa la imagen del dragón



const Partida = () => {
    const navigate = useNavigate();
    const [mostrarTienda, setMostrarTienda] = useState(false);
    const [mostrarPoderes, setMostrarPoderes] = useState(false);
    const [mostrarDragones, setMostrarDragones] = useState(false);

    const handleSalir = () => {
        navigate('/');
    };

    const toggleTienda = () => {
        setMostrarTienda(!mostrarTienda); // Alterna el estado de la tienda
    };
    const togglePoderes = () => {
        setMostrarPoderes(!mostrarPoderes);
    };
    const cerrarPoderes = () => {
        setMostrarPoderes(false);
    };

    const toggleDragones = () => {
        setMostrarDragones(!mostrarDragones);
    };

    const cerrarDragones = () => {
        setMostrarDragones(false);
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
                            <span>      </span>
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
            <Dragon_chico />
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
                    <button className="btn-tienda" onClick={toggleTienda}>
                        <img src={tiendaImg} alt="Tienda" className="tienda-icon" />
                    </button>
                </div>
                
                <button className="btn-salir" onClick={handleSalir}>SALIR</button>
                {mostrarTienda && (
                <div className="tienda-recuadro">
                    <h3>Tienda</h3>
                    <button className="btn-compra" onClick={togglePoderes}>Comprar Poder</button>
                    <button className="btn-compra" onClick={toggleDragones}>Comprar Dragón</button>

                </div> 
            )}
            {mostrarPoderes && (
                <div className="poderes-recuadro">
                    <h3>Poderes Disponibles</h3>
                    <p className="recursos">Oro: 4 Pan: 2 Hierro: 3</p> {/* Texto agregado */}
                    <button className="btn-poderes">
                        <img src={alquimia} alt="Poder 1" />
                    </button>
                    <button className="btn-poderes">
                        <img src={guardian} alt="Poder 2" />
                    </button>
                    <button className="btn-poderes">
                        <img src={maldicion} alt="Poder 3" />
                    </button>
                    <button className="btn-poderes">
                        <img src={muro} alt="Poder 4" />
                    </button>
                    <button className="btn-atras" onClick={cerrarPoderes}>Atrás</button>
                </div>
            )}
            {mostrarDragones && (
            <div className="dragones-recuadro">
                <h3>Comprar Dragón</h3>
                <p className="recursos">Caballeros: 11</p>
                <button className="btn-dragones">
                    <img src={dragonImg} alt="Dragón" />
                </button>
                <button className="btn-atras" onClick={cerrarDragones}>Atrás</button>
            </div>
            )}
            </div>
            
        </div>
    );
};

export default Partida;
