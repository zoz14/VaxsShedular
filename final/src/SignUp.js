import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmedPassword, setConfirmedPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Nationalid, setNationalid] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    try {
      const response = await fetch("http://localhost:5287/api/Account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: UserName,
          Password: Password,
          ConfirmedPassword: ConfirmedPassword,
          Email: Email,
          NationalId: Nationalid,
          PhoneNumber: PhoneNumber,
        }),
      });

      if (response.ok) {
        navigate("/Login");
      } else {

      }
    } catch (error) {
      console.error("Error during registration:", error);
      window.alert("Registration failed. Please try again later.");

    }
  };


  return (
    <div className="covid-vaccination-system">
      <nav className="navbar">
        <div className="left-container">
          <h1>
            <span>CovidVaccinationSystem</span>
          </h1>
        </div>
        {!window.localStorage.getItem("Email") ? (
          <div className="right-container">
            <Link to="/Info">VCs & Vs</Link>
            <Link to="/">Home</Link>
            <Link to="/Login" className="login-btn">
              Login
            </Link>
          </div>
        ) : (
          <div className="right-container"></div>
        )}
      </nav>
      <form onSubmit={handleSubmit} style={{ paddingBottom: '2.8rem' }}>
        <input
          type="text"
          placeholder="Username"
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={ConfirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="National ID"
          value={Nationalid}
          onChange={(e) => setNationalid(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone"
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button type="submit" style={{ width: '22%', marginLeft: '55px' }}>Register</button>
      </form>
      <footer
        className="footer text-center"
        style={{ color: "rgb(255, 255, 255, 0.438)", paddingLeft: "500px", paddingtop: '15px' }}
      >
        All Rights Reserved by RaWAna. Designed and Developed by <a>RaWAna</a>.
      </footer>
    </div>
  );
};

export default Signup;