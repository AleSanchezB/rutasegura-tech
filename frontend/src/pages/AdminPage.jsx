import React from 'react';
import MapWithRoute from '../components/MapWithRoute';

const AdminUNEManual = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Manual de Usuario – Administrador de UNE</h1>

    <MapWithRoute />

    {/* Aquí continúan los puntos del manual */}
    <ol className="list-decimal ml-6 space-y-4 mt-6">
      {/* ...acciones del manual... */}
    </ol>
  </div>
);

export default AdminUNEManual;
