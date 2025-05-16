import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../config';
import ProtectedRoute from '../features/auth/ProtectedRoute';

import Admin from '../pages/AdminPage';

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.ADMIN.MAP} element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
