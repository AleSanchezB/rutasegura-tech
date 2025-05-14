import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Marker
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 29.072967,
  lng: -110.955919
};

const MapWithRoute = () => {
  const [origin, setOrigin] = useState('Plaza Zaragoza, Hermosillo');
  const [destination, setDestination] = useState('Galerías Mall Sonora, Hermosillo');
  const [directions, setDirections] = useState(null);
  const [stops, setStops] = useState([]);
  const [mapRef, setMapRef] = useState(null);
  const [calculateRoute, setCalculateRoute] = useState(true);

  // Cargar paradas guardadas al inicio
  useEffect(() => {
    const saved = localStorage.getItem('stops');
    if (saved) setStops(JSON.parse(saved));
  }, []);

  // Guardar paradas y recalcular ruta cuando cambien
  useEffect(() => {
    localStorage.setItem('stops', JSON.stringify(stops));
    setCalculateRoute(true);
    adjustMapBounds(mapRef, stops);
  }, [stops]);

  // Recalcular también si cambian origen/destino
  useEffect(() => {
    setCalculateRoute(true);
  }, [origin, destination]);

  const adjustMapBounds = (map, points) => {
    if (!map || points.length === 0) return;
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(center);
    points.forEach((pt) => bounds.extend(pt));
    map.fitBounds(bounds);
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setStops([...stops, { lat, lng }]);
  };

  const handleMapLoad = (map) => {
    setMapRef(map);
    adjustMapBounds(map, stops);
  };

  const handleDirectionsCallback = (response) => {
    if (response?.status === 'OK') {
      setDirections(response);
      setCalculateRoute(false);
    }
  };

  const handleRemoveStop = (index) => {
    const updated = stops.filter((_, i) => i !== index);
    setStops(updated);
  };

  const handleClearStops = () => {
    setStops([]);
    setDirections(null);
    localStorage.removeItem('stops');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ruta Dinámica en Hermosillo</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
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
          onClick={handleClearStops}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Limpiar Paradas
        </button>
      </div>

      <div className="rounded-xl overflow-hidden shadow-lg">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onClick={handleMapClick}
            onLoad={handleMapLoad}
          >
            {stops.map((stop, idx) => (
              <Marker
                key={idx}
                position={stop}
                label={`${idx + 1}`}
                title={`Parada ${idx + 1}`}
                onRightClick={() => handleRemoveStop(idx)}
              />
            ))}

            {calculateRoute && (
              <DirectionsService
                options={{
                  origin,
                  destination,
                  waypoints: stops.map((stop) => ({
                    location: stop,
                    stopover: true
                  })),
                  travelMode: 'DRIVING',
                  optimizeWaypoints: false
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
