import { useEffect, useState } from 'react';
import './ranking.css';
import { useAuth } from '../comun/AuthContext';
import Navbar_usuario from '../comun/componentes/Navbar_usuario';
import Navbar from '../comun/componentes/Navbar';
import Dragon from '../comun/componentes/Dragon';
import Caballero from '../comun/componentes/Caballero';
import VolverInicio from '../comun/componentes/Volverinicio';
import axios from 'axios';

interface UsuarioRanking {
  nombre: string;
  puntajeTotal: number;
}

const Ranking = () => {
  const { isAuthenticated } = useAuth();
  const [rankingData, setRankingData] = useState<UsuarioRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/ranking`,
          {
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : undefined,
          }
        );
        setRankingData(response.data);
      } catch (err) {
        setError('Error al obtener el ranking');
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="ranking-container">
      {isAuthenticated ? <Navbar_usuario /> : <Navbar />}
      <Dragon />
      <Caballero />
      <h1 className="ranking-title">Ranking</h1>
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table className="ranking-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Puntaje Total</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map((item, index) => (
              <tr key={index}>
                <td>
                  {index === 0 ? <span className="crown">👑</span> : null}
                  {item.nombre}
                </td>
                <td>{item.puntajeTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <VolverInicio />
    </div>
  );
};

export default Ranking;