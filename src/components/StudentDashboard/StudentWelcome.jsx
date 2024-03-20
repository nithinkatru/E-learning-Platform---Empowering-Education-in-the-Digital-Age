import React from 'react';
import Heading from '../common/heading/Heading';
import './StudentWelcome.css';

// import ExploreCourses from './ExploreCourses';
import FeaturedCourses from './FeaturedCourses'; // Import the FeaturedCourses component
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

const StudentWelcome = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <>
      <section className='student-hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle="STUDENT PORTAL" title="Unlock Your Learning Potential" />
            <p>Welcome to your learning dashboard. Dive into your courses or explore new learning paths.</p>
            <div className='button'>
            <button className='primary-btn' onClick={() => navigate('/ExploreCourses')}>
  Explore Courses <i className='fa fa-long-arrow-alt-right'></i>
</button>

              <button>
                My Dashboard <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
      {/* Featured Courses Section */}
      <FeaturedCourses />
    </>
  );
};

export default StudentWelcome;
