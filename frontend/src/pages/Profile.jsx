import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useUser } from '../contexts/AuthContext';
import { MenuIcon } from '@heroicons/react/outline';
import { Menu } from 'lucide-react'; // O usa texto "≡" si no tienes el icono

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        avatarUrl: user.avatarUrl || 'https://previews.123rf.com/images/illustratiostock/illustratiostock2112/illustratiostock211200635/179843524-avatar-aislado-de-una-raza-de-perro-bulldog-ilustraci%C3%B3n-vectorial.jpg',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Aquí puedes agregar lógica para guardar los cambios, por ejemplo, hacer una petición a una API
    setEditMode(false);
    console.log('Datos guardados:', formData);
  };

  // Verificar que el usuario esté cargado y no sea null
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100 justify-center items-center">
        <p>Cargando...</p> {/* Aquí puedes poner un spinner de carga o algún tipo de indicador */}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen bg-gray-100 justify-center items-center">
        <p>No estás autenticado. Por favor, inicia sesión.</p>
      </div>
    );
  }

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
            <span className="text-gray-800 font-medium">{user.first_name} {user.last_name}</span>
            <img
              src={formData.avatarUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-indigo-500"
            />
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 p-10 overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Perfil del Usuario</h2>

          {/* Si está en modo edición */}
          {editMode ? (
            <div>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
                  URL de Avatar
                </label>
                <input
                  type="text"
                  id="avatarUrl"
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-800 font-medium mb-2">
                <span className="font-semibold">Nombre: </span>{user.first_name} {user.last_name}
              </p>
              <p className="text-gray-800 font-medium mb-2">
                <span className="font-semibold">Correo Electrónico: </span>{user.email}
              </p>
              <img
                src={formData.avatarUrl}
                alt="Avatar"
                className="w-20 h-20 rounded-full border-2 border-indigo-500 mb-4"
              />
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Editar Perfil
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
