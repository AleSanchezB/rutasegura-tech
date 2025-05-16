import React, { useState } from 'react';
import MapWithRoute from '../components/MapWithRoute';
import Sidebar from '../components/Sidebar';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const AdminUNEManual = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <h1 className="center text-2xl font-bold mb-4">Pagina de Rutas</h1>

          <MapWithRoute />

          <ol className="list-decimal ml-6 space-y-4 mt-6 text-gray-700">
            <li>Haz clic en el mapa para agregar paradas intermedias.</li>
            <li>Haz clic derecho en una parada para eliminarla.</li>
            <li>Puedes cambiar el origen y destino con los campos superiores.</li>
            <li>Presiona "Limpiar Paradas" para comenzar desde cero.</li>
          </ol>
        </main>
      </div>
    </div>
  );
};

export default AdminUNEManual;
