import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import PopUpContainer from '../components/popups/PopUpContainer';
import './Login.css'
import { useNavigate } from 'react-router-dom'
import useWindowDimensions from '../hooks/getWindowDimensions';


function ScanQR() {
  const navigate = useNavigate();

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (width > 476) 
        navigate("/");
  });

  return (
    <>
        <p>Scan QR page</p>
        <NavLink to="/Map">To Map</NavLink>
    </>
  )
}

export default ScanQR