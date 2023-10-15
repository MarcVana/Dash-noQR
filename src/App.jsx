import { useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, NavLink } from 'react-router-dom'
import './App.css'
import FinishRide from './pages/FinishRide'
import Home from './pages/Home'
import Login from './pages/Login'
import Map from './pages/Map'
import Terms from './pages/Terms'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" >
        <Route index element={<Home/>}/>
        <Route path='start' element={<Login/>}/>
        <Route path='Terms' element={<Terms/>}/>
        <Route path='Map' element={<Map/>}/>
        <Route path='FinishRide' element={<FinishRide/>}/>
      </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
