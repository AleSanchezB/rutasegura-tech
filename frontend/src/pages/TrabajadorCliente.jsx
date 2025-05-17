import React, { useState } from 'react';
import { useUser } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import { MenuIcon } from '@heroicons/react/outline';
import rutas from '../data/rutas.jsx';

const TrabajadorCliente = () => {
  const { user } = useUser();
      const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fecha, setFecha] = useState('');
  const [ruta, setRuta] = useState('');
  const [registros, setRegistros] = useState([]);
  const [error, setError] = useState('');

  const handleBuscar = () => {
    const rutasSimuladas = rutas;

    const resultados = rutasSimuladas.filter(
      (r) => r.ruta === ruta && r.fecha === fecha
    );

    if (resultados.length > 0) {
      setRegistros(resultados[0].paradas);
      setError('');
    } else {
      setRegistros([]);
      if (!rutasSimuladas.some((r) => r.ruta === ruta)) {
        setError('Ruta no encontrada');
      } else {
        setError('No hay registros disponibles');
      }
    }
  };

  const handleDescargarCSV = () => {
    if (!registros.length) return;

    const filas = [['Parada', 'Hora']];
    registros.forEach((r) => filas.push([r.nombre, r.hora]));

    const contenidoCSV = filas.map((f) => f.join(',')).join('\n');
    const blob = new Blob([contenidoCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `registros_ruta_${ruta}_${fecha}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barra lateral y menú */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Botón para abrir el sidebar (solo si está cerrado) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 text-gray-600 hover:text-indigo-600 bg-white shadow p-2 rounded-full focus:outline-none lg:block"
          aria-label="Abrir menú"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      )}

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-800">Panel del Trabajador</h1>
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium">
              {user?.first_name} {user?.last_name}
            </span>
            <img
              src="https://previews.123rf.com/images/illustratiostock/illustratiostock2112/illustratiostock211200635/179843524-avatar-aislado-de-una-raza-de-perro-bulldog-ilustraci%C3%B3n-vectorial.jpg"
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-indigo-500"
            />
          </div>
        </header>

        {/* Contenido principal */}
          <main className="flex-1 p-10 overflow-y-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Bienvenido, {user?.first_name}</h2>

          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Consultar Registros de Transporte
            </h2>

            {/* Formulario */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Ruta</label>
                <input
                  type="text"
                  placeholder="Ej. Ruta 1"
                  value={ruta}
                  onChange={(e) => setRuta(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                onClick={handleBuscar}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
              >
                Buscar
              </button>
            </div>

            {/* Resultado */}
            {error && <p className="text-red-500 font-medium">{error}</p>}

            {registros.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Resultado</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-800">
                  {registros.map((p, i) => (
                    <li key={i}>
                      <span className="font-medium">{p.nombre}:</span> {p.hora}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleDescargarCSV}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
                >
                  Descargar CSV
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrabajadorCliente;
