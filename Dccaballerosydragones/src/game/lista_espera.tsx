import React from 'react';
import './lista_espera.css'; // Archivo CSS para estilos personalizados
import Navbar_usuario from '../comun/componentes/NavBar_Usuario';
import { useNavigate } from 'react-router-dom'; // Hook para manejar la navegación

const ListaEspera = () => {
    const navigate = useNavigate(); // Hook para manejar la navegación

    const handleJoinGame = () => {
        console.log('Unirse a la partida');
        // Aquí puedes manejar la lógica para unirse a la partida
    };

    const handleGoBack = () => {
        navigate(-1); // Navega a la página anterior
    };

    return (
        <div className="lista-espera">
            <Navbar_usuario />
            <h1>Lista de Espera</h1>
            <p>Esperando a otros jugadores para iniciar la partida...</p>
            <div className="buttons-container">
                <button onClick={handleJoinGame} className="join-button">
                    Unirme a la partida
                </button>
                <button onClick={handleGoBack} className="back-button">
                    Volver
                </button>
            </div>
        </div>
    );
};

export default ListaEspera;