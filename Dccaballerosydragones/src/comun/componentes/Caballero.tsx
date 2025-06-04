
import './Caballero.css'; // Archivo CSS para estilos personalizados
import caballeroImage from '/src/assets/images/caballero.png'; // Ruta de la imagen

const Caballero = () => {
    return (
        <div className="caballero-container">
            <img src={caballeroImage} alt="Caballero" className="caballero-image" />
        </div>
    );
};

export default Caballero;