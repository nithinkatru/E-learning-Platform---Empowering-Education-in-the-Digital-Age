import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../components/home/Hero/Hero.css'
import '../Css/login.css'

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
      // Directly calling axios without assigning the response to a variable
      await axios.post('http://localhost:5000/api/login', credentials);

      alert('Login successful!'); // Display success message
      // Actions like redirecting the user or updating global state can be placed here
      console.log("entering catch");
    } catch (error) {
      console.log("in catch before if");
      if (error.response) {
        console.log("in catch after if");
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(error.response.data);
        console.log(error.response.data);
      } else if (error.request) {
        console.log("in catch");
        // The request was made but no response was received
        setErrorMessage('No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
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
            Don't have an account? <Link to="/admindashboard">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
