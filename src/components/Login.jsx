import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../Css/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Validate username and password
    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password.');
      return;
    }

    // Add your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // You can add your authentication logic here
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Login</h1>
              <form onSubmit={handleSubmit} noValidate> {/* Add noValidate attribute */}
                <div className="form-group row align-items-center">
                  <label htmlFor="username" className="col-sm-3 col-form-label">Username</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
              {/* Add a link to signup */}
              <p className="text-center mt-3">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
