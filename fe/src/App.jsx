import React from "react";
import './App.css';
import { Routes, Route, Router } from "react-router-dom";
import Landing from "../Pages/Landing";
import Home from "../Pages/Home";
import Issues from "../Pages/Issues";
import Login from "../Pages/Login";
import Sign from "../Pages/Sign";
import IssueDetail from "../Pages/IssueDetail";
import ReportIssueForm from "../Pages/RportNewIssue";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/home" element={<Home />} />
      <Route path="/issues" element={<Issues />} />
      <Route path="/issue/:id" element={<IssueDetail/>} />
      <Route path="/newissue" element={<ReportIssueForm/>}/>
    </Routes>
  );
}

export default App;
