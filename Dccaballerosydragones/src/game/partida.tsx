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
import axios from 'axios';


const Partida = () => {
    const navigate = useNavigate();
    const [mostrarTienda, setMostrarTienda] = useState(false);
    const [mostrarPoderes, setMostrarPoderes] = useState(false);
    const [mostrarDragones, setMostrarDragones] = useState(false);
    // const [turno, setTurno] = useState<number | null>(null);
    const [caballeros, setCaballeros] = useState<{ id: number, nombre: string }[]>([]);
    const [caballerosSeleccionados, setCaballerosSeleccionados] = useState<number[]>([]);
    const partidaId = localStorage.getItem('partidaId'); 
    const [mensajeDragon, setMensajeDragon] = useState<string | null>(null);
    
    const handleSalir = () => {
        navigate('/');
    };

    const toggleTienda = () => {
        setMostrarTienda(!mostrarTienda); // Alterna el estado de la tienda
    };
    const cerrarPoderes = () => {
        setMostrarPoderes(false);
    };


    const cerrarDragones = () => {
        setMostrarDragones(false);
    };

    const handleTerminarTurno = async () => {
        if (!partidaId) {
            alert('No se encontró el id de la partida');
            return;
        }
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/partidas/${partidaId}/turno`
            );
            alert(`Turno cambiado. Ahora es el turno ${response.data.turno}`);
        } catch (error) {
            alert('Error al cambiar el turno');
        }
    };

    const handleComprarPoder = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/comprar`
            );
            // Aquí podrías mostrar un mensaje con alert o alguna otra forma si lo deseas
            alert(response.data.mensaje || `¡Poder comprado: ${response.data.poder?.tipo || 'desconocido'}!`);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('Error al comprar poder');
            }
        }
    };
    const handleAbrirDragones = async () => {
        setMostrarDragones(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/caballeros/turno`,
                { params: { partidaId } }
            );
            setCaballeros(response.data); // Asegúrate que response.data sea un array de caballeros
        } catch (error) {
            setCaballeros([]);
            setMensajeDragon('Error al obtener caballeros');
        }
    };

    const toggleCaballero = (id: number) => {
        setCaballerosSeleccionados(prev =>
            prev.includes(id)
                ? prev.filter(cid => cid !== id)
                : prev.length < 5
                    ? [...prev, id]
                    : prev
        );
    };

    const handleComprarDragon = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/comprardragon`,
                { caballeros: caballerosSeleccionados }
            );
            setMensajeDragon(response.data.mensaje || '¡Has comprado un dragón!');
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                setMensajeDragon(error.response.data.error);
            } else {
                setMensajeDragon('Error al comprar dragón');
            }
        }
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
                    <button className="btn-accion terminar" onClick={handleTerminarTurno}>
                    TERMINAR TURNO
                </button>
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
                        <button className="btn-compra" onClick={handleComprarPoder}>
                            Comprar Poder
                        </button>
                        <button className="btn-compra" onClick={handleAbrirDragones}>
                            Comprar Dragón
                        </button>
                        {mostrarDragones && (
                            <div>
                                <h4>Selecciona 5 caballeros para sacrificar:</h4>
                                {caballeros.map(caballero => (
                                    <label key={caballero.id} style={{ display: 'block', margin: '5px 0' }}>
                                        <input
                                            type="checkbox"
                                            checked={caballerosSeleccionados.includes(caballero.id)}
                                            onChange={() => toggleCaballero(caballero.id)}
                                            disabled={
                                                !caballerosSeleccionados.includes(caballero.id) &&
                                                caballerosSeleccionados.length >= 5
                                            }
                                        />
                                        {caballero.nombre}
                                    </label>
                                ))}
                                <p>Seleccionados: {caballerosSeleccionados.length} / 5</p>
                                <button
                                    className="btn-compra"
                                    onClick={handleComprarDragon}
                                    disabled={caballerosSeleccionados.length !== 5}
                                >
                                    Confirmar compra de Dragón
                                </button>
                                <button
                                    className="btn-cerrar"
                                    onClick={() => setMostrarDragones(false)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Cancelar
                                </button>
                                {mensajeDragon && <div className="mensaje-dragon">{mensajeDragon}</div>}
                            </div>
                        )}
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
