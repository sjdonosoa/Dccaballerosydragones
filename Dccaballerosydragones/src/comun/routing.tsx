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
import SalaEspera from '../game/sala_espera';
import Partida from '../game/partida';
import Ranking from '../game/ranking';
import FinalPartida from '../game/final_partida';


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
                    <Route path="/sala_espera" element={<SalaEspera />} />
                    <Route path="/partida" element={<Partida />} />
                    <Route path="/ranking" element={<Ranking />} />
                    <Route path="/final_partida" element={<FinalPartida />} />


                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default Routing;