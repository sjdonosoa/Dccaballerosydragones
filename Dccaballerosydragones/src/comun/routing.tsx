// filepath: /Users/usuario/Desktop/2025-1/Web/Grupo5_front_s2/Dccaballerosydragones/src/comun/routing.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Instructions from '../game/instructions'
import App from './App'


function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path= "/instructions" element ={<Instructions/>} />
                <Route path= "/" element ={<App/>} />


            </Routes>
        </BrowserRouter>
    );
}

export default Routing;