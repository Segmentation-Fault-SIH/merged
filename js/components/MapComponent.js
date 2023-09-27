import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

const MapComponent = ({ locationState }) => {
  const LocationMarker = () => {
    const map = useMap(); // Use this hook to get access to the map instance

    useEffect(() => {
      // Check if both previous and current locations are valid before flying
      if (locationState.previousLocation.latitude && locationState.previousLocation.longitude &&
        locationState.currentLocation.latitude && locationState.currentLocation.longitude) {
        // Fly from the previous location to the current location
        map.flyTo([locationState.currentLocation.latitude, locationState.currentLocation.longitude], map.getZoom());
      }
    }, [map]); // Dependency array updated to re-run effect when locations change

    return null; // No need to return anything, since we're not rendering a marker anymore
  };

  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={11}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent;
