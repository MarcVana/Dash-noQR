import { NavLink, useNavigate } from 'react-router-dom'
import './Home.css'
import { useEffect } from 'react'

function Home() {
  const navigate = useNavigate()
  useEffect(()=>{
      navigate('/start')
  },[])

  return (
    <>
      <NavLink to="/start">Go to Login</NavLink>
    </>
  )
}

export default Home