import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import Sidebar component 

const User = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5287/api/Admin/GetUser', {
        headers: {
          Authorization: `Bearer ${token}`,

        }
      });

      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleAccept = async (userName) => {
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5287/api/Admin/Accept', { userName: userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,

          }
        }
      );

      fetchPatients();
    } catch (error) {
      console.error('Error accepting patient:', error);
    }
  };

  const handleReject = async (userName) => {
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5287/api/Admin/Reject', { userName: userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,

          }
        }
      );
      fetchPatients();
    } catch (error) {
      window.alert('Error rejecting patient:', error.response);
    }
  };

  function handleLogout() {

    localStorage.removeItem('token');
    navigate('/');
    console.log("User logged out");

  };

  return (
    <div className="covid-vaccination-system">
      <nav className="navbar">
        <div className="left-container">
          <h1><span>CovidVaccinationSystem</span></h1>
        </div>
        <div className="right-container">
          <Link to="/">Home</Link>
          <Link to="/Info">VCs & Vs</Link>
          {window.localStorage.getItem('role') && (
            <button className='logout-button' onClick={handleLogout}>Logout</button>)}
        </div>
      </nav>

      <div className='container'>
        <Sidebar>
          <h1 className='mvc-title'>Accept Or Reject Users</h1>
          <table className="mvc-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient}>
                  <td>{patient}</td>
                  <td>
                    <button className='user-btn' onClick={() => handleAccept(patient)}>Accept</button>
                    <button className='user-btn' onClick={() => handleReject(patient)}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </Sidebar>
      </div>

      <footer className="footer text-center" style={{ color: 'rgb(255, 255, 255, 0.438)', paddingLeft: '400px' }}>
        All Rights Reserved by RaWAna. Designed and Developed by <a >RaWAna</a>.
      </footer>
    </div>
  );
}

export default User;