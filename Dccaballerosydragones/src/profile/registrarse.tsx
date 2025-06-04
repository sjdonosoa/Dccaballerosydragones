import React, { useState } from 'react';
import './registrarse.css'; // Archivo CSS para estilos personalizados
import Navbar from '../comun/componentes/Navbar';
import Dragon from '../comun/componentes/Dragon'
import { Link } from 'react-router-dom';
import VolverInicio from '../comun/componentes/Volverinicio';

const Registrarse = () => {
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
        console.log('Datos de registro:', formData);
        // Aquí puedes manejar el envío de datos, como enviarlos a un servidor
    };

    return (
        <div className="registrarse">
            <Navbar />
            <Dragon />
            <div className="form-container">
                <h1>Registrarse</h1>
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
                    <div className="form-group">
                        <label htmlFor="contraseña">Contraseña</label>
                        <input
                            type="password"
                            id="contraseña"
                            name="contraseña"
                            value={formData.contraseña}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Registrarse</button>
                </form>
            </div>
            <VolverInicio />
        </div>
    );
};

export default Registrarse;