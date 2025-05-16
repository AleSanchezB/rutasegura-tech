import React from 'react';
import MapWithRoute from '../components/MapWithRoute';
import { useUser } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import { MenuIcon } from '@heroicons/react/outline';
import AdminUNEManual from './AdminPage';
import TrabajadorCliente from './TrabajadorCliente';
import AdminCliente from './AdminCliente';

const Home = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user?.is_admin ? (
        <div className="flex min-h-screen flex-1 flex-col justify-center lg:px-8">
          <Sidebar />
            <AdminUNEManual />
        </div>
      ) : (
        <div className="flex min-h-screen flex-1 flex-col justify-center lg:px-8">
            <AdminUNEManual />
        </div>
      )}
    </>
  );
};

export default Home;
