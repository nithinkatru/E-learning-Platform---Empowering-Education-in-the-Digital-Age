import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import animation library
import Login from './components/Login';
import Signup from './components/Signup';
import admin from './components/Admindashboard'
import videoBg from './Videos/pexels-mikhail-nilov-9199204 (1080p).mp4'

function App() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/src/Images/nextskill_logo.png" alt="NextSkill Logo" height="30" />
          </Link>
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
            <form className="form-inline my-2 my-lg-0">
              <div className="input-group">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                <div className="input-group-append">
                  <button className="btn btn-light" type="submit">Search</button>
                </div>
              </div>
            </form>
            <div className="my-2 my-lg-0 ml-3">
              <Link className="btn btn-outline-light mr-sm-2" to="/login">Login</Link>
              <Link className="btn btn-light" to="/Signup">Sign Up</Link>
              <Link className="btn btn-light" to="/admin">AdminDashboard</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="">
        <div className="hero-video">
        <h1> hi</h1>
         <video src={videoBg} autoPlay loop muted></video>
        </div>
        <div className="container text-center">
          <h1 >Learn Anything, Anytime, Anywhere</h1>
          <p >Join millions of learners around the world.</p>
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
          </motion.div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mt-4">
        <h2>Featured Courses</h2>
        {/* Add featured courses or other content here */}
      </div>

      {/* Netflix-inspired Footer Section */}
      <footer className="footer mt-auto py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <ul className="list-unstyled">
                <li><Link to="#">FAQ</Link></li>
                <li><Link to="#">Investor Relations</Link></li>
                <li><Link to="#">Privacy</Link></li>
                <li><Link to="#">Speed Test</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <ul className="list-unstyled">
                <li><Link to="#">Help Center</Link></li>
                <li><Link to="#">Jobs</Link></li>
                <li><Link to="#">Cookie Preferences</Link></li>
                <li><Link to="#">Legal Notices</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <ul className="list-unstyled">
                <li><Link to="#">Account</Link></li>
                <li><Link to="#">Ways to Watch</Link></li>
                <li><Link to="#">Corporate Information</Link></li>
                <li><Link to="#">Netflix Originals</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <ul className="list-unstyled">
                <li><Link to="#">Media Center</Link></li>
                <li><Link to="#">Terms of Use</Link></li>
                <li><Link to="#">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <img src="/src/Images/nextskill_logo.png" alt="NextSkill Logo" height="30" />
            </div>
            <div className="col-md-6 text-right">
              <span className="text-muted">© 2024 Your E-Learning Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
