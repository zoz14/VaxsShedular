import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CovidVaccinationSystem.css';
import './Info.css';

function Info() {
  const navigate = useNavigate();

  const handleReservation = () => {
    try {
      const isLoggedIn = !!localStorage.getItem('token');

      if (isLoggedIn) {
        navigate('/patient-dashboard');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  return (
    <>
      <div className="covid-vaccination-system">
        <nav className="navbar">
          <div className="left-container">
            <h2> <span>CovidVaccinationSystem</span></h2>
          </div>
          <div className="right-container">
            <Link to="/">Home</Link>
            <Link to="/Login" className='login-btn'>Login</Link>
            <Link to="/SignUp" className="signup-btn">Sign Up</Link>
          </div>
        </nav>
        <main className="VaccinationCentersAndVaccines">
          <div>
            <h2 style={{ color: 'rgb(167, 88, 97)', textAlign: 'center', paddingright: '20px' }}>  Vaccination Centers Benefits</h2>
            <br />
            <br />
          </div>
          <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.5', color: 'whitesmoke' }}>
            Vaccination centers play a crucial role in safeguarding public health by administering vaccines to individuals of all ages.
            <br /> These centers serve as hubs for disease prevention, immunity building and community well-being. <br />Let’s explore their significance:
            <br /> <br /> <br />
          </div>

          <ol>
            <li className='li-v' >
              <strong className='benefits'>Accessible Locations: </strong>
              <p> Vaccination centers are strategically located in
                communities, hospitals, clinics, and mobile units.
                <br /> Their accessibility ensures that everyone, regardless of socioeconomic status,
                can receive life-saving vaccines.</p>
            </li>
            <br />
            <li className='li-v'>
              <strong className='benefits'>Expert Guidance:</strong>
              <p>Highly trained healthcare professionals staff these centers.
                <br />They provide accurate information, address concerns, and guide individuals through the vaccination process.
                <br />From infants to seniors, everyone benefits from their expertise.</p>
            </li>
            <br />
            <li className='li-v'>
              <strong className='benefits'>Vaccine Administration:</strong>
              <p> Vaccination centers offer a wide range of vaccines,
                including routine childhood immunizations, flu shots, travel vaccines, and
                specialized vaccines for specific diseases.
                <br /> They follow strict protocols to ensure safe and effective administration.</p>
            </li>
            <br />
            <li className='li-v' >

              <strong className='benefits'>Timely Immunization:</strong>
              <p>Centers emphasize timely vaccination schedules.
                <br />Whether it’s the first dose for an infant or a booster shot for an adult,
                they track individual records and send reminders to maintain immunity levels.</p>

            </li>
            <br />

            <li className='li-v'>
              <strong className='benefits'>Community Protection:</strong>
              <p>By achieving high vaccination rates, these centers contribute to herd immunity.
                <br />When a significant portion of the population is immune,
                it protects vulnerable individuals who cannot receive vaccines due to medical reasons.</p>
            </li>
            <br />
            <li className='li-v'>
              <strong className='benefits'>COVID-19 Vaccination Efforts:</strong>
              <p>During the pandemic, vaccination centers played a pivotal role in administering COVID-19 vaccines.
                <br /> They facilitated mass vaccination campaigns, educated the public, and helped curb the spread of the virus.</p>
            </li>
            <br />
            <li className='li-v'>
              <strong className='benefits'>Collaboration and Outreach:</strong>
              <p>Vaccination centers collaborate with schools, workplaces, and community organizations.
                <br /> They organize outreach programs, school-based clinics, and awareness campaigns to reach diverse populations.</p>
            </li>
            <br />
            <li className='li-v'>
              <strong className='benefits'> Vaccine Confidence:</strong>
              <p>Building trust is essential.      <br />
                Centers address vaccine hesitancy by providing evidence-based information, dispelling myths, and emphasizing the safety and efficacy of vaccines.</p>
            </li>
            <br />
            <li className='li-v'>
              <strong className='benefits'>Future Preparedness:</strong>
              <p>These centers remain vigilant, monitoring disease outbreaks and adapting vaccination strategies.
                <br />They contribute to global health security by staying prepared for emerging threats.</p>
            </li>
            <br />
          </ol>
          <p>  <br />Remember, vaccination centers are not just physical spaces; they represent hope, resilience, and a commitment to a healthier world.
            <br /> Let’s appreciate their tireless efforts in protecting us all.</p>
          <h3 className='centerNotation' style={{ color: 'rgb(167, 88, 97)' }}> Here are our vaccination centers and the vaccines:</h3>
          <div className='center' >
            <div className='description'>
              <h3 style={{ color: 'rgb(167, 88, 97)' }}> VaxHub
              </h3>
              <ul>
                <li> <strong>Location:</strong> 15 Ahmed Kamel street, kafrElElu, Helwan
                </li>
                <li> <strong>Operating Hours:</strong> 14 hrs, from 8 A.M to 10 P.M
                </li>
                <li> <strong>Reservation:</strong> Online from our website
                </li>
                <li> <strong>Vaccine types:</strong>
                  <ul>
                    <li className='type'> Astrazeneca</li>
                    <li className='type'> Sinopharm</li>
                    <li className='type'> Novavax</li>
                  </ul>
                </li>
              </ul>
              <button className='info-btn' onClick={handleReservation}>Reserve Vaccine Now</button>
            </div>
            <div className="VaxHub-image"></div>

          </div>
          <div className='center'>
            <div className='description'>
              <h3 style={{ color: 'rgb(167, 88, 97)' }}> ImmuCare Clinic </h3>
              <ul>
                <li> <strong>Location:</strong> 10 Mostafa Kamel,First Settlement, New Cairo
                </li>
                <li> <strong>Operating Hours:</strong> 14 hrs, from 8 A.M to 10 P.M
                </li>
                <li> <strong>Reservation:</strong> Online from our website
                </li>
                <li> <strong>Vaccine types:</strong>
                  <ul>
                    <li className='type'> Astrazeneca</li>
                    <li className='type'> Moderna</li>
                    <li className='type'> Fizer</li>
                  </ul>
                </li>
              </ul>
              <button className='info-btn' onClick={handleReservation}>Reserve Vaccine Now</button>

            </div>
            <div className="ImmuCareClinic-image"></div>
          </div>
          <div className='center' >
            <div className='description'>
              <h3 style={{ color: 'rgb(167, 88, 97)' }}> SafeArm Clinic </h3>
              <ul>
                <li> <strong>Location:</strong> 6 ElMatarya street, ElMatarya, Cairo
                </li>
                <li> <strong>Operating Hours:</strong> 12 hrs, from 8 A.M to 8 P.M
                </li>
                <li> <strong>Reservation:</strong> Online from our website
                </li>
                <li> <strong>Vaccine types:</strong>
                  <ul>
                    <li className='type'> Novavax</li>
                    <li className='type'> Sinopharm</li>
                    <li className='type'> Fizer</li>
                  </ul>
                </li>
              </ul>
              <button className='info-btn' onClick={handleReservation}>Reserve Vaccine Now</button>

            </div>
            <div className="SafeArmClinic-image"></div>
          </div> <footer className="footer text-center" style={{ color: 'rgb(255, 255, 255, 0.438)', paddingLeft: '300px' }}>
            All Rights Reserved by RaWAna. Designed and Developed by <a >RaWAna</a>.
          </footer>
        </main>
      </div>
    </>

  )

};

export default Info;

