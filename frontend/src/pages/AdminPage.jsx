import React, { useState } from 'react';
import MapWithRoute from '../components/MapWithRoute';
import Sidebar from '../components/Sidebar';
import { MenuIcon, XIcon } from '@heroicons/react/outline'; // Asegúrate de tener heroicons instalado

const AdminUNEManual = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Topbar para móviles */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 focus:outline-none"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Manual UNE</h1>
        </div>

        {/* Contenido principal */}
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Pagina de Administrador</h1>

          <MapWithRoute />

          {/* Aquí continúan los puntos del manual */}
          <ol className="list-decimal ml-6 space-y-4 mt-6">
            <li>Haz clic en el mapa para agregar paradas intermedias.</li>
            <li>Haz clic derecho en una parada para eliminarla.</li>
            <li>Puedes cambiar el origen y destino con los campos superiores.</li>
            <li>Presiona "Limpiar Paradas" para comenzar desde cero.</li>
            {/* Agrega más pasos si es necesario */}
          </ol>
        </main>
      </div>
    </div>
  );
};

export default AdminUNEManual;
