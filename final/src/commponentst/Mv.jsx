import React, { useState, useEffect } from 'react';
import './mv.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

const VaccineTypesCRUD = () => {
  const [vaccineTypes, setVaccineTypes] = useState([]);
  const [newVaccineType, setNewVaccineType] = useState({ Name: '', Precautions: '', TimeGap: '' });
  const [selectedVaccineType, setSelectedVaccineType] = useState([]);
  const [VaccineId, setVaccineId] = useState("");
  const [CenterId, setCenterId] = useState("");
  const navigate = useNavigate();

  useEffect(() => { fetchVaccineTypes(); }, []);


  const fetchVaccineTypes = async () => {
    try {
      const response = await axios.get('http://localhost:5168/api/Vaccine/getallvaccine');
      setVaccineTypes(response.data);
    } catch (error) {
      console.error('Error fetching vaccine types:', error);
    }
  };

  const addVaccineType = async () => {
    try {
      const response = await axios.post('http://localhost:5168/api/Vaccine/addvaccine', newVaccineType);
      const newType = response.data;
      setVaccineTypes([...vaccineTypes, newType]);
      setNewVaccineType({ Name: '', Precautions: '', TimeGap: '' });
      fetchVaccineTypes();
    } catch (error) {
      console.error('Error adding vaccine type:', error);
    }
  };

  function handleLogout() {

    localStorage.removeItem('token');
    navigate('/');
    console.log("User logged out");

  };

  const handleUpdateVaccineType = async () => {
    try {
      await axios.put(`http://localhost:5168/api/Vaccine/updatevaccine/${selectedVaccineType.id}`, selectedVaccineType);
      fetchVaccineTypes(); // Refresh the list after updating
      setSelectedVaccineType(null);
    } catch (error) {
      console.error('Error updating vaccine type:', error);
    }
  };



  const handleDeleteVaccineType = async (id) => {
    try {
      await axios.delete(`http://localhost:5168/api/Vaccine/deletevaccine?id=${id}`);
      fetchVaccineTypes(); // Refresh the list after deleting
    } catch (error) {
      console.error('Error deleting vaccine type:', error);
    }
  };



  const displayVaccineTypes = () => {
    return (
      <div className='table-container'>
        <table className='mvc-table' style={{ width: '100%', marginLeft: '-10%' }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Precautions</th>
              <th>VC</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vaccineTypes.map((type) => (
              <tr key={type}>

                <td>{type.id}</td>
                <td>{type.name}</td>
                <td>{type.precautions}</td>
                <td>{type.centers}</td>
                <td>{type.timeGap}</td>

                <td>
                  <button className='user-btn' onClick={() => handleDeleteVaccineType(type.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5168/api/Vaccine/addvaccinetocenter", {
        VaccineId: VaccineId,
        CenterId: CenterId,
      });

      if (response.status === 200) {
        console.log("Data added successfully");
        fetchVaccineTypes();
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };


  return (
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
      <Sidebar>
        <div>
          <div className='mv-title' >
            <h2>Manage Vaccination </h2>
          </div>
          {displayVaccineTypes()}

          <div className="container">
            <div className="form-mv" style={{ paddingTop: '35px', marginInlineStart: '150px' }}>
              <h2 className='vctypes'>Vaccine Types</h2>
              <input
                type="text"
                value={newVaccineType.Name}
                onChange={(e) => setNewVaccineType({ ...newVaccineType, Name: e.target.value })}
                placeholder="Enter Vaccine Name"
              />
              <input
                type="text"
                value={newVaccineType.Precautions}
                onChange={(e) => setNewVaccineType({ ...newVaccineType, Precautions: e.target.value })}
                placeholder="Enter Precautions"
              />

              <input
                type="text"
                value={newVaccineType.TimeGap}
                onChange={(e) => setNewVaccineType({ ...newVaccineType, TimeGap: e.target.value })}
                placeholder="Enter Gap Time"
              />
              <button style={{ marginLeft: '30px' }} className='container-btn' onClick={addVaccineType}>Add</button>
            </div>



            {/*             <div className="container">
 */}              <div className="form-mv" style={{ paddingleft: '150px', paddingTop: '15px', marginLeft: '400px' }}>
              <h2 className='vctypes'> Update Vaccine Types</h2>
              <input
                type="text"
                value={selectedVaccineType?.id || ''}
                onChange={(e) => setSelectedVaccineType({ ...selectedVaccineType, id: e.target.value })}
                placeholder="Enter Vaccine ID"
              />
              <input
                type="text"
                value={selectedVaccineType?.name || ''}
                onChange={(e) => setSelectedVaccineType({ ...selectedVaccineType, name: e.target.value })}
                placeholder="Enter Vaccine Name"
              />
              <input
                type="text"
                value={selectedVaccineType?.precautions || ''}
                onChange={(e) => setSelectedVaccineType({ ...selectedVaccineType, precautions: e.target.value })}
                placeholder="Enter Precautions"
              />
              <input
                type="text"
                value={selectedVaccineType?.timeGap || ''}
                onChange={(e) => setSelectedVaccineType({ ...selectedVaccineType, timeGap: e.target.value })}
                placeholder="Enter Gap Time"
              />
              <button style={{ marginLeft: '30px' }} className='container-btn' onClick={handleUpdateVaccineType}>Update</button>
            </div>
          </div>

        </div>
        {/*         </div>
 */}


        <div>
          <div >
            <form style={{ marginLeft: '28%' }} onSubmit={handleSubmit} >
              <h2 className='vctypes' style={{ paddingLeft: '10px' }}>Add Vaccine Centers</h2>
              <br />
              <input style={{ width: '30%' }}
                type="text"
                id="VaccineId"
                value={VaccineId}
                onChange={(e) => setVaccineId(e.target.value)}
                placeholder="Vaccine Id"

              />
              <input style={{ width: '30%' }}
                type="text"
                id="centerId"
                value={CenterId}
                onChange={(e) => setCenterId(e.target.value)}
                placeholder="Center Id"

              />
              <button style={{ width: '10%', paddingLeft: '15px', marginLeft: '55px' }} type="submit">Add</button>
            </form> </div>
        </div>
      </Sidebar>
      <footer className="footer text-center" style={{ color: 'rgb(255, 255, 255, 0.438)', paddingLeft: '400px' }}>
        All Rights Reserved by RaWAna. Designed and Developed by <a >RaWAna</a>.
      </footer>
    </div>
  );
};

export default VaccineTypesCRUD;