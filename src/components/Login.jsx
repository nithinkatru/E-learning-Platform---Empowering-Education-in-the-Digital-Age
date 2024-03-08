// Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Css/login.css'; // Import your custom login styles
// import Hero from '../components/home/Hero/hero'; // Import the Hero component

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '' 
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any existing error message
    console.log("after handle submit");
    try {
      console.log("in try");
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      console.log(response.data);
      alert(response.data.message); // Display success message
  
      if (response.data.role === 'educator') {
        window.location.href = '/journal'; // Redirect to admin dashboard
      } else if (response.data.role === 'student') {
        window.location.href = '/studentdashboard'; // Redirect to student dashboard
      } else {
        setErrorMessage('Unknown role'); // Handle unknown roles
      }
  
      console.log("entering catch");
    } catch (error) {
      console.error("Error during login:", error); // Log any errors
      setErrorMessage('Login failed'); // Display error message
    }
  };
  
  return (
    <>
      <div className="container">
        {/* <Hero />  */}
        <div className="row justify-content-center">
          <div className="col-md-6 login-form">
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={credentials.email} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" name="password" value={credentials.password} onChange={handleChange} className="form-control" required />
              </div>
              
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className="mt-2">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
