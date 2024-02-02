import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'md5'; // Import MD5 library
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios'; // Import Axios
import '../Css/signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Validate form fields
    const { firstName, lastName, email, phoneNumber, role, password, confirmPassword } = formData;
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phoneNumber.trim() || !role || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // Hash the password using MD5
    const hashedPassword = md5(password);

    try {
      // Make a POST request to your backend API
      const response = await axios.post('http://your-backend-api-url/signup', {
        ...formData,
        password: hashedPassword // Use hashed password for security
      });

      // Reset form fields after successful signup
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
        password: '',
        confirmPassword: ''
      });
      alert('Signup successful!');
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Signup failed. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Sign Up</h1>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select id="role" className="form-control" value={formData.role} onChange={handleChange} name="role">
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="educator">Educator</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
              </form>
              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
