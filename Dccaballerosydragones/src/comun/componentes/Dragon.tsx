
import './Dragon.css'; // Archivo CSS para los estilos del dragón
import dragonImage from '/src/assets/images/dragon.png'; // Ruta de la imagen del dragón

const Dragon = () => {
    return (
        <div className="corner-image">
            <img src={dragonImage} alt="Dragón decorativo" />
        </div>
    );
};

export default Dragon;