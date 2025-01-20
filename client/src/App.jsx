import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Users from './pages/admin/Users'
import Stations from './pages/admin/Stations'
import AllStation from './pages/admin/AllStation'
import Feedback from './pages/Feedback'
import AddStations from './pages/owner/AddStations'
import MyStations from './pages/owner/MyStations'
import UpdateStations from './pages/owner/UpdateStations'
import Profile from './pages/Profile'
import AddVehicles from './pages/user/AddVehicles'
import ViewVehicles from './pages/user/ViewVehicles'
import StationSingleView from './pages/StationSingleView'
import UserViewStations from './pages/user/UserViewStations'
import MyBookings from './pages/user/MyBookings'
import StationBookings from './pages/owner/StationBookings'
import ViewTransactions from './pages/user/ViewTransactions'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />      
        <Route path='/register' element={<Register />} />     
        <Route path='/profile' element={<Profile />} />     
        {/* admin  */}
        <Route path='/all-users' element={<Users />} />      
        <Route path='/all-owners' element={<Stations />} />      
        <Route path='/all-stations/:id' element={<AllStation />} />     
        <Route path='/feedbacks' element={<Feedback/>} />     
        {/* owner */}
        <Route path='/add-stations' element={<AddStations/>} />     
        <Route path='/view-stations' element={<MyStations/>} />     
        <Route path='/update-station/:id' element={<UpdateStations/>} />    
        <Route path='/view-station-booking' element={<StationBookings/>} />    
        {/* user  */}
        <Route path='/add-vehicle' element={<AddVehicles/>} />     
        <Route path='/my-vehicle' element={<ViewVehicles/>} />     
        <Route path='/single-station/:id' element={<StationSingleView/>} />     
        <Route path='/stations' element={<UserViewStations/>} />     
        <Route path='/my-booking' element={<MyBookings/>} />     
        <Route path='/view-transaction' element={<ViewTransactions/>} />     
      </Routes>
    </BrowserRouter>
  )
}

export default App
