import './lista_espera.css';
import Navbar_usuario from '../comun/componentes/Navbar_usuario';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ListaEspera = () => {
    const navigate = useNavigate();
    const [jugadorId, setJugadorId] = useState<string | null>(null);

    useEffect(() => {
        const crearJugador = async () => {
            try {
                const token = localStorage.getItem('token');
                const usuarioId = localStorage.getItem('usuarioId'); // Debes guardar esto al iniciar sesión
                if (!usuarioId) {
                    alert('No se encontró el usuario actual');
                    return;
                }
                // Crea el jugador solo si no existe ya en localStorage
                if (!localStorage.getItem('jugadorId')) {
                    const response = await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/jugadores`,
                        { usuarioId },
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
        const tipoMapa = localStorage.getItem('tipoMapa');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/partidas/`,
                { jugadorId, tipoMapa },
                {
                    headers: token
                        ? { Authorization: `Bearer ${token}` }
                        : undefined,
                }

            );
            localStorage.setItem('partidaId', response.data.id);
            navigate('/sala_espera');
        } catch (error) {
            alert('Error al crear la partida');
        }
    };

    const handleJoinGame = async () => {
        const tipoMapa = localStorage.getItem('tipoMapa');
        try {
            const token = localStorage.getItem('token');
            const partidaDisponible = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/partidas/disponible`,
                {
                    params: { tipoMapa },
                    headers: token
                        ? { Authorization: `Bearer ${token}` }
                        : undefined,
                }
            );
            const partidaId = partidaDisponible.data.partidaId;
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/partidas/${partidaId}/jugadores/${jugadorId}`,
                {},
                {
                    headers: token
                        ? { Authorization: `Bearer ${token}` }
                        : undefined,
                }
            );
            navigate('/sala_espera');
        } catch (error) {
            alert('Error al unirse a la partida');
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