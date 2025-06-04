// filepath: /Users/usuario/Desktop/2025-1/Web/Grupo5_front_s2/Dccaballerosydragones/src/comun/routing.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Instructions from '../game/instructions'
import App from './App'
import IniciarSesion from '../profile/iniciar_sesion';
import Registrarse from '../profile/registrarse';
import Juego from '../game/juego';
import Mapas from '../game/mapas';
import ListaEspera from '../game/lista_espera';


function Routing() {
    return (
        <AuthProvider> {/* Envuelve toda la aplicación con el AuthProvider */}
            <BrowserRouter>
                <Routes>
                    <Route path= "/instructions" element ={<Instructions/>} />
                    <Route path= "/" element ={<App/>} />
                    <Route path= '/iniciar_sesion' element ={<IniciarSesion/>} />
                    <Route path= '/registrarse' element ={<Registrarse/>}/>
                    <Route path= 'juego' element ={<Juego/>} />
                    <Route path= '/mapas' element ={<Mapas/>} />
                    <Route path= '/lista_espera' element={<ListaEspera/>} />


                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default Routing;