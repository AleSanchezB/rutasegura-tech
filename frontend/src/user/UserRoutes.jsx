import React from 'react';
import { ROUTES  } from '../config';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext'; // Make sure path is correct
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Login from '../components/LoginForm';
import Register from '../components/RegisterPage';
import ProtectedRoute from '../components/ProtectedRoute';

function UserRoutes() {
  return (
      <AuthProvider>
          <Routes>
              <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
              <Route path={ROUTES.USER.LOGOUT} element={<Login />} />
                <Route path={ROUTES.AUTH.SIGNUP} element={<Register />} />
                
                {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                  <Route path={ROUTES.HOME} element={<Home />} />
                  <Route path={ROUTES.USER.PROFILE} element={<Profile />} />
                  
              </Route>
          </Routes>
    </AuthProvider>
  );
}

export default UserRoutes;
