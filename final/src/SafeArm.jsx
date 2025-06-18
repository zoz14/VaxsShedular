import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CovidVaccinationSystem.css';
import './VaxHub.css';

function VaccinationTable({ patients, handleAccept, handleDelete }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Patient Name</th>
          <th>Age</th>
          <th>Dose</th>
          <th>Date Time</th>
          <th>Center Name</th>
          <th>Vaccine Name</th>
          {/*           <th>Confirmation</th>
 */}          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {patients.map(patient => (
          <tr key={patient}>
            <td>{patient.id}</td>
            <td>{patient.userName}</td>
            <td>{patient.age}</td>
            <td>{patient.doseNumber}</td>
            <td>{patient.dateTime}</td>
            <td>{patient.centerName}</td>
            <td>{patient.vaccineName}</td>
            {/*             <td>{patient.Confirmation}</td>
 */}            <td>
              <button onClick={() => handleAccept(patient.id)}>Accept</button>
              <button onClick={() => handleDelete(patient.id)}>Reject</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SafeArm() {
  const [patients, setPatients] = useState([]);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [dateTime, setDateTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5186/api/Reservation/GetVacc/3');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5186/api/Reservation/book${id}`);
      if (response.status === 200) {
        fetchPatients();
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    console.log("User logged out");
  };

  const handleAccept = async (id) => {
    try {
      await axios.post('http://localhost:5186/api/Reservation/Accept', { id: id });
      fetchPatients();
    } catch (error) {
      console.error('Error accepting patient:', error);
    }
  };

  return (
    <>
      <div className="covid-vaccination-system">
        <nav className="navbar">
          <div className="left-container">
            <h1><span>CovidVaccinationSystem</span></h1>
          </div>
          <div className="right-container">
            <Link to="/">Home</Link>
            <Link to="/Info">VCs & Vs</Link>
            {localStorage.getItem('role') && (
              <button className='logout-button' onClick={handleLogout}>Logout</button>
            )}
          </div>
        </nav>
        <VaccinationTable
          patients={patients}
          handleDelete={handleDelete}
          handleAccept={handleAccept}
        />
        <footer className="footer text-center">
          All Rights Reserved by RaWAna. Designed and Developed by RaWAna.
        </footer>
      </div>
    </>
  );
}

export default SafeArm;
