import { useState } from 'react'
import './App.css'
import { useAuth } from './AuthContext'; // Importa el contexto de autenticación
import Navbar_usuario from './componentes/NavBar_Usuario';
import Navbar from './componentes/Navbar'
import Dragon from './componentes/Dragon'
import Caballero from './componentes/Caballero'

function App() {
  const [count, setCount] = useState(0)
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? <Navbar_usuario /> : <Navbar />}
      <h1>Dccaballeros y dragones</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

      </div>
      <Dragon />
      <Caballero />
    </>
  )
}

export default App;
