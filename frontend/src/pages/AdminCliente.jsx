import React, { useState } from 'react';
import MapWithRoute from '../components/MapWithRoute';
import Sidebar from '../components/Sidebar';
import { MenuIcon } from '@heroicons/react/outline';
import { useUser } from '../contexts/AuthContext';

const AdminCliente = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('real-time');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Estados para búsqueda
  const [searchDate, setSearchDate] = useState('');
  const [searchUnit, setSearchUnit] = useState('');
  const [searchRoute, setSearchRoute] = useState('');
  const [searchTransportDate, setSearchTransportDate] = useState('');
  const [searchTransportUnit, setSearchTransportUnit] = useState('');
  const [historicalRoutes, setHistoricalRoutes] = useState([]);
  const [transportRecords, setTransportRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownloadCSV = () => {
    const data = [
      ['ID', 'Ruta', 'Origen', 'Destino', 'Fecha'],
      [1, 'Ruta 1', 'Plaza Zaragoza', 'Galerías Mall', '2025-05-15'],
      [2, 'Ruta 2', 'Avenida Norte', 'Centro Histórico', '2025-05-15'],
    ];

    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'informacion_rutas.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSearchHistoricalRoutes = () => {
    const simulatedRoutes = [
      { route: 'Ruta 1', unit: 'Unidad A', date: '2025-05-10', stopTimes: ['08:00 AM', '08:30 AM', '09:00 AM'] },
      { route: 'Ruta 2', unit: 'Unidad B', date: '2025-05-12', stopTimes: ['09:00 AM', '09:30 AM', '10:00 AM'] },
    ];

    const filteredRoutes = simulatedRoutes.filter(route => {
      const matchDate = searchDate ? route.date === searchDate : true;
      const matchUnit = searchUnit ? route.unit.includes(searchUnit) : true;
      const matchRoute = searchRoute ? route.route.includes(searchRoute) : true;
      return matchDate && matchUnit && matchRoute;
    });

    if (filteredRoutes.length > 0) {
      setHistoricalRoutes(filteredRoutes);
      setErrorMessage('');
    } else {
      setHistoricalRoutes([]);
      setErrorMessage('No se encontraron resultados.');
    }
  };

  const handleSearchTransportRecords = () => {
    const simulatedRecords = [
      {
        unit: 'Unidad A',
        date: '2025-05-10',
        stops: [
          { stop: 'Parada 1', time: '08:00 AM', gpsData: true },
          { stop: 'Parada 2', time: '08:30 AM', gpsData: true },
          { stop: 'Parada 3', time: '09:00 AM', gpsData: false },
        ],
      },
      {
        unit: 'Unidad B',
        date: '2025-05-12',
        stops: [
          { stop: 'Parada 1', time: '09:00 AM', gpsData: true },
          { stop: 'Parada 2', time: '09:30 AM', gpsData: true },
        ],
      },
    ];

    const filtered = simulatedRecords.filter(record => {
      const matchDate = searchTransportDate ? record.date === searchTransportDate : true;
      const matchUnit = searchTransportUnit ? record.unit.includes(searchTransportUnit) : true;
      return matchDate && matchUnit;
    });

    if (filtered.length > 0) {
      filtered.forEach(record => {
        record.stops.sort((a, b) => {
          const timeA = new Date(`1970-01-01T${a.time}`);
          const timeB = new Date(`1970-01-01T${b.time}`);
          return timeA - timeB;
        });
      });

      setTransportRecords(filtered);
      setErrorMessage('');
    } else {
      setTransportRecords([]);
      setErrorMessage('No se encontraron resultados.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 text-gray-600 hover:text-indigo-600 bg-white shadow p-2 rounded-full"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow flex items-center justify-between px-6 py-4">
          <div className="ml-auto flex items-center space-x-3">
            <span className="text-gray-800 font-medium">{user?.first_name} {user?.last_name}</span>
            <img
              src="https://previews.123rf.com/images/illustratiostock/illustratiostock2112/illustratiostock211200635/179843524-avatar-aislado-de-una-raza-de-perro-bulldog-ilustraci%C3%B3n-vectorial.jpg"
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-indigo-500"
            />
          </div>
        </header>

        <main className="flex-1 p-10 overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Bienvenido, {user?.first_name}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md cursor-pointer" onClick={() => setActiveTab('real-time')}>
              <h3 className="text-xl font-bold">Consultar Rutas en Tiempo Real</h3>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-md cursor-pointer" onClick={() => setActiveTab('check-stops')}>
              <h3 className="text-xl font-bold">Verificar Paso por Paradas</h3>
            </div>
            <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md cursor-pointer" onClick={() => setActiveTab('transport-records')}>
              <h3 className="text-xl font-bold">Consultar Registros de Transporte</h3>
            </div>
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-md cursor-pointer" onClick={() => setActiveTab('download-info')}>
              <h3 className="text-xl font-bold">Descargar Información</h3>
            </div>
          </div>

          {/* Contenido por sección */}
          {activeTab === 'real-time' && <MapWithRoute />}

          {activeTab === 'check-stops' && (
            <div>
              <h3 className="text-xl font-bold mb-2">Verificar Paso por Paradas</h3>
              <div className="mb-4">
                <input type="date" value={searchDate} onChange={e => setSearchDate(e.target.value)} className="p-2 border rounded-md mr-2" />
                <input type="text" placeholder="Unidad" value={searchUnit} onChange={e => setSearchUnit(e.target.value)} className="p-2 border rounded-md mr-2" />
                <input type="text" placeholder="Ruta" value={searchRoute} onChange={e => setSearchRoute(e.target.value)} className="p-2 border rounded-md" />
                <button onClick={handleSearchHistoricalRoutes} className="bg-blue-600 text-white p-2 rounded-md ml-4">Buscar</button>
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              {historicalRoutes.map((route, idx) => (
                <div key={idx} className="mb-4">
                  <h4 className="text-lg font-semibold">{route.route} - {route.unit} ({route.date})</h4>
                  <ul className="list-disc pl-5">
                    {route.stopTimes.map((time, i) => (
                      <li key={i}>Parada {i + 1}: {time}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'transport-records' && (
            <div>
              <h3 className="text-xl font-bold mb-2">Consultar Registros de Transporte</h3>
              <div className="mb-4">
                <input type="date" value={searchTransportDate} onChange={e => setSearchTransportDate(e.target.value)} className="p-2 border rounded-md mr-2" />
                <input type="text" placeholder="Unidad" value={searchTransportUnit} onChange={e => setSearchTransportUnit(e.target.value)} className="p-2 border rounded-md mr-2" />
                <button onClick={handleSearchTransportRecords} className="bg-blue-600 text-white p-2 rounded-md ml-4">Buscar</button>
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              {transportRecords.map((record, idx) => (
                <div key={idx} className="mb-4">
                  <h4 className="text-lg font-semibold">{record.unit} - {record.date}</h4>
                  <ul className="list-disc pl-5">
                    {record.stops.map((stop, i) => (
                      <li key={i}>
                        {stop.stop}: {stop.time}
                        {!stop.gpsData && <span className="text-red-500"> (Datos incompletos)</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'download-info' && (
            <div>
              <h3 className="text-xl font-bold mb-2">Descargar Información</h3>
              <button onClick={handleDownloadCSV} className="bg-green-600 text-white px-4 py-2 rounded-md">
                Descargar CSV
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminCliente;
