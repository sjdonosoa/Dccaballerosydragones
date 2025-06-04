// filepath: /Users/usuario/Desktop/2025-1/Web/Grupo5_front_s2/Dccaballerosydragones/src/comun/components/Navbar.tsx
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '/src/assets/images/logo.png'
import userIcon from '/src/assets/images/User.png'; // Assuming you have a user icon image

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
                <div className="navbar-profile">
                <Link to="/perfil">
                    <img src={userIcon} alt="Perfil" className="user-icon" />
                </Link>
            </div>
            </ul>
        </nav>
    );
};

export default Navbar;