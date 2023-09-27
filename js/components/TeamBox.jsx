
import React from 'react'
import { useLocationContext } from '../context'
const TeamBox = ({team}) => {
  const {locationState , setLocationState, setLocation } = useLocationContext();
  return (
    <div className="w-full text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
        
        <button onClick={() => setLocation({ latitude: team.latitude, longitude:team.longitude }
        ,console.log(locationState. currentLocation.latitude)
          )}
          className="w-full bg-transparent border-blue-50"
          >{team.name}</button>
    </div>
  )
}

export default TeamBox