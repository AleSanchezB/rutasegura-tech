import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { ROUTES } from '../config';
import { useNavigate } from 'react-router-dom';
import useAuth from '../features/auth/hooks/useAuth';
import useRegister from '../features/auth/hooks/useRegister';

const Register = () => {
  const navigate = useNavigate();
  const { registerUser, error, success } = useRegister();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      const isRegistered = await registerUser(formData);
      if (isRegistered) {
          console.log('Registro exitoso');

        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          password: ''
        });

      }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fade-in-down">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Crear cuenta</h1>

        {errorMsg && (
          <div className="mb-4 text-sm text-red-600 text-center font-semibold">{errorMsg}</div>
        )}
        {successMsg && (
          <div className="mb-4 text-sm text-green-600 text-center font-semibold">{successMsg}</div>
        )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {success && (
        <div className="alert-success-text">
          Alumno registrado exitosamente.
        </div>
      )}
          <div className="relative">
            <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              name="first_name"
              placeholder="Nombre"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div className="relative">
            <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              name="last_name"
              placeholder="Apellido"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium shadow-md"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <a
            href="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
