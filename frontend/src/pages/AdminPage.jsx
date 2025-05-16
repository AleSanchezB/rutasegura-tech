import React, { useState } from 'react';
import { useUser } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import { MenuIcon } from '@heroicons/react/outline';

const AdministradorUNE = () => {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Estados para la gestión de rutas, dispositivos y quejas
  const [ruta, setRuta] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [paradas, setParadas] = useState([]);
  const [dispositivoGPS, setDispositivoGPS] = useState('');
  const [registros, setRegistros] = useState([]);
  const [error, setError] = useState('');
  const [queja, setQueja] = useState('');
  const [resultadosQueja, setResultadosQueja] = useState([]);

  // Simulación de datos
  const rutasSimuladas = [
    {
      ruta: 'Ruta 1',
      fecha: '2025-05-10',
      paradas: [
        { nombre: 'Parada 1', hora: '08:00 AM' },
        { nombre: 'Parada 2', hora: '08:30 AM' },
        { nombre: 'Parada 3', hora: '09:00 AM' },
      ],
        quejas: [
        { parada: 'Parada 1', descripcion: 'El camión llegó tarde.' },
        { parada: 'Parada 2', descripcion: 'El camión no se detuvo.' },
      ],
    },
    {
      ruta: 'Ruta 2',
      fecha: '2025-05-10',
      paradas: [
        { nombre: 'Parada A', hora: '09:00 AM' },
        { nombre: 'Parada B', hora: '09:30 AM' },
        { nombre: 'Parada C', hora: '10:00 AM' },
      ],
       quejas: [
        { parada: 'Parada A', descripcion: 'El servicio fue muy lento.' },
      ],
      
    },
  ];

  // Funciones de acciones
  const handleBuscarRecorridos = () => {
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

  const handleConfigurarRuta = () => {
    // Validación de horas
    const regexHora = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!regexHora.test(horaInicio) || !regexHora.test(horaFin)) {
      setError('Formato de hora incorrecto');
      return;
    }

    // Registrar la ruta
    const nuevaRuta = {
      ruta,
      horaInicio,
      horaFin,
      paradas,
    };

    // Aquí se agregaría la lógica de guardado de la ruta en la base de datos
    console.log('Ruta configurada:', nuevaRuta);

    setError('');
    alert('Ruta configurada correctamente.');
  };

  const handleAsignarDispositivo = () => {
    if (dispositivoGPS) {
      // Lógica de validación y asignación de dispositivo GPS
      console.log(`Dispositivo GPS ${dispositivoGPS} asignado a la ruta ${ruta}`);
      setError('');
      alert('Dispositivo GPS asignado correctamente.');
    } else {
      setError('Por favor ingrese un dispositivo GPS válido');
    }
  };

  const handleBuscarQueja = () => {
    // Aquí, según los datos de quejas, simulamos la búsqueda de registros
    const registrosQueja = rutasSimuladas.filter(
      (r) => r.ruta === ruta && r.paradas.some(p => p.nombre.includes(queja))
    );

    if (registrosQueja.length > 0) {
      setResultadosQueja(registrosQueja);
      setError('');
    } else {
      setResultadosQueja([]);
      setError('No se encontraron registros de queja para esa parada.');
    }
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
          <h1 className="text-xl font-bold text-gray-800">Panel del Administrador de UNE</h1>
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
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Administrar Rutas y Dispositivos GPS
            </h2>

            {/* Configurar Ruta */}
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-700">Configurar Ruta y Horarios</h3>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Ruta</label>
                <input
                  type="text"
                  value={ruta}
                  onChange={(e) => setRuta(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Hora de Inicio</label>
                <input
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Hora de Fin</label>
                <input
                  type="time"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Paradas</label>
                <input
                  type="text"
                  placeholder="Agregar parada"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      setParadas([...paradas, e.target.value]);
                      e.target.value = '';
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ul className="mt-2 list-disc pl-6">
                  {paradas.map((parada, index) => (
                    <li key={index} className="text-gray-600">{parada}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleConfigurarRuta}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
              >
                Configurar Ruta
              </button>
            </div>

            {/* Asignación de Dispositivo GPS */}
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-700">Asignar Dispositivo GPS</h3>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Dispositivo GPS</label>
                <input
                  type="text"
                  placeholder="ID Dispositivo GPS"
                  value={dispositivoGPS}
                  onChange={(e) => setDispositivoGPS(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                onClick={handleAsignarDispositivo}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
              >
                Asignar Dispositivo
              </button>
            </div>

            {/* Buscar Queja */}
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-700">Atender Quejas</h3>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Parada para verificar</label>
                <input
                  type="text"
                  value={queja}
                  onChange={(e) => setQueja(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                onClick={handleBuscarQueja}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded-md"
              >
                Buscar Queja
              </button>
            </div>

            {/* Resultados de Queja */}
            {resultadosQueja.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Registros de Queja</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-800">
                  {resultadosQueja.map((r, i) => (
                    <li key={i}>
                      <span className="font-medium">{r.ruta}:</span> {r.paradas.map((p) => p.nombre).join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mostrar errores */}
            {error && <p className="text-red-500 font-medium mt-4">{error}</p>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdministradorUNE;
