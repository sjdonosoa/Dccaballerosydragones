import React, { useState } from 'react';
import { useAuth } from '../comun/AuthContext'; 
import Navbar_usuario from '../comun/componentes/NavBar_Usuario';
import Navbar from '../comun/componentes/Navbar';
import Dragon from '../comun/componentes/Dragon';
import './juego.css'; 
import VolverInicio from '../comun/componentes/Volverinicio';
import { Link } from 'react-router-dom';

const Juego = () => {
    // Simula si el usuario está registrado (puedes reemplazar esto con datos reales más adelante)
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    // Function to toggle authentication state
    const toggleAuthentication = () => {
        setIsAuthenticated(!isAuthenticated); // Cambia directamente el valor booleano
    };

    return (
        <div className="juego">
            {/* Navbar cambia según el estado de autenticación */}
            {isAuthenticated ? <Navbar_usuario /> : <Navbar />}
            <Dragon />
            <div className="content">
                        <button onClick={toggleAuthentication} className="auth-button">
                            Cambiar estado de autenticación
                        </button>
                {isAuthenticated ? (
                    <>
                        <h1>Juego con usuario</h1>
                        <p>Bienvenido al juego, usuario registrado.</p>
                        <Link to="/mapas" className="game-button">Jugar</Link>
                    </>
                ) : (
                    <>
                        <h1>Juego sin usuario</h1>
                        <p>Estás jugando como invitado. Algunas funciones pueden estar limitadas.</p>
                        <Link to="/registrarse" className="submit-button">Regístrate aquí</Link>
                        <Link to="/iniciar_sesion" className="submit-button">Iniciar Sesión</Link>
                    </>
                )}
                <VolverInicio />
            </div>
        </div>
    );
};

export default Juego;