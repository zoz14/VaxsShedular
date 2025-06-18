import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import Login from './Login';
import './App.css';
import Admin from './Admin.js';
import Patient from './Patient.js';
import CovidVaccinationSystem from './CovidVaccinationSystem';
import SignUp from './SignUp';
import Info from './Info.js';
import Mv from './commponentst/Mv';
import MVC from './commponentst/MVC';
import Ueser from './commponentst/Ueser'; 
import Sidebar from './commponentst/Sidebar';
import VaxHub from './VaxHub.jsx';
import ImmuCare from './ImmuCare.js';
import SafeArm from './SafeArm.jsx';

import Certificate from './Certificate.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          
          <Routes> 
            <Route path="/" exact element={<CovidVaccinationSystem />} />
            <Route path="/Login" element={<Login />} /> 
            <Route path="/Info" element={<Info />} /> 
            <Route path="/admin-dashboard" element={<Admin />} />
            <Route path="/patient-dashboard" element={<Patient />} />
            <Route path="/SignUp" element={<SignUp />} />
           <Route path="/VaxHub" element={<VaxHub />} />
           <Route path="/ImmuCare" element={<ImmuCare />} />
           <Route path="/SafeArm" element={<SafeArm />} />

            <Route path="/MVC" element={<MVC />} />
            <Route path="/Mv" element={<Mv />} />
            <Route path="/User" element={<Ueser />} />
            <Route path="/Certificate" element={<Certificate />} />           
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
