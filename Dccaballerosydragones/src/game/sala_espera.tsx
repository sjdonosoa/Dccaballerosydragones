import { useNavigate } from 'react-router-dom';
import './sala_espera.css';
import Navbar_usuario from '../comun/componentes/Navbar_usuario';
import Dragon from '../comun/componentes/Dragon';
import Caballero from '../comun/componentes/Caballero';
//import axios from 'axios';

const SalaEspera = () => {
    const navigate = useNavigate();
    //const partidaId = localStorage.getItem('partidaId'); // Asegúrate de guardar esto al crear/unirse


    const handleStartGame = async () => {
       try {
            // 2. Iniciar la partida
            // await axios.post(
            //     `${import.meta.env.VITE_BACKEND_URL}/partidas/${Number(partidaId)}/iniciar`
            // );
            // 3. Redirigir a la pantalla de juego
            navigate('/partida');
        } catch (error) {
            alert('Error al intentar iniciar la partida');
        }
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