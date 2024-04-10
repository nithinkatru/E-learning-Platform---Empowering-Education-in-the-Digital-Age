import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', otp: '' });
  console.log("Initial credentials state:", credentials);

  const [errorMessage, setErrorMessage] = useState('');
  console.log("Initial errorMessage state:", errorMessage);

  const [require2FA, setRequire2FA] = useState(false);
  console.log("Initial require2FA state:", require2FA);

  const [tempToken, setTempToken] = useState('');
  console.log("Initial tempToken state:", tempToken);

  const [qrImage, setQrImage] = useState('');
  console.log("Initial qrImage state:", qrImage);

  const handleChange = (e) => {
    console.log(`Input change detected. Field: ${e.target.name}, Value: ${e.target.value}`);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log("Updated credentials state:", credentials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted with credentials:", credentials);
    setErrorMessage('');
    try {
      console.log("Attempting to log in...");
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      console.log("Login response:", response);

      if (response.data.require2FA) {
        console.log("2FA required, setting up...");
        setRequire2FA(true);
        setTempToken(response.data.tempToken);
        console.log("TempToken for 2FA:", tempToken);
        fetchQRCode();
      } else {
        console.log("Login successful, no 2FA required.");
        alert('Login successful');
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage('Login failed');
    }
  };

  const fetchQRCode = async () => {
    console.log("Fetching QR code for 2FA...");
    try {
      const qrResponse = await axios.get('http://localhost:5000/api/qrImage', {
        headers: { Authorization: `Bearer ${tempToken}` },
      });
      console.log("QR code fetch response:", qrResponse);
      setQrImage(qrResponse.data.image);
    } catch (error) {
      console.error("Error fetching QR code:", error);
      setErrorMessage('Failed to fetch QR code');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    console.log("Verifying OTP...");
    try {
      const response = await axios.post('http://localhost:5000/api/verifyOTP', {
        email: credentials.email,
        otp: credentials.otp,
      }, {
        headers: { Authorization: `Bearer ${tempToken}` },
      });
      console.log("OTP verification response:", response);
      alert(response.data.message);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage('OTP verification failed');
    }
  };
  return (
    <>
      {require2FA ? (
        <div>
          <QRCode value={qrImage || ' '} />
          <form onSubmit={handleVerifyOTP}>
            <div className="form-group">
              <label>Enter OTP:</label>
              <input type="text" name="otp" value={credentials.otp} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">Verify OTP</button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
      )}
    </>
  );
};

export default Login;
