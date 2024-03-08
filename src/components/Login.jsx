import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import '../components/home/Hero/Hero.css'
import '../Css/login.css'


const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '' 
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any existing error message
    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
  
      // Check if login was successful based on your backend response structure
      if (response.data && response.data.message === 'Login successful') {
        alert('Login successful!'); // Display success message
        
        // Assuming the response includes the user object with role
        const { role } = response.data.user;
    
        // Redirect based on the role
        if (role === 'student') {
          navigate('/StudentDashboard'); // Adjust the path as necessary
        } else if (role === 'admin') {
          navigate('/AdminDashboard'); // Adjust the path as necessary
        } else {
          navigate('/'); // Redirect to a default route or show an error
        }
      } else {
        // Handle login failure (e.g., wrong credentials)
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle backend validation messages (e.g., user not found or wrong password)
        setErrorMessage(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        setErrorMessage('No response from server');
      } else {
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
