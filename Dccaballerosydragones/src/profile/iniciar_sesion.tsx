import React, { useState } from 'react';
import './iniciar_sesion.css';
import Navbar from '../comun/componentes/Navbar';
import Dragon from '../comun/componentes/Dragon';
import { Link, useNavigate } from 'react-router-dom';
import VolverInicio from '../comun/componentes/Volverinicio';
import axios from 'axios';
import { useAuth } from '../comun/AuthContext';

function IniciarSesion() {
    const [formData, setFormData] = useState({
        email: '',
        contrasena: '' // Cambiado a "contrasena" para coincidir con el backend
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/login`,
                {
                    email: formData.email,
                    contrasena: formData.contrasena
                }
            );

            // Guardar el token en localStorage
            localStorage.setItem('token', response.data.access_token);
            // Guardar el usuarioId en localStorage
            localStorage.setItem('usuarioId', response.data.usuarioId);
            // Actualizar el estado de autenticación en el contexto
            await login(formData.email, formData.contrasena);
            // Redirigir al usuario después del login exitoso
            navigate('/');

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data.error || 'Credenciales incorrectas');
                } else {
                    setError('Error de conexión con el servidor');
                }
            } else {
                setError('Ocurrió un error inesperado');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="iniciar-sesion">
            <Navbar />
            <Dragon/>
            <div className="form-container">
                <h1>Iniciar Sesión</h1>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contrasena">Contraseña</label>
                        <input
                            type="password"
                            id="contrasena"
                            name="contrasena"
                            value={formData.contrasena}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                    <p className="register-link">
                        ¿No tienes cuenta? <Link to="/registrarse">Regístrate aquí</Link>
                    </p>
                </form>
            </div>
            <VolverInicio />
        </div>
    );
}

export default IniciarSesion;