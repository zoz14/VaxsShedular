import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CovidVaccinationSystem.css';
import './Patient.css';

function Patient() {
  const [UserName, setUserName] = useState('');
  const [Age, setAge] = useState('');
  const [vaccinationCenters, setVaccinationCenters] = useState([]);
  const [vaccineTypes, setVaccineTypes] = useState([]);
  const [doseTypes, setDoseTypes] = useState([]);
  const [centerId, setCenterId] = useState('');
  const [vaccineId, setVaccineId] = useState('');
  const [DoseNumber, setDoseNumber] = useState('');
  const [DateTime, setDateTime] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const navigate = useNavigate();
  const [selectedCenter, setSelectedCenter] = useState('');
  const [vaccines, setVaccines] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState('');

  /* const handleCenterChange = async (centerId) => {
    setSelectedCenter(centerId);
    try {
     const response = await axios.get(`/api/vaccines?CenterId=${centerId}`);
      setVaccines(response.data);
      setSelectedVaccine(''); 
    } catch (error) {
      console.error('Error fetching vaccines:', error);
    }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!UserName || !centerId || !vaccineId || !DoseNumber || !DateTime) {
      window.alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5186/api/Reservation/addbook', {
        UserName,
        Age,
        centerId,
        vaccineId,
        DoseNumber,
        DateTime,
      });

      if (response.status === 200) {
        console.log('Vaccination reservation successful');
        window.alert("Reservation has been successfully submitted");
      } else {
        console.error('Vaccination reservation failed');
        window.alert("Reservation failed. Please check the console for details.");
        window.alert(response.data); // Show the error message from the response in an alert
      }
    } catch (error) {
      console.error('Error during vaccination reservation:', error);
      window.alert(`Error during vaccination reservation: ${error.message}`);
    }
  };



  const certificate = async (UserName) => {
    try {
      const response = await axios.get(`http://localhost:5186/api/Reservation/GetCertification/${UserName}`);

      if (response.status === 200) {
        navigate('/Certificate');
      } else {
        setResultMessage('Patient does not meet the condition');
        window.alert("You must reserve the 1st dose first");
      }
    } catch (error) {
      console.error('Error during vaccination history check:', error);
      setResultMessage('Error during vaccination history check. Please try again later.');
      window.alert("Error displaying the certificate");
    }
  };


  function handleLogout() {

    localStorage.removeItem('token');
    navigate('/');
    console.log("User logged out");

  };
  /* 
  function loadChatraScript() {
    window.ChatraID = 'uMXKeCmmwTWHkK9ST'; 
    var s = document.createElement('script');
    window.Chatra = function () {
        (window.Chatra.q = window.Chatra.q || []).push(arguments);
    };
    s.async = true;
    s.src = 'https://call.chatra.io/chatra.js';
    if (document.head) document.head.appendChild(s);
  }
  
  loadChatraScript();
   */
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
              <button className='logout-button' onClick={handleLogout}>Logout</button>)}
          </div>
        </nav>
        <button className='certificate' onClick={() => certificate(UserName)}>View Certificate</button>
        <h4 className='form-title'>Vaccination Form</h4>
        <div className='reservation-form'>
          <form className='form-patient' onSubmit={handleSubmit}>

            <label htmlFor="patientName">Patient Name</label>
            <input
              type="text"
              id="patientName"
              placeholder="Patient Name"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="Age">Age</label>
            <input
              type="number"
              id="Age"
              placeholder="Age"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
            />
            <label htmlFor="centerId">Vaccination Center</label>
            <select
              id="centerId"
              value={centerId}
              onChange={(e) => setCenterId(e.target.value)}
            >
              <option value="Option">Select Venter</option>
              <option value="1">VaxHub</option>
              <option value="2">ImmuCare Clinic</option>
              <option value="3">SafeArm Clinic</option>
            </select>

            <label htmlFor="vaccineId">Vaccine</label>
            <select
              id="vaccineId"
              value={vaccineId}
              onChange={(e) => setVaccineId(e.target.value)}
            >
              <option value="Option">Select Vaccine</option>
              <option value="1">Astrazeneca</option>
              <option value="2">Sinopharm</option>
              <option value="3">Moderna</option>
              <option value="4">Fizer</option>
            </select>

            <label htmlFor="DoseNumber">Dose</label>
            <select
              id="doseType"
              value={DoseNumber}
              onChange={(e) => setDoseNumber(e.target.value)}
            >
              <option value="Option">Select Dose</option>
              <option value="1">1st Dose</option>
              <option value="2">2nd Dose</option>
            </select>

            <label htmlFor="DateTime">Date and Time:</label>
            <input
              type="datetime-local"
              id="DateTime"
              name="DateTime"
              onChange={(e) => setDateTime(e.target.value)}
            />
            <button type="submit">Reserve</button>
          </form>
        </div>
      </div>
      <footer className="footer text-center" style={{ color: 'rgb(255, 255, 255, 0.438)', paddingLeft: '400px', backgroundColor: 'rgb(129, 157,158)' }}>
        All Rights Reserved by RaWAna. Designed and Developed by <a >RaWAna</a>.
      </footer>

    </>
  );
}

export default Patient;
