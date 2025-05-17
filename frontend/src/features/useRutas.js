// src/hooks/useRutas.js
import { useEffect, useState } from 'react';
import { getAllRoutesRequest, getRoutesByIdRequest } from '../services/routeService';

export const useRutas = () => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
          const response = await getAllRoutesRequest();
          setRutas(response.data);
      } catch (err) {
        setError('Error al cargar rutas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRutas();
  }, []);

  return { rutas, loading, error };
};
