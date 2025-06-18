import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CovidVaccinationSystem.css';
import Sidebar from './commponentst/Sidebar';
import GettyImages from './imgs/GettyImages-1211993076 (1).jpg';

function Admin() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/');
        console.log("User logged out");
    };

    return (
        <>
            <div className="covid-vaccination-system">
                <nav className="navbar">
                    <div className="left-container">
                        <h1> <span>CovidVaccinationSystem</span></h1>
                    </div>
                    <div className="right-container">
                        <Link to="/">Home</Link>
                        <Link to="/Info">VCs & Vs</Link>
                        {window.localStorage.getItem('role') && (
                            <button className='logout-button' onClick={handleLogout}>Logout</button>
                        )}
                    </div>
                </nav>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Sidebar />
                <div className='p'><h1 style={{ color: 'rgb(167, 88, 97)', marginTop: '400px', fontSize: 50, }}>Controling Covid Vaccination System </h1></div>
                <img src={GettyImages} alt="Getty Images" style={{ width: '900px', height: '500px' }} />
            </div>

            <footer className="footer text-center" style={{ color: 'rgb(167, 88, 97)', paddingLeft: '400px' }}>
                All Rights Reserved by RaWAna. Designed and Developed by <a >RaWAna</a>.
            </footer>
        </>
    );
};

export default Admin;
