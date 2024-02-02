// App.js
import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import animation library
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light navbar-custom"> {/* Changed bg-primary to navbar-custom */}
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="https://www.nextskill.com/staticx/nextskill/images/v6/logo-coral.svg" alt="NextSkill Logo" height="30" />
          </Link>
          {/* Navbar Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
            {/* Search Bar */}
            <form className="form-inline my-2 my-lg-0">
              <div className="input-group">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                <div className="input-group-append">
                  <button className="btn btn-light" type="submit">Search</button>
                </div>
              </div>
            </form>
            {/* Login and Sign Up Buttons */}
            <div className="my-2 my-lg-0 ml-3">
              <Link className="btn btn-outline-light mr-sm-2" to="/login">Login</Link>
              <Link className="btn btn-light" to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="container text-center">
          <h1 className="display-4 text-white">Learn Anything, Anytime, Anywhere</h1>
          <p className="lead text-white">Join millions of learners around the world.</p>
          <motion.div 
            initial={{ opacity: 0, y: -50 }} // Initial animation properties
            animate={{ opacity: 1, y: 0 }} // Animation properties when component mounts
            transition={{ duration: 0.5 }} // Animation duration
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-4">
        <h2>Featured Courses</h2>
        {/* Add featured courses or other content here */}
      </div>
    </div>
  );
}

export default App;
