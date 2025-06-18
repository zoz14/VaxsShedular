import React, { useState, useEffect } from 'react';
import './MVC.css';
import '../CovidVaccinationSystem.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

const MVC = () => {
  const Centers = () => {
    const [centers, setCenters] = useState([]);
    const [newCenter, setNewCenter] = useState(
      {
        Name: '',
        Vaccines: '',
        Address: '',
        Contact: '',

      });
    const [selectedVaccineType, setSelectedVaccineType] = useState(null);
    const [VaccineId, setVaccineId] = useState("");
    const [CenterId, setCenterId] = useState("");
    const navigate = useNavigate();

    useEffect(() => { fetchCenters(); }, []);

    const fetchCenters = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5168/api/Center/getallcenter');
        setCenters(response.data);
      } catch (error) {
        console.error('Error fetching centers:', error);
      }
    };

    const addCenter = async () => {
      try {
        const response = await axios.post('http://localhost:5168/api/Center/addcenter', newCenter);
        const newCenterData = response.data;
        setCenters([...centers, newCenterData]);
        setNewCenter({
          Name: '',
          Vaccines: '',
          Address: '',
          Contact: '',
        });
      } catch (error) {
        console.error('Error adding center:', error);
      }
    };

    const deleteCenter = async (id) => {
      try {
        await axios.delete(`http://localhost:5168/api/Center/deletecenter${id}`);
        fetchCenters();
      } catch (error) {
        console.error('Error deleting center:', error);
      }
    };

    const updateAndSaveVaccineType = async () => {
      try {
        await axios.put(`http://localhost:5168/api/Center/updatecenter/${selectedVaccineType.id}`, selectedVaccineType);
        console.log('Vaccine type updated successfully!');
        fetchCenters();
        setSelectedVaccineType(null);
      } catch (error) {
        console.error('Error updating vaccine type:', error);
      }
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
          fetchCenters();
        }
      } catch (error) {
        console.error("Error adding data:", error);
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
            <h1> <span>CovidVaccinationSystem</span></h1>
          </div>
          <div className="right-container">
            <Link to="/">Home</Link>
            <Link to="/Info">VCs & Vs</Link>
            {window.localStorage.getItem('role') && (
              <button className='logout-button' onClick={handleLogout}>Logout</button>)}
          </div>
        </nav>
        <div className='container' style={{ marginBottom: '-350px' }}>
          <Sidebar>
            <h1 className='mvc-title'>Manage Vaccination Centers</h1>
            <table className='mvc-table'>
              <thead>
                <tr>
                  <th>Center ID</th>
                  <th>Center Name</th>
                  <th>Vaccine Type</th>
                  <th>Address</th>
                  <th>Contact Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {centers.map((center) => (
                  <tr key={center}>
                    <td>{center.id}</td>
                    <td>{center.name}</td>
                    <td>{center.vaccines}</td>
                    <td>{center.address}</td>
                    <td>{center.contact}</td>

                    <td>




                      <button className='user-btn' onClick={() => deleteCenter(center.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Sidebar>
        </div>
        <div>
          <form style={{ marginLeft: '8%', marginBottom: '-50px' }} onSubmit={addCenter}>
            <h2 className='vctypes' style={{ paddingLeft: '10px' }}>Add Vaccine Centers</h2>
            <br />
            <input
              style={{ width: '20%' }}
              type="text"
              id="CenterName"
              value={newCenter.Name}
              onChange={(e) => setNewCenter({ ...newCenter, Name: e.target.value })}
              placeholder="Center Name"
            />

            <input
              style={{ width: '20%' }}
              type="text"
              id="Address"
              value={newCenter.Address}
              onChange={(e) => setNewCenter({ ...newCenter, Address: e.target.value })}
              placeholder="Address"
            />
            <input
              style={{ width: '20%' }}
              type="text"
              id="ContactInfo"
              value={newCenter.Contact}
              onChange={(e) => setNewCenter({ ...newCenter, Contact: e.target.value })}
              placeholder="Contact Info"
            />
            <button style={{ width: '10%', paddingLeft: '15px', marginLeft: '55px' }} type="submit">Add</button>
          </form>
        </div>









        <div className="container">
          <div className="form-mv" style={{ marginLeft: '15%', widows: '80%', marginTop: '-100px' }}>
            <h2 className='vctypes'> Update Vaccine Center</h2>
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
              value={selectedVaccineType?.address || ''}
              onChange={(e) => setSelectedVaccineType({ ...selectedVaccineType, address: e.target.value })}
              placeholder="Enter Address"
            />
            <input
              type="text"
              value={selectedVaccineType?.contact || ''}
              onChange={(e) => setSelectedVaccineType({ ...selectedVaccineType, contact: e.target.value })}
              placeholder="Enter Contact"
            />
            <button style={{ marginLeft: '30px' }} className='container-btn' onClick={updateAndSaveVaccineType}>Update</button>
          </div>
        </div>










        <div>
          <div >
            <form style={{ marginLeft: '10%' }} onSubmit={handleSubmit} >
              <h2 className='vctypes' style={{ paddingLeft: '10px' }}>Add Vaccine Centers</h2>
              <br />
              <input style={{ width: '20%' }}
                type="text"
                id="VaccineId"
                value={VaccineId}
                onChange={(e) => setVaccineId(e.target.value)}
                placeholder="Vaccine Id"

              />
              <input style={{ width: '20%' }}
                type="text"
                id="centerId"
                value={CenterId}
                onChange={(e) => setCenterId(e.target.value)}
                placeholder="Center Id"

              />
              <button style={{ width: '10%', paddingLeft: '15px', marginLeft: '55px' }} type="submit">Add</button>
            </form> </div>
        </div>



        <footer className="footer text-center" style={{ color: 'rgb(255, 255, 255, 0.438)', paddingLeft: '400px' }}>
          All Rights Reserved by RaWAna. Designed and Developed by <a>RaWAna</a>.
        </footer>
      </div>

    );
  };

  return (
    <Centers />
  );
};

export default MVC;