import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react'; // Import QRCode component
import '../Css/login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    otp: '', // New field for OTP
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showQRCode, setShowQRCode] = useState(false); // State to toggle QR code visibility
  const [qrImage, setQrImage] = useState('');

  useEffect(() => {
    // Fetch QR code image when showQRCode state changes
    if (showQRCode) {
      axios.get('/qrImage')
        .then(response => {
          setQrImage(response.data.image);
        })
        .catch(error => {
          console.error('Error fetching QR code image:', error);
        });
    }
  }, [showQRCode]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any existing error message
    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      alert(response.data.message); // Display success message

      // Redirect based on role
      if (response.data.role === 'educator') {
        window.location.href = '/educatordashboard'; // Adjust the redirect URL as needed
      } else if (response.data.role === 'student') {
        window.location.href = '/studentdashboard'; // Adjust the redirect URL as needed
      } else {
        setErrorMessage('Unknown role'); // Handle unknown roles
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage('Login failed'); // Display error message
    }
  };

  const handleEnable2FA = async (e) => {
    e.preventDefault();
    setShowQRCode(true); // Show QR code when enabling 2FA
  };

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <h1>Welcome to NextSkill LoginPage</h1>
            <p>Far far away, behind the word mountains...</p>
          </div>
          <div className='button'>
            <button className='primary-btn' onClick={() => { }}>
              SIGN IN <i className='fa fa-long-arrow-alt-right'></i>
            </button>
            <button className='primary-btn' onClick={() => { }} >
              LOGIN <i className='fa fa-long-arrow-alt-right'></i>
            </button>
          </div>
        </div>
      </section>

      <div className="container">
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
              {/* New OTP field */}
              <div className="form-group">
                <label>OTP:</label>
                <input type="text" name="otp" value={credentials.otp} onChange={handleChange} className="form-control" required />
              </div>

              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {showQRCode ? (
              <div>
                <QRCode value={qrImage} />
                <form onSubmit={handleEnable2FA}>
                  <div className="form-group">
                    <label>Enter OTP:</label>
                    <input type="text" name="otp" value={credentials.otp} onChange={handleChange} className="form-control" required />
                  </div>
                  <button type="submit" className="btn btn-primary">Enable 2FA</button>
                </form>
              </div>
            ) : (
              <button onClick={handleEnable2FA} className="btn btn-primary">Enable 2FA</button>
            )}
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
