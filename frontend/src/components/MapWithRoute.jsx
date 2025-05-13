// src/components/MapWithRoute.jsx
import React, { useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -34.6037,
  lng: -58.3816
};

const MapWithRoute = () => {
  const [origin, setOrigin] = useState('Obelisco, Buenos Aires');
  const [destination, setDestination] = useState('Congreso, Buenos Aires');
  const [directions, setDirections] = useState(null);
  const [showDirections, setShowDirections] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDirections(true);
  };

  const handleDirectionsCallback = (response) => {
    if (response !== null && response.status === 'OK') {
      setDirections(response);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Buscar Ruta</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Origen"
          className="flex-1 p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destino"
          className="flex-1 p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Ver Ruta
        </button>
      </form>

      <div className="rounded-xl overflow-hidden shadow-lg">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
            {showDirections && (
              <DirectionsService
                options={{
                  destination,
                  origin,
                  travelMode: 'DRIVING'
                }}
                callback={handleDirectionsCallback}
              />
            )}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapWithRoute;
