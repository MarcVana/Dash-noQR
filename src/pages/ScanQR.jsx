import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PopUpContainer from '../components/popups/PopUpContainer';
import './Login.css'
import { useNavigate } from 'react-router-dom'


function ScanQR() {
  const navigate = useNavigate();

  return (
    <>
        <p>Scan QR page</p>
        <NavLink to="/Map">To Map</NavLink>
    </>
  )
}

export default ScanQR