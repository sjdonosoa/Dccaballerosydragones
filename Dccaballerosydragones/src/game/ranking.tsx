import React from 'react';
import './ranking.css';
import { useAuth } from '../comun/AuthContext';
import Navbar_usuario from '../comun/componentes/Navbar_usuario';
import Navbar from '../comun/componentes/Navbar';
import Dragon from '../comun/componentes/Dragon';
import Caballero from '../comun/componentes/Caballero';
import VolverInicio from '../comun/componentes/Volverinicio';

const rankingData = [
  { usuario: 'isidora123', puntos: 4, exito: '70%' },
  { usuario: 'samueldon12', puntos: 3, exito: '65%' },
  { usuario: 'bengrassi23', puntos: 2, exito: '52%' },
  { usuario: 'dragon234', puntos: 1, exito: '20%' },
  { usuario: 'guerrero 5', puntos: 1, exito: '37%' },
  { usuario: 'guerrero 6', puntos: 0, exito: '10%' },
];

const Ranking = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="ranking-container">
      {isAuthenticated ? <Navbar_usuario /> : <Navbar />}
      <Dragon />
      <Caballero />
      <h1 className="ranking-title">Ranking</h1>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Puntos Reales</th>
            <th>Tasa de Éxito de Conquista</th>
          </tr>
        </thead>
        <tbody>
          {rankingData.map((item, index) => (
            <tr key={index}>
              <td>
                {index === 0 ? <span className="crown">👑</span> : null}
                {item.usuario}
              </td>
              <td>{item.puntos}</td>
              <td>{item.exito}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <VolverInicio />
    </div>
  );
};

export default Ranking;
