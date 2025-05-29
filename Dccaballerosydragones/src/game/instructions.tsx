import './instructions.css';
import Navbar from '../comun/componentes/Navbar'
import Dragon from '../comun/componentes/Dragon'

export default function Instructions() {
    return (
        
        <div>
            <Navbar />
            <Dragon />
            <h1>Instrucciones del juego</h1>
            <p>Bienvenido a las instrucciones del juego.</p>
        </div>
    );
}