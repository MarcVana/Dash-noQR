import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, useMemo } from 'react'
import './Map.css'
import RidePopUpContainer from '../components/popups/RidePopUpContainer'
import { GoogleMap, useLoadScript, MarkerF, Marker } from "@react-google-maps/api"
import { motion, AnimatePresence } from "framer-motion"
import { Html5QrcodeScanner } from 'html5-qrcode'
import axios from 'axios'
import useInterval from '../hooks/useInterval'

function Map() {
  const [PopUpState,setPopUpState] = useState(false);
  const [pauseState,setPauseState] = useState(false);
  const [readerState,setReaderState] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [StartScan,setStartScan] = useState(false);
  const [Scanning,setIsScanning] = useState(false);
  const [BikeData,setBikeData] = useState()
  const [Scanner,setScanner] = useState();
  const [RideTime,setRideTime] = useState(0)
  const [StartingTotalMile,setStartingTotalMile] = useState(0);
  const [AddIdPopUpState,setAddIdPopUpState] = useState(false);
  const [BikeIdValue,setBikeIdValue] = useState(0);
  const [ErrorText, setErrorText] = useState();
  const mapRef = useRef(null);
  const navigate = useNavigate();
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAQ9w8QzW-huQWC59mnyIha1MWExnz3RsE"
  });

  useEffect(()=>{
    getBikeStatus();
    ChangeBikeLockStatus("lock",()=>{})
    const interval = setInterval(()=>getBikeStatus(),10000);
    return () => clearInterval(interval);
  },[])

  const StartRide = () =>{
    console.log("start ride");
    if(BikeIdValue!="1234"){
      console.log(BikeIdValue);
      setErrorText("No bike with this id");
      return;
    }

    ChangeBikeLockStatus("unlock",()=>{
      console.log("so deblocat!");
      setScanResult("test");
      setStartingTotalMile(BikeData.totalMile);
      getBikeStatus();
      setAddIdPopUpState(false);
      setInterval(()=>setRideTime(count => count + 1),1000)
    });
    /*return () => clearInterval(interval);*/
  }
  
  const center = {lat: 46.770334, lng: 23.578434};
  useEffect(() => {
      if(!StartScan){
        console.log();
        if(Scanner!=undefined)
          Scanner.clear();
        return
      }
      //if (PopUpState == false) return;
      if (!isLoaded) return;
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
      });
      setScanner(scanner);
    
      scanner.render(success, error);
      
      // const checkScanner = () => {
      //   const button = document.getElementById("reader").querySelector("button");
      //   console.log(button);
      //   button.addEventListener("click", () => {
      //      setPopUpState(false);
      //   })
      // }

      //checkScanner();
  
      function success(result) {
        scanner.clear();
        console.log(result);
        setScanResult(result);
        StartTrip();
      }
    
      function error(err) {
        console.warn(err);
        console.log(err);
      }
      return () => {
        /*console.log("test");*/
        scanner.clear()
      };
  }, [isLoaded,StartScan]);

  const StartTrip = async () =>{
      const response = axios.post("https://dash-backend-372ad5525a1d.herokuapp.com/api/trip/",
      {
        "start_point": [0, 0],
        "bike_id": 1
      })
      console.log(response);
      getBikeStatus();
      
  }


  const getBikeStatus = async () =>{
      axios({
        method: 'get',
        url: 'https://iot-api.okai.co/shareos-device/scooter/query/status?userKey=jzah5zxlm7mxmsl1wgbxyn2dzb6akluq&timestamp=000&sign=000&imei=868963047087986',
        headers: { 
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then((response)=>{
        console.log(response);
        setBikeData(response.data.data)
      })
  }

  const ChangeBikeLockStatus = (status,onSuccess) =>{
    var data = `{\n  "userKey": "jzah5zxlm7mxmsl1wgbxyn2dzb6akluq",\n  "timestamp": "",\n  "sign": "",\n  "imei": "868963047087986",\n  "operate": "${status}" ,\n  "expireTime": ""\n}`;
    var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://iot-api.okai.co/shareos-device/scooter/control/switchLock',
     headers: { 
    'Content-Type': 'application/json;charset=utf-8'
    },
    data : data
    };
    axios(config)
    .then(function (response) {
      console.log(response);
        onSuccess();
    })
    .catch(function (error) {
    console.log(error);
    });
  }

  const renderGoogleMap = useMemo(() => {
    return (
      <GoogleMap ref={mapRef} onClick={()=>setPopUpState(false)} options={{styles: googleMapsStyle, fullscreenControl: false, zoomControl: false, mapTypeControl: false, streetViewControl: false, keyboardShortcuts: false}} zoom={16} center={BikeData==undefined?center:(scanResult?{lat:BikeData.latitude-0.0015,lng:BikeData.longitude}:{lat:BikeData.latitude,lng:BikeData.longitude})} mapContainerClassName="map-container">
          {BikeData!=undefined?<Marker icon={{url: "full-electric-bike.svg",scale:1 }} position={{lat:BikeData?.latitude,lng:BikeData.longitude}}>
            <div>test</div>
          </Marker>:<></>}
      </GoogleMap>
    )
  }, [BikeData]);
  
  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="map-screen">
      <div className="nav-container position-absolute">
        <NavLink to="/Start"><img src="logo-purple.png" alt="logo" /></NavLink>
      </div>
      {renderGoogleMap}
      
      <a className='primary-btn' onClick={()=>setAddIdPopUpState(true)}>
          <div className="flex align-center justify-center button-flex">
              {StartScan?<></>:<img src="scan.svg" alt="scan icon" />}
              <p>{StartScan?"Close":"Scan"}</p>
          </div>
      </a>
      {StartScan?
      (scanResult
      ? <div>Success: <a href={"https://" + scanResult}>{scanResult}</a></div>
      : <div id="reader"></div>
      ):<></>}
      <AnimatePresence>
        {AddIdPopUpState && 
        <div className='add-id-popup'>
          <input placeholder='add bike id' value={BikeIdValue} onChange={(e)=>setBikeIdValue(e.target.value)}></input>
          <button onClick={()=>StartRide()}>Add id</button>
          {ErrorText!=undefined?<p className='error-text'>{ErrorText}</p>:<p className='error-text invisible'>invisible</p>}
        </div>}
        {scanResult && <RidePopUpContainer title="Navigation" speed={BikeData?.speed} distance={Math.round((BikeData.totalMile-StartingTotalMile)*1.60934 * 100) / 100} time={Math.floor(RideTime/60)} time_sec={Math.floor(RideTime%60)} bike_name="RB01X" battery={BikeData?.batteryPercent} time_remaining="3" km_remaining={BikeData?.remainMile*1.60934} pause={pauseState} setPauseState={() => setPauseState(!pauseState)} close={()=>{setPopUpState(false)}} 
        finishRide={()=>ChangeBikeLockStatus("lock",()=>navigate(`/FinishRide?ride_time=${Math.floor(RideTime/60)+1}&ride_distance=${Math.round((BikeData.totalMile-StartingTotalMile)*1.60934 * 100) / 100}`))}/>}
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