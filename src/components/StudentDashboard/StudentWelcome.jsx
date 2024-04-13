import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Assuming this is your Sidebar component
import Heading from '../common/heading/Heading';
import NoticeBoard from '../Superadmin/NoticeBoard';
import IQGame from './IQGame'; // Import the IQGame component
import './StudentWelcome.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBookOpen, faClipboard, faListAlt, faGamepad } from '@fortawesome/free-solid-svg-icons';

const sidebarItems = [
  { label: 'ExploreCourses', icon: <FontAwesomeIcon icon={faBookOpen} />, path: '/ExploreCourses' },
  { label: 'StudentViewGrades', icon: <FontAwesomeIcon icon={faClipboard} />, path: '/StudentViewGrades' },
  { label: 'TakeExam', icon: <FontAwesomeIcon icon={faListAlt} />, path: '/TakeExam' },
  { label: 'NoticeBoard', icon: <FontAwesomeIcon icon={faBell} />, path: '/NoticeBoard' },
  { label: 'IQGame', icon: <FontAwesomeIcon icon={faGamepad} />, path: '/IQGame' },
];

function StudentDashboard() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSidebarItemClick = (path, event) => {
    event.preventDefault(); // Prevent the default link behavior
    setSelectedItem(path);
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
        <Sidebar items={sidebarItems} onItemClick={(item) => handleSidebarItemClick(item.path)} />
        <div className="main-content">
          <h2>Student Dashboard</h2>
          <div className="notice-sidebar" style={{ width: '70em' }}>
            <NoticeBoard />
          </div>
          {/* Render other components based on the selected section */}
          {selectedItem === '/IQGame' && <IQGame />}
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
