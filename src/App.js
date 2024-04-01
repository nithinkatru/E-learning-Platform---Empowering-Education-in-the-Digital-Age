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
// import Blog from "./components/blog/Blog"
import CourseHome from "./components/allcourses/CourseHome"
import Team from "./components/team/Team"
import AdminDashboard from './components/Admin/Admindashboard.jsx';
import Coursespage from './components/Admin/CoursesPage.jsx';
import StudentDashboard from './components/StudentDashboard/StudentWelcome.jsx';
import ExploreCourses from "./components/StudentDashboard/ExploreCourses.jsx";
import AnalyticsPage from "./components/Admin/AnalyticsPage.jsx";
import SuperAdmin from "./components/Superadmin/Superadmin.jsx";






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
        {/* <Route exact path='/journal' element={<Blog />} /> */}
        <Route exact path='/journal' element={<AdminDashboard />} />
        <Route exact path='/coursespage' element={<Coursespage />} />
        <Route exact path='/StudentDashboard' element={<StudentDashboard />} />
        <Route exact path='/ExploreCourses' element={<ExploreCourses />} />       
        <Route exact path='/courses' element={<CourseHome />} />
        <Route exact path='/team' element={<Team />} />
        <Route exact path='/AnalyticsPage' element={<AnalyticsPage />} />
        <Route exact path='/SuperAdmin' element={<SuperAdmin />} />
        


       
          
      
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
