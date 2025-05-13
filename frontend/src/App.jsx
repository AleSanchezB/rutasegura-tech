import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Login from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/AdminPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
          <Routes>
              <Route
                  path="/"
                  element={
                      <ProtectedRoute>
                          <Home />
                      </ProtectedRoute>
                  }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />"
              <Route
                  path="/profile"
                  element={
                      <ProtectedRoute>
                          <Profile />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path="/dashboard"
                  element={
                      <ProtectedRoute>
                          <Dashboard />
                      </ProtectedRoute>
                  }
              />
          </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
