import React, { createContext, useState, useEffect, useContext } from 'react';
import { verifyTokenRequest } from '../services/authService';
import { getUserByIdRequest } from '../services/userService';


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setError("No access token found");
        setLoading(false);
        return;
      }
        
      try {
        const verifyResponse = await verifyTokenRequest(token);
        const userId = verifyResponse.data.user_info.user_id;
        const userResponse = await getUserByIdRequest(userId);
        setUser(userResponse.data);
      } catch (error) {
        console.error("User not found", error);
        setError("User not found");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const clearUser = () => {
    setUser(null);
    setError(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, clearUser, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within a AuthProvider');
  }
  return context;
}
