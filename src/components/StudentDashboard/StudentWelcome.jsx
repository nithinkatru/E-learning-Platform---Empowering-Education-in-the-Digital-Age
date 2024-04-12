// StudentWelcome.jsx
import React from 'react';
import Sidebar from './Sidebar'; // Ensure this is the correct path to your Sidebar component
import Heading from '../common/heading/Heading';
import './StudentWelcome.css'; // Ensure this CSS file exists and styles are correctly defined
import NoticeBoard from '../StudentDashboard/NoticeBoard';
import FeaturedCourses from './FeaturedCourses';
import ExploreCourses from './ExploreCourses';
import StudentViewGrades from './StudentViewGrades';
import TakeExam from './TakeExam';
// Define the sidebar items for the student dashboard
const sidebarItems = [
  { label: 'ExploreCourses', path: '/ExploreCourses' }, // Adjust paths as needed
  { label: 'StudentViewGrades', path: '/StudentViewGrades' },
  { label: 'TakeExam', path: '/TakeExam' },
  // Add more sidebar items as needed
];

const StudentWelcome = () => {
  return (
    <div className="admin-dashboard-container">
      <Sidebar items={sidebarItems} />
      <div className="main-content">
        <section className='student-hero'>
          <div className='container'>
            <Heading subtitle="STUDENT PORTAL" title="Unlock Your Learning Potential" />
            <p>Welcome to your learning dashboard. Dive into your courses or explore new learning paths.</p>
          </div>
        </section>
        <NoticeBoard />
        <FeaturedCourses />
        
        

        {/* You might want to include <ExploreCourses /> and <StudentViewGrades /> here or handle them through routing */}
      </div>
    </div>
  );
};

export default StudentWelcome;
