import React from 'react';
import clsx from 'clsx'; // Asegúrate de tener clsx instalado: npm install clsx

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Fondo oscuro detrás del sidebar en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-md p-6 z-40 transition-transform duration-300",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
            "lg:static lg:translate-x-0": true, // en pantallas grandes siempre visible
          }
        )}
      >
        <div className="text-2xl font-bold text-indigo-600 mb-6">RutaSegura</div>
        <nav className="flex flex-col space-y-3 text-gray-700">
          <a href="/" className="hover:text-indigo-600">Inicio</a>
          <a href="/proyectos" className="hover:text-indigo-600">Proyectos</a>
          <a href="/perfil" className="hover:text-indigo-600">Perfil</a>
          <a href="/configuracion" className="hover:text-indigo-600">Configuración</a>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
