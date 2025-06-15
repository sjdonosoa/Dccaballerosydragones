import './lista_espera.css';
import Navbar_usuario from '../comun/componentes/Navbar_usuario';
import { useNavigate } from 'react-router-dom';

const ListaEspera = () => {
    const navigate = useNavigate();

    const handleCreateGame = () => {
        console.log('Crear nueva partida');
        navigate('/sala_espera');
    };

    const handleJoinGame = () => {
        console.log('Unirse a la partida');
        navigate('/sala_espera');
    };

    const handleGoBack = () => {
        navigate('/mapas');
    };

    return (
        <div className="lista-espera">
            <Navbar_usuario />
            <h1>Lista de Espera</h1>
            <p>¿Qué deseas hacer?</p>
            <div className="buttons-container">
                <button onClick={handleCreateGame} className="create-button">
                    Crear partida
                </button>
                <button onClick={handleJoinGame} className="join-button">
                    Unirme a partida
                </button>
                <button onClick={handleGoBack} className="back-button">
                    Volver
                </button>
            </div>
        </div>
    );
};

export default ListaEspera;