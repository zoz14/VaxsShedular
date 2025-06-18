import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";




function Login() {
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [role, setUserRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    try {
      const response = await axios.post("http://localhost:5287/api/Account/Login", { Email, Password });

      const { data } = response;

      if (data.token) {
        const { token, role } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        setIsLoggedIn(true);

        if (role === "Patient") {

          navigate("/patient-dashboard");
          console.log("Login successful");
          window.alert("Login successful");

        } else if (role === "Admin") {
          navigate("/admin-dashboard");
        }
        else if (role === "CenterA") {
          navigate("/VaxHub");
        }
        else if (role === "CenterB") {
          navigate("/ImmuCare");
        } else if (role === "CenterC") {
          navigate("/SafeArm");
        }
      } else {
        setError("Invalid email or password");
        console.error("Login failed");
        window.alert("Invalid email or password, Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      window.alert("Error during login, Please try again later");
    }
  };




  return (<>
    <div className='covid-vaccination-system'>
      <nav className='navbar'>
        <div className='left-container'>
          <h1>
            {" "}
            <span>CovidVaccinationSystem</span>
          </h1>
        </div>
        {!isLoggedIn ? (
          <div className='right-container'>
            <Link to='/'>Home</Link>
            <Link to='/SignUp' className='signup-btn'>
              Sign Up
            </Link>
          </div>
        ) : (
          <div className='right-container'></div>
        )}
      </nav>
      <form onSubmit={handleSubmit} style={{ paddingLeft: '35px' }}>
        {!isLoggedIn ? (
          <>
            <label htmlFor='Email'>Email:</label>
            <input
              id='Email'
              name='Email'
              type='email'
              placeholder='Email'
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='Password'>Password:</label>
            <input
              id='Password'
              name='Password'
              type='password'
              placeholder='Password'
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {Error && (
              <p
                className='error'
                style={{ color: "red", fontSize: "12px", marginTop: "0px" }}
              >
                {Error}
              </p>
            )}

            <button style={{ width: '20%', marginleft: '95px' }} type='submit'>Login</button>
          </>
        ) : (
          <div className='right-container'></div>
        )}
      </form> <footer class="footer text-center" style={{ color: 'rgb(255, 255, 255, 0.438)', paddingLeft: '430px' }}>
        All Rights Reserved by RaWAna. Designed and Developed by <a >RaWAna</a>.
      </footer>
    </div>

  </>
  );
}

export default Login;