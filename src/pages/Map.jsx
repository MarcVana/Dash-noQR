import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './Map.css'
import RidePopUpContainer from '../components/popups/RidePopUpContainer'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import { motion, AnimatePresence } from "framer-motion"

function Map() {
  const [PopUpState,setPopUpState] = useState(false);
  const [pauseState,setPauseState] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAQ9w8QzW-huQWC59mnyIha1MWExnz3RsE"
  });

  if (!isLoaded) return <div>Loading...</div>
  const center = {lat: 46.768250, lng: 23.594063};
  return (
    <div className="map-screen">
      <div className="nav-container position-absolute">
        <NavLink to="/"><img src="logo-purple.png" alt="logo" /></NavLink>
      </div>
      <GoogleMap onClick={()=>setPopUpState(false)} options={{styles: googleMapsStyle, fullscreenControl: false, zoomControl: false, mapTypeControl: false, streetViewControl: false}} zoom={15} center={center} mapContainerClassName="map-container">
          <MarkerF position={center}></MarkerF>
      </GoogleMap>
      <a onClick={()=>setPopUpState(!PopUpState)}>
          <div className="flex align-center justify-center button-flex">
              <img src="scan.svg" alt="scan icon" />
              <p>Scan</p>
          </div>
      </a>
      <AnimatePresence>
        {PopUpState && <RidePopUpContainer title="Navigation" speed="19" distance="4,7" time="17" bike_name="RB48X" battery="54" time_remaining="3" pause={pauseState} setPauseState={() => setPauseState(!pauseState)} close={()=>setPopUpState(false)}/>}
      </AnimatePresence>
    </div>
  )
}

const googleMapsStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ];

export default Map