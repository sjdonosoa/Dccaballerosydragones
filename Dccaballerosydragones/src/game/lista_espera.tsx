import './lista_espera.css';
import Navbar_usuario from '../comun/componentes/Navbar_usuario';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ListaEspera = () => {
    const navigate = useNavigate();
    const [jugadorId] = useState<string | null>(null);

    useEffect(() => {
        const inicializarJugador = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // 1. Obtener información del usuario autenticado
            const responseUsuario = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/usuarios/me`, 
            {
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            }
            );

            // 2. Crear nuevo jugador asociado al usuario
            const responseCrear = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/jugadores`,
            {
                usuarioId:responseUsuario,
                puntosObtenidos: 0,
                ataquesGanados: 0,
                ataquesPerdidos: 0,
                colorAsignado: 'rojo'
            },
            {
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            }
            );

            localStorage.setItem('jugadorId', responseCrear.data.id);
            return responseCrear.data.id;

        } catch (error) {
            console.error('Error al inicializar jugador:', error);
            
            // Manejo detallado de errores
            if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                alert('Sesión expirada. Por favor inicia sesión nuevamente.');
                localStorage.clear();
                navigate('/login');
            } else {
                alert(`Error del servidor: ${error.response.data?.message || 'Intente nuevamente'}`);
            }
            } else {
            alert('Error de conexión. Verifica tu internet.');
            }
            throw error; // Puedes manejar este error en el componente que llama a esta función
        }
        };

        inicializarJugador();
    }, []);

    const handleCreateGame = async () => {
        const tipoMapa = localStorage.getItem('tipoMapa');
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
            alert('No estás autenticado. Por favor inicia sesión.');
            navigate('/login');
            return;
            }

            if (!jugadorId) {
            alert('No se encontró tu ID de jugador. Intenta recargar la página.');
            return;
            }

            if (!tipoMapa) {
            alert('No se seleccionó tipo de mapa. Vuelve a la pantalla anterior.');
            return;
            }

            // Datos completos para la partida
            const partidaData = {
            jugadorId: Number(jugadorId), // Asegurar que es número
            tipoMapa,
            maxJugadores: 6, // Valor por defecto
            estado: 'en_espera' // Estado inicial
            };

            const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/partidas`,
            partidaData,
            {
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                },
                timeout: 10000 // 10 segundos de timeout
            }
            );

            if (response.data && response.data.partidaId) {
            localStorage.setItem('partidaId', response.data.partidaId);
            localStorage.setItem('esCreador', 'true');
            navigate('/sala_espera');
            } else {
            throw new Error('El servidor no devolvió un ID de partida válido');
            }

        } catch (error) {
            console.error('Error al crear partida:', error);
            
            if (axios.isAxiosError(error)) {
            if (error.response) {
                // Error con respuesta del servidor
                const errorMsg = error.response.data?.error || 
                                error.response.data?.detalle || 
                                'Error al crear partida';
                
                alert(`Error: ${errorMsg}`);
                
                // Si es error de autenticación, redirigir a login
                if (error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
                }
            } else if (error.request) {
                // Error de conexión (sin respuesta)
                alert('No se pudo conectar al servidor. Verifica tu conexión a internet.');
            } else {
                // Error en la configuración de la solicitud
                alert('Error en la configuración de la solicitud');
            }
            } else {
            // Error no relacionado con Axios
            const errMsg = (error instanceof Error) ? error.message : String(error);
            alert('Error inesperado: ' + errMsg);
            }
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