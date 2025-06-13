
import './mapas.css'; // Archivo CSS para estilos personalizados
import Navbar_usuario from '../comun/componentes/Navbar_usuario';
import { Link } from 'react-router-dom'; // Importa Link para manejar la navegación
import Dragon from '../comun/componentes/Dragon';
import Caballero from '../comun/componentes/Caballero';
import mapa1Img from '../assets/images/mapa1.png';
import mapa2Img from '../assets/images/mapa2.png';

const Mapas = () => {
    return (
        <div className="mapas">
            <Navbar_usuario />
            <Dragon />
            <Caballero />
            <h1>Elige un mapa</h1>
            <div className="maps-container">
                <Link to="/lista_espera" >
                    <img src={mapa1Img} alt="Mapa 1" className="map-image" />
                </Link>
                <Link to="/lista_espera">
                    <img src={mapa2Img} alt="Mapa 2" className="map-image" />
                </Link>
            </div>
            <Link to="/juego" className="back-button">
                Volver
            </Link>
        </div>
    );
};

export default Mapas;