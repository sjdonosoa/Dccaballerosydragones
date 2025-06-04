import React from 'react';
import './mapas.css'; // Archivo CSS para estilos personalizados
import Navbar_usuario from '../comun/componentes/NavBar_Usuario';
import { Link } from 'react-router-dom'; // Importa Link para manejar la navegación
import Dragon from '../comun/componentes/Dragon';
import Caballero from '../comun/componentes/Caballero';

const Mapas = () => {
    return (
        <div className="mapas">
            <Navbar_usuario />
            <Dragon />
            <Caballero />
            <h1>Elige un mapa</h1>
            <div className="maps-container">
                <Link to="/lista_espera" className="map-button">
                    Mapa 1
                </Link>
                <Link to="/lista_espera" className="map-button">
                    Mapa 2
                </Link>
            </div>
            <Link to="/juego" className="back-button">
                Volver
            </Link>
        </div>
    );
};

export default Mapas;