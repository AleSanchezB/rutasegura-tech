import { useState } from 'react';
import { setToken, removeToken, isAuthenticated } from '../../../utils/auth';
import { useUser } from '../../../contexts/AuthContext';
import { loginRequest, loginRequestTrad } from '../../../services/authService';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config';

export default function useAuth() {
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const { clearUser } = useUser();
  const navigate = useNavigate();

  const login = async (credentials) => {
    setError(null);

      console.log("Login credentials:", credentials)
    // Caso: login con Google ya autenticado
    if (credentials.token && credentials.user) {
        try {
        setToken(credentials.token);
        setAuthenticated(true);
        navigate(ROUTES.HOME);
        return true;
      } catch (err) {
        console.error("Google login error", err);
        setError("Error al iniciar sesión con Google.");
        return false;
      }
    }

      console.log("No Google credentials, trying traditional login");
    // Caso: login con email/password tradicional
      try {
        const response = await loginRequestTrad(credentials);
        console.log("Login response:", response);
      setToken(response.data.access_token);
      setAuthenticated(true);
      navigate(ROUTES.HOME);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión.");
      console.error("Login failed", err);
      setAuthenticated(false);
      return false;
    }
  };

  const logout = () => {
    removeToken();
    clearUser();
    setAuthenticated(false);
    setError(null);
    navigate(ROUTES.AUTH.LOGIN);
  };

  return { login, logout, error, authenticated };
}
