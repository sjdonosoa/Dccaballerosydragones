import { useState } from 'react'
import './App.css'
import Navbar from './componentes/Navbar'
import Dragon from './componentes/Dragon'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <h1>Dccaballeros y dragones</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

      </div>
      <Dragon />
    </>
  )
}

export default App
