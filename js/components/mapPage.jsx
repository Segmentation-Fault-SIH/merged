
import React, { useState, useEffect } from 'react';
import { useLocationContext } from '../context';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import rescueAgencies from '../constants';
import TeamBox from './TeamBox';
const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,  // This will load the component only on the client side
  });
const Tracking = () => {
  const { locationState, setLocation } = useLocationContext();
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

//   const LocationMarker = () => {
//     const map = useMap(); // Use this hook to get access to the map instance

//     useEffect(() => {
//       // Check if both previous and current locations are valid before flying
//       if (locationState.previousLocation.latitude && locationState.previousLocation.longitude &&
//         locationState.currentLocation.latitude && locationState.currentLocation.longitude) {
//         // Fly from the previous location to the current location
//         map.flyTo([locationState.currentLocation.latitude, locationState.currentLocation.longitude], map.getZoom());
//       }
//     }, []); // Empty dependency array to ensure this effect runs only once when the component is initially rendered.

//     return (
//       <Marker position={[locationState.currentLocation.latitude, locationState.currentLocation.longitude]}>
//         <Popup>You are here</Popup>
//       </Marker>
//     );
//   };


  return (
    <div className="flex flex-col md:flex-row w-screen h-screen bg-white m-0 p-0">
    {/* Sidebar */}
    <div
      className={`${
        isSidebarExpanded ? 'w-full md:w-40' : 'w-26 md:w-1/6'
      } bg-white transition-width duration-300 ease-in-out m-0 p-0 flex flex-col`}
    >
        <button
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={toggleSidebar}
        >
          {!isSidebarExpanded ? '>>' : '<<'}
        </button>
        <div className="p-4 text-white"></div>
        {rescueAgencies.map((team , index) => (
  <div key={index} 
  className='flex flex-nowrap'
  >
    <TeamBox team={team}/>
    
  </div>
))}
      </div>

      {/* Content */}
      <div
      className={`${isSidebarExpanded ? 'md:ml-0' : 'md:ml-0'} w-full flex-1 bg-black transition-margin-left duration-300 ease-in-out m-0 p-0`}
    >
        {/* <MapContainer
          center={{ lat: 51.505, lng: -0.09 }}
          zoom={11}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}  // Make sure the map takes up the full space of the parent container
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer> */}
         <MapComponent locationState={locationState} />
      </div>
    </div>
  );
};

export default Tracking;
