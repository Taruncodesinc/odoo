<<<<<<< HEAD

import Login from '../Pages/Login'
=======
import React from "react";
>>>>>>> 95828edf097ec62e484d0427d32175211ca021a6
import './App.css'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import Landing from "../Pages/Landing";
import Home from "../Pages/Home";
import Issues from "../Pages/Issues";
import Login from "../Pages/Login";
import Sign from "../Pages/Sign";

function App() {


  return (
    <>
<<<<<<< HEAD
     <div className='bg-red-500'>Hello</div>
     <Login/>
=======
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Sign" element={<Sign />} />

      {/* Protected DashBoard Routes */}
      <Route path="/home" element={<Home />} />
      <Route path="Issues" element={<Issues />} />
      </Routes>
    </Router>
>>>>>>> 95828edf097ec62e484d0427d32175211ca021a6
    </>
  )
}

export default App
