import React, { useState } from 'react';
import './registrarse.css';
import Navbar from '../comun/componentes/Navbar';
import Dragon from '../comun/componentes/Dragon';
import { Link, useNavigate } from 'react-router-dom';
import VolverInicio from '../comun/componentes/Volverinicio';
import axios from 'axios';
import { useAuth } from '../comun/AuthContext'; 

const Registrarse = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        contrasena: '', // Cambiado a "contrasena" para coincidir con el backend
    });
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/signup`,
                {
                    nombre: formData.nombre,
                    email: formData.email,
                    contrasena: formData.contrasena
                }
            );
            
            // Registro exitoso
            setSuccess(true);
            console.log('Registro exitoso:', response.data);

            // Usa la función register del contexto para actualizar el estado global
            await register(formData.email, formData.contrasena);
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                navigate('/iniciar_sesion');
            }, 2000);
            
        } catch (err: any) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.error || 'Error al registrarse');
            } else {
                setError('Error de conexión con el servidor');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registrarse">
            <Navbar />
            <Dragon />
            <div className="form-container">
                <h1>Registrarse</h1>
                
                {error && <div className="error-message">{error}</div>}
                {success && (
                    <div className="success-message">
                        ¡Registro exitoso! Redirigiendo al inicio de sesión...
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            disabled={loading || success}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading || success}
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
                            disabled={loading || success}
                        />
                        <small className="password-hint">
                            La contraseña debe tener entre 8-20 caracteres, al menos una letra y un número
                        </small>
                    </div>
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading || success}
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
                
                <p className="login-link">
                    ¿Ya tienes una cuenta? <Link to="/iniciar_sesion">Inicia sesión aquí</Link>
                </p>
            </div>
            <VolverInicio />
        </div>
    );
};

export default Registrarse;