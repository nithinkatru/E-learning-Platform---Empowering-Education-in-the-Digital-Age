import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../src/UserContext'; // Adjust the import path as needed

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  console.log("Login Component Rendered");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(`Field ${e.target.name} updated to: ${e.target.value}`);
  };

  // Inside your Login component
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/login', credentials);
    console.log('Login successful', response.data);
    setUser(response.data); // Set user data in context
    localStorage.setItem('user', JSON.stringify(response.data)); // Also set user data in localStorage
    navigateToDashboard(response.data.role);
  } catch (error) {
    console.error('Login failed:', error.response?.data || 'Login failed. Please try again.');
    setErrorMessage(error.response?.data || 'Login failed. Please try again.');
  }
};


  const navigateToDashboard = (role) => {
    console.log(`Navigating to ${role} dashboard`);
    if (role === 'educator') {
      navigate('/Educatordashboard');
    } else if (role === 'student') {
      navigate('/StudentDashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;
