import './lista_espera.css';
import Navbar_usuario from '../comun/componentes/Navbar_usuario';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ListaEspera = () => {
    const navigate = useNavigate();
    const [jugadorId, setJugadorId] = useState<string | null>(null);
    const [availableGames, setAvailableGames] = useState<any[]>([]);
    const [selectedGame, setSelectedGame] = useState<any>(null);
    const [showGames, setShowGames] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const crearJugador = async () => {
            try {
                const token = localStorage.getItem('token');
                const usuarioId = localStorage.getItem('usuarioId');
                if (!usuarioId) {
                    alert('No se encontró el usuario actual');
                    return;
                }
                
                if (!localStorage.getItem('jugadorId')) {
                    const response = await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/jugadores`,
                        {
                            colorAsignado: 'rojo',
                            ataquesGanados: 0,
                            ataquesPerdidos: 0,
                            puntosObtenidos: 0,
                            usuarioId: Number(usuarioId)
                        },
                        {
                            headers: token
                                ? { Authorization: `Bearer ${token}` }
                                : undefined,
                        }
                    );
                    localStorage.setItem('jugadorId', response.data.id);
                    setJugadorId(response.data.id);
                } else {
                    setJugadorId(localStorage.getItem('jugadorId'));
                }
            } catch (error) {
                alert('Error al crear el jugador');
            }
        };
        crearJugador();
    }, []);

    const handleCreateGame = async () => {
        if (!jugadorId) {
            alert('Jugador no configurado correctamente');
            return;
        }

        const tipoMapa = localStorage.getItem('tipoMapa');
        setIsLoading(true);
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/partidas/`,
                { jugadorId: Number(jugadorId), tipoMapa },
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                }
            );

            localStorage.setItem('partidaId', response.data.id);
            navigate('/sala_espera');
        } catch (error: any) {
            alert(error.response?.data?.error || 'Error al crear la partida');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAvailableGames = async () => {
        const tipoMapa = localStorage.getItem('tipoMapa');
        setIsLoading(true);
        setShowGames(true);
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/partidas`,
                {
                    params: { tipoMapa },
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                }
            );
            setAvailableGames(response.data);
        } catch (error) {
            alert('Error al obtener partidas disponibles');
        } finally {
            setIsLoading(false);
        }
    };

    const handleJoinGame = async () => {
        if (!selectedGame) {
            alert('Por favor selecciona una partida');
            return;
        }

        const jugadorId = localStorage.getItem('jugadorId');
        if (!jugadorId) {
            alert('No se ha identificado al jugador');
            return;
        }

        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                // Nueva ruta: partidaId y jugadorId en la URL (no en el body)
                `${import.meta.env.VITE_BACKEND_URL}/partidas/${Number(selectedGame.id)}/jugadores/${Number(jugadorId)}`,
                {}, // Body vacío (opcional, si el backend no requiere más datos)
                {
                    headers: token ? { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    } : undefined,
                }
            );

            localStorage.setItem('partidaId', selectedGame.id.toString());
            navigate('/sala_espera');
        } catch (error) {
            console.error('Error al unirse a la partida:', error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    alert('La partida o el jugador no existen. Verifica los datos.');
                } else {
                    alert(error.response?.data?.error || 'Error al unirse a la partida');
                }
            } else {
                alert('Error desconocido');
            }
        } finally {
            setIsLoading(false);
        }
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
                <button 
                    onClick={handleCreateGame} 
                    className="create-button"
                    disabled={isLoading && !showGames}
                >
                    {isLoading && !showGames ? 'Creando...' : 'Crear partida'}
                </button>
                <button 
                    onClick={fetchAvailableGames} 
                    className="join-button"
                    disabled={isLoading}
                >
                    {isLoading && showGames ? 'Cargando...' : 'Unirme a partida'}
                </button>
                <button 
                    onClick={handleGoBack} 
                    className="back-button"
                    disabled={isLoading}
                >
                    Volver
                </button>
            </div>

            {showGames && (
                <div className="games-container">
                    <h3>Partidas Disponibles</h3>
                    
                    {isLoading ? (
                        <p className="loading-message">Buscando partidas...</p>
                    ) : availableGames.length === 0 ? (
                        <p className="loading-message">No hay partidas disponibles</p>
                    ) : (
                        <div className="games-list">
                            {availableGames.map(game => (
                                <div 
                                    key={game.id} 
                                    className={`game-card ${selectedGame?.id === game.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedGame(game)}
                                >
                                    <div className="game-info">
                                        <h3>Partida #{game.id}</h3>
                                        <p>Jugadores: {game.listaEspera?.length || 0}</p>
                                        <p>Mapa: {game.mapa?.tipo || 'Desconocido'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {availableGames.length > 0 && (
                        <button 
                            onClick={handleJoinGame}
                            className="join-button full-width-button"
                            disabled={!selectedGame || isLoading}
                        >
                            {isLoading ? 'Uniendo...' : 'Unirse a Partida Seleccionada'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ListaEspera;