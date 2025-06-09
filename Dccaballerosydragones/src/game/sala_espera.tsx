import { useNavigate } from 'react-router-dom';
import './sala_espera.css';
import Navbar_usuario from '../comun/componentes/Navbar_usuario';

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
            <div className="sala-espera-content">
                <h1 className="sala-espera-title">Sala de Espera</h1>
                <p className="sala-espera-description">Espacios para jugadores:</p>
                
                <div className="sala-espera-players">
                    {Array(6).fill('').map((_, index) => (
                        <div key={index} className="player-slot empty">
                            {`Espacio ${index + 1}`}
                        </div>
                    ))}
                </div>
                
                <div className="sala-espera-buttons">
                    <button onClick={handleStartGame} className="sala-espera-button start">
                        Iniciar partida
                    </button>
                    <button onClick={handleGoBack} className="sala-espera-button back">
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SalaEspera;