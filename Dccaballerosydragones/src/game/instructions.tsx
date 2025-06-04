import './instructions.css';
import Navbar from '../comun/componentes/Navbar'
import Dragon from '../comun/componentes/Dragon'
import VolverInicio from '../comun/componentes/Volverinicio';
import { useAuth } from '../comun/AuthContext'; // Importa el contexto de autenticación
import Navbar_usuario from '../comun/componentes/NavBar_Usuario';

export default function Instructions() {
    const { isAuthenticated } = useAuth();
    return (
        
        <div>
            {isAuthenticated ? <Navbar_usuario /> : <Navbar />}
            <Dragon />
            <h1>Instrucciones del juego</h1>
            <p>Bienvenido a las instrucciones del juego.</p>
            <VolverInicio />
        </div>
    );
}