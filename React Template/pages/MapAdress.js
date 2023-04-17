import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Map = () => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await fetch('/api/users/map');
      const data = await response.json();
      setCoordinates(data.coordinates);
    };

    fetchAddresses();
  }, []);

  const center = coordinates.length > 0 ? coordinates[0] : [0, 0];

  return (
    <MapContainer center={center} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {coordinates.map((coordinate, index) => (
        <Marker key={index} position={[coordinate.lat, coordinate.lng]}>
          <Popup>{`Address ${index + 1}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
