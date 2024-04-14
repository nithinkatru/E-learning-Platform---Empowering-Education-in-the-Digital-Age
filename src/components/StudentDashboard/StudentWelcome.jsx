import React, { useState } from 'react';
import Heading from '../common/heading/Heading';
import NoticeBoard from '../Superadmin/NoticeBoard';
import IQGame from './IQGame';
import FeaturedCourses from './FeaturedCourses';
import TakeExam from './TakeExam';
import ExploreCourses from './ExploreCourses';
import StudentViewGrades from './StudentViewGrades';
import './StudentWelcome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBookOpen, faClipboard, faListAlt, faGamepad, faPlusCircle, faVideo, faChartLine, faTasks, faEdit, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

function StudentDashboard() {
  const [selectedItem, setSelectedItem] = useState('');

  const handleSidebarItemClick = (section) => {
    setSelectedItem(section);
  };

  const renderSidebar = () => {
    return (
      <div className="sidebar">
        <button className="sidebar-btn" onClick={() => handleSidebarItemClick('FeaturedCourses')}>
          <FontAwesomeIcon icon={faBookOpen} /> Featured Courses
        </button>
        <button className="sidebar-btn" onClick={() => handleSidebarItemClick('ExploreCourses')}>
          <FontAwesomeIcon icon={faBookOpen} /> Explore Courses
        </button>
        <button className="sidebar-btn" onClick={() => handleSidebarItemClick('StudentViewGrades')}>
          <FontAwesomeIcon icon={faClipboard} /> View Grades
        </button>
        <button className="sidebar-btn" onClick={() => handleSidebarItemClick('TakeExam')}>
          <FontAwesomeIcon icon={faListAlt} /> Take Exam
        </button>
        <button className="sidebar-btn" onClick={() => handleSidebarItemClick('NoticeBoard')}>
          <FontAwesomeIcon icon={faBell} /> Notice Board
        </button>
        <button className="sidebar-btn" onClick={() => handleSidebarItemClick('IQGame')}>
          <FontAwesomeIcon icon={faGamepad} /> IQ Game
        </button>
      </div>
    );
  };

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO NEXTSKILL' title='Best Online Education Expertise' />
            <p>Far far away, behind the word mountains...</p>
          </div>
          <button className='primary-btn'>SIGN IN <i className='fa fa-long-arrow-alt-right'></i></button>
          <button className='primary-btn'>SIGN IN <i className='fa fa-long-arrow-alt-right'></i></button>
        </div>
      </section>
      <div className="admin-dashboard-container">
        {renderSidebar()}
        <div className="main-content">
         
          {selectedItem === 'FeaturedCourses' && <FeaturedCourses />}
          {selectedItem === 'ExploreCourses' && <ExploreCourses />}
          {selectedItem === 'StudentViewGrades' && <StudentViewGrades />}
          {selectedItem === 'TakeExam' && <TakeExam />}
          {selectedItem === 'NoticeBoard' && <NoticeBoard />}
          {selectedItem === 'IQGame' && <IQGame />}
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
