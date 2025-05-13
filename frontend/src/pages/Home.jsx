import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react'; // O usa texto "≡" si no tienes el icono

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = {
    name: "Alejandro Sánchez",
    avatar: "https://ui-avatars.com/api/?name=Alejandro+Sanchez&background=4f46e5&color=fff",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow flex items-center justify-between px-6 py-4 relative">
          {/* Botón hamburguesa en móvil */}
          <button
            className="lg:hidden text-gray-600 z-50"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Espaciador */}
          <div className="lg:hidden w-6"></div>

          {/* Usuario */}
          <div className="ml-auto flex items-center space-x-3">
            <span className="text-gray-800 font-medium">{user.name}</span>
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-indigo-500"
            />
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 p-10 overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Bienvenido a la página de inicio</h2>
          <p className="text-gray-600">
            Esta es tu área de trabajo. Aquí puedes ver tus proyectos, gestionar tareas y acceder a toda la funcionalidad.
          </p>
        </main>
      </div>
    </div>
  );
}
