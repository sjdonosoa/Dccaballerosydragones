import { useNavigate } from 'react-router-dom';
import './sala_espera.css';
import Navbar_usuario from '../comun/componentes/Navbar_usuario';
import Dragon from '../comun/componentes/Dragon';
import Caballero from '../comun/componentes/Caballero';

const SalaEspera = () => {
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate('/partida'); // Redirige a la pantalla de juego
    };

    const handleGoBack = () => {
        navigate('/lista_espera'); // Vuelve a la lista de espera
    };

    return (
        <div className="sala-espera-container">
            <Navbar_usuario />
            <Dragon />
            <Caballero />
            <div className="sala-espera-content">
                <h1 className="sala-espera-title">Sala de Espera</h1>
                <p className="sala-espera-description">Jugadores en la sala:</p>
                
                <div className="sala-espera-players">
                    {Array(6).fill('').map((_, index) => (
                        <div key={index} className="player-row">
                            {`Jugador ${index + 1}...`}
                        </div>
                    ))}
                    <button onClick={handleStartGame} className="start-button">
                        Iniciar partida
                    </button>
                    <button onClick={handleGoBack} className="back1-button">
                        Volver
                    </button>
                </div>
             
            </div>
        </div>
    );
};

export default SalaEspera;