import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//import pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup';
import Verification from './pages/Verification'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verification />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App