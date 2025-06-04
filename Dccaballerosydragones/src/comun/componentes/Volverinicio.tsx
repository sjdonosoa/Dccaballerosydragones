
import { Link } from 'react-router-dom';
import './Volverinicio.css'; // Archivo CSS para estilos personalizados

const VolverInicio = () => {
    return (
        <Link to="/" className="back-button">
            Volver al Inicio
        </Link>
    );
};

export default VolverInicio;