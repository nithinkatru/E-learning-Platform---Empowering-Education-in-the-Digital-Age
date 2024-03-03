import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/home/Hero/hero.jsx'// Adjust the import path as necessary
import Login from './components/Login.jsx';
import Signup from './components/Signup';
import Header from "./components/common/header/Header"
import About from "./components/about/About.jsx"
import Contact from "./components/contact/Contact"
import Footer from "./components/common/footer/Footer.jsx"
import Blog from "./components/blog/Blog"
import CourseHome from "./components/allcourses/CourseHome"
import Team from "./components/team/Team"

function App() {
  return (
    <div>
    
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/journal' element={<Blog />} />
        <Route exact path='/courses' element={<CourseHome />} />
        <Route exact path='/team' element={<Team />} />
        

       
          
      
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
