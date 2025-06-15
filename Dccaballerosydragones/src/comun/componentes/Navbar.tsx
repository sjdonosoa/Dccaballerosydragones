// filepath: /Users/usuario/Desktop/2025-1/Web/Grupo5_front_s2/Dccaballerosydragones/src/comun/components/Navbar.tsx
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '/src/assets/images/logo.png'

const Navbar = () => {
    return (
        <nav className="navbar">
            
            <ul>
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>
                <li>
                    <Link to="/instructions">Instrucciones</Link>
                </li>
                <li>
                    <Link to="/juego">Juego</Link>
                </li>
                <li>
                    <Link to="/ranking">Ranking</Link>
                </li>
                <li>
                    <Link to="/iniciar_sesion">Iniciar Sesión </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;