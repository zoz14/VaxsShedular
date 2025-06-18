import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Certificate.css';
import './CovidVaccinationSystem.css';
import certificateImage from './imgs/certificate.png';
function Certificate() {
    const navigate=useNavigate();
    function handleLogout() {
      try {
          localStorage.removeItem('accessToken');
          
          navigate('/');
          
          console.log("User logged out");
      } catch (error) {
          console.error("Error during logout:", error);
      }
  };
    return(
<>
            <div className="covid-vaccination-system">
                <nav className="navbar">
                    <div className="left-container">
                        <h1> <span>CovidVaccinationSystem</span></h1>
                    </div>
                    <div className="right-container">
                    <Link to="/patient-dashboard">Go Back</Link>
                        <Link to="/">Home</Link>
                        <Link to="/Info">VCs & Vs</Link>

                        {window.localStorage.getItem('Email') && (
                            <Link className='logout-button' onClick={handleLogout}>Logout</Link>
                        )}
                    </div>
                </nav>
             
            </div>
            <div className='certificate-img'>
                  <img src={certificateImage} style={{width:'900px', paddingLeft:'250px',height:'499px'}}/>
            </div>
            < footer className="footer text-center" style={{ color: 'rgba(255, 255, 255, 0.438)', backgroundColor: 'rgb(129, 157, 158)', paddingLeft: '500px' }}>
            <br/>
 All Rights Reserved by RaWAna. Designed and Developed by <a >RaWAna</a>.
 
 </footer>
        </>
        
    );
};

export default Certificate;