import React from "react";
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
    </>
  )
}

export default App
