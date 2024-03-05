import React from "react";
import Heading from "../common/heading/Heading";
import "./StudentWelcome.css"; // Ensure you rename the CSS file accordingly
import ExploreCourses from "./ExploreCourses"

const StudentWelcome = () => {
  return (
    <>
      <section className='student-hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle="STUDENT PORTAL" title="Unlock Your Learning Potential" />
            <p>Welcome to your learning dashboard. Dive into your courses or explore new learning paths.</p>
            <div className='button'>
            <button className='primary-btn' onClick={'/ExploreCourses'}>
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
    </>
  );
};

export default StudentWelcome;
