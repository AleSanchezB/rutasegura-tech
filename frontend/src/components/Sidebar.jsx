import React from 'react';
import clsx from 'clsx';
import { XIcon } from '@heroicons/react/outline';
import useAuth from '../features/auth/hooks/useAuth';

const Sidebar = ({ isOpen, onClose }) => {
    const { logout, authenticated } = useAuth();
  return (
    <>
      {/* Fondo oscuro para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-md p-6 z-40 transition-transform duration-300",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        {/* Botón para cerrar en todas las resoluciones */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 focus:outline-none"
            aria-label="Cerrar menú"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="text-2xl font-bold text-indigo-600 mb-6">RutaSegura</div>

        <nav className="flex flex-col space-y-3 text-gray-700">
          <a href="/" className="hover:text-indigo-600">Inicio</a>
          <a href="/routes" className="hover:text-indigo-600">Rutas</a>
          <a href="/profile" className="hover:text-indigo-600">Perfil</a>
            <a onClick={logout} className="hover:text-indigo-600">Log Out</a>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
