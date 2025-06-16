//import { useState } from 'react'
import './App.css'
import { useAuth } from './AuthContext'; // Importa el contexto de autenticación
import Navbar_usuario from './componentes/Navbar_usuario';
import Navbar from './componentes/Navbar'
import Dragon from './componentes/Dragon'
import Caballero from './componentes/Caballero'
import Ranking from '../game/ranking';
import FinalPartida from '../game/final_partida';

function App() {
  //const [count, setCount] = useState(0)
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? <Navbar_usuario /> : <Navbar />}
      <h1>Dccaballeros y dragones</h1>
      <div className="card">


      </div>
      <Dragon />
      <Caballero />
      <Ranking />
      <FinalPartida />
    </>
  )
}

export default App;
