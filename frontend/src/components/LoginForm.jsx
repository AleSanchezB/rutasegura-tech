import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock } from 'lucide-react'; // Iconos opcionales si usas lucide-react

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


  const handleGoogleLoginSuccess = async (credentialResponse) => {

        const id_token = credentialResponse.credential;

        try {
            const response = await api.post('/auth/google', {
                id_token,
            });
            const { user, token } = response.data;
            console.log('User:', user);
            console.log('Token:', token);
            login({ ...user, token });
            navigate('/');
        } catch (error) {
            console.error('Login Error:', error);
        }
     
    }
  const handleGoogleLoginError = () => {
    setErrorMsg('Falló el inicio de sesión con Google.');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    api.post('/auth/login', { email, password })
        .then(response => {
            const { user, token } = response.data;
            login({ ...user, token });  // Guardamos el usuario y el token
            navigate('/');
        })
        .catch(error => {
            console.error('Login Error:', error);
            setErrorMsg('Credenciales incorrectas.');
        });

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fade-in-down">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Bienvenido</h1>

        {errorMsg && (
          <div className="mb-4 text-sm text-red-600 text-center font-semibold">{errorMsg}</div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium shadow-md"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="my-6 text-center text-gray-500 font-semibold">o continúa con</div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          />
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <a
            href="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
