import { Link } from 'react-router-dom';
import './CovidVaccinationSystem.css';
import './Login.js'
import SignUp from './SignUp';

const CovidVaccinationSystem = () => {
  return (
    <div className="covid-vaccination-system">
      <nav className="navbar">
        <div className="left-container">
         <h1> <span>CovidVaccinationSystem</span></h1>
        </div>
        <div className="right-container">
          <Link to="/Info" > <span className="info"></span> VCs & Vs</Link> 
          <Link to="/Login" className="login-btn">Login</Link> 
          <Link to="/SignUp" className="signup-btn">Sign Up</Link>
        </div>
      </nav>
      <main className="content">
        <h1>We’re determined for your better life.</h1>
        <p>You can get the care you need 24/7 - be it online or in person. You will be treated by caring specialist doctors.</p>
        <div className="covid-image">
        </div>
      </main>
      <footer className="footer text-center" style={{color:'rgb(255, 255, 255, 0.438)',paddingLeft:'400px'}}>
    All Rights Reserved by RaWAna. Designed and Developed by <a >RaWAna</a>.
</footer>
    </div>
  );
};

export default CovidVaccinationSystem;
