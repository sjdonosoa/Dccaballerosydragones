import React, { useState } from 'react';
import './iniciar_sesion.css'; // Archivo CSS para estilos personalizados
import Navbar from '../comun/componentes/Navbar';
import Dragon from '../comun/componentes/Dragon'
import { Link } from 'react-router-dom';
import VolverInicio from '../comun/componentes/Volverinicio';

const IniciarSesion = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        contraseña: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Datos enviados:', formData);
        // Aquí puedes manejar el envío de datos, como enviarlos a un servidor
    };

    return (
        <div className="iniciar-sesion">
            <Navbar />
            <Dragon/>
            <div className="form-container">
                <h1>Iniciar Sesión</h1>
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
                        />
                    </div>
                    <button type="submit" className="submit-button">Iniciar Sesión</button>
                    <p className="register-link">
                        <Link to="/registrarse" className="submit-button">Regístrate aquí</Link>
                    </p>
                </form>
                
            </div>
            <VolverInicio />
        </div>
        
    );
};

export default IniciarSesion;