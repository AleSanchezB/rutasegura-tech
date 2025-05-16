import React, { useState, useEffect } from 'react';

// Suponiendo que puedas necesitar alguna API o información dinámica para el Dashboard
// Aquí haré un ejemplo simple con algunos datos ficticios para ilustrar.

const Dashboard = () => {
  // Simulamos algunos datos que podrían llegar de una API
  const [stats, setStats] = useState({
    totalRoutes: 120,
    totalGPSDevices: 50,
    totalComplaints: 30,
    totalStops: 300,
  });

  useEffect(() => {
    // En un caso real, podrías hacer una llamada a tu API para obtener los datos dinámicos.
    // Ejemplo:
    // fetch('/api/dashboard-stats')
    //   .then(res => res.json())
    //   .then(data => setStats(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Tarjeta para total de rutas */}
      <div className="bg-indigo-500 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-2">Total de Rutas</h3>
        <p className="text-xl">{stats.totalRoutes}</p>
      </div>

      {/* Tarjeta para total de dispositivos GPS */}
      <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-2">Dispositivos GPS Asignados</h3>
        <p className="text-xl">{stats.totalGPSDevices}</p>
      </div>

      {/* Tarjeta para total de quejas */}
      <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-2">Quejas Recibidas</h3>
        <p className="text-xl">{stats.totalComplaints}</p>
      </div>

      {/* Tarjeta para total de paradas */}
      <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-2">Total de Paradas</h3>
        <p className="text-xl">{stats.totalStops}</p>
      </div>
    </div>
  );
};

export default Dashboard;
