import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Define el tipo del contexto
interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    token: string | null;
    setToken: (value: string | null) => void;
    login: (email: string, contrasena: string) => Promise<void>;
    register: (email: string, contrasena: string) => Promise<void>; // Nueva función para registro
}

// Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    // Función para manejar el inicio de sesión
    const login = async (email: string, contrasena: string) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                email,
                contrasena,
            });

            // Actualiza el estado de autenticación y el token
            setIsAuthenticated(true);
            setToken(response.data.access_token);

            // Guarda el token en localStorage
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('usuarioId', response.data.usuarioId);
        } catch (error) {
            throw error; // Propaga el error para manejarlo en el componente
        }
    };

    // Función para manejar el registro de usuarios
    const register = async (email: string, contrasena: string) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
                email,
                contrasena,
            });

            // Actualiza el estado de autenticación y el token después del registro
            setIsAuthenticated(true);
            setToken(response.data.access_token);

            // Guarda el token en localStorage
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('usuarioId', response.data.usuarioId);
        } catch (error) {
            throw error; // Propaga el error para manejarlo en el componente
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};