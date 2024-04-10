import React, { useState, useEffect } from 'react';
import "../Admin/Educator.css";
import Heading from '../common/heading/Heading';
import AddVideoForm from '../Admin/AddVideoForm';
import CoursesPage from '../Admin/CoursesPage';
import AnalyticsPage from '../Admin/AnalyticsPage';
import CourseForm from '../Admin/CourseForm';
import QuizManager from '../Admin/QuizManager';
import AdminEducatorCRUD from '../Superadmin/AdminEducatorCRUD';
import NoticeBoard from'./NoticeBoard';
import axios from 'axios'; 
import './AdminEducatorCRUD.css' 



function SuperAdminDashboard() {
    console.log('SuperAdminDashboard component rendering');
    const [videoInfo, setVideoInfo] = useState({ title: '', url: '', description: '', videoFile: null });
    const [courseInfo, setCourseInfo] = useState({ _id: null, title: '', description: '', url: '' });
    const [showSection, setShowSection] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [notice, setNotice] = useState('');
    const [educators, setEducators] = useState([]);

    useEffect(() => {
        if (showSection === 'viewEducators') {
          fetchEducators();
        }
      }, [showSection]);
    
      const fetchEducators = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/educators');
          setEducators(response.data);
        } catch (error) {
          console.error('Error fetching educators:', error);
        }
      };
    
     
    console.log('State variables set', { videoInfo, courseInfo, showSection });

    const handleCourseChange = (name, value) => {
        console.log('handleCourseChange called', name, value);
        setCourseInfo(prevCourse => {
            console.log('setCourseInfo called inside handleCourseChange');
            return {
                ...prevCourse,
                [name]: value,
            };
        });
    };
    // Add targetAudience state
    const handleNoticeChange = (e) => {
        const { name, value } = e.target;
        if (name === 'notice') {
          setNotice(value);
        } else if (name === 'targetAudience') {
          setTargetAudience(value);
        }
      };
  
      const handleNoticeSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:5000/api/notices', { message: notice, targetAudience });
          alert('Notice posted successfully');
          setNotice(''); // Reset form
          setTargetAudience(''); // Reset selector
        } catch (error) {
          alert('Failed to post notice');
          console.error('Error posting notice:', error);
        }
      };

    const handleViewAnalyticsClick = () => {
        console.log('handleViewAnalyticsClick called');
        setShowSection('viewAnalytics');
    };

    const renderSidebar = () => {
        console.log('renderSidebar called');
        return (
            <div className="sidebar">
                <button className="sidebar-btn" onClick={() => setShowSection('addCourse')}>Add Course</button>
                <button className="sidebar-btn" onClick={() => setShowSection('addVideo')}>Add Video</button>
                <button className="sidebar-btn" onClick={() => setShowSection('viewCourses')}>View Courses</button>
                <button className="sidebar-btn" onClick={() => setShowSection('viewAnalytics')}>View Analytics</button>
                <button className="sidebar-btn" onClick={() => setShowSection('manageAssignments')}>Manage Assignments</button>
                <button className="sidebar-btn" onClick={() => setShowSection('manageQuizzes')}>Manage Quizzes</button>
                <button className="sidebar-btn" onClick={() => setShowSection('AdminEducatorCRUD')}>AdminEducatorCRUD</button>
              
               
            </div>
        );
    };

   
    const handleCourseSave = async (event) => {
        console.log('handleCourseSave called', courseInfo);
        event.preventDefault();
        const url = courseInfo._id ? `http://localhost:5000/api/courses/${courseInfo._id}` : 'http://localhost:5000/api/courses';
        const method = courseInfo._id ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseInfo),
            });

            const data = await response.json();
            console.log('Course saved:', data);
            setCourseInfo({ _id: null, title: '', description: '', url: '' }); // Reset form
            setShowSection(''); // Optionally clear or change the section after saving
        } catch (error) {
            console.error('Error saving course:', error);
        }
    };

    const renderSection = () => {
        console.log('renderSection called', showSection);
        switch (showSection) {
            case 'addVideo':
                return <AddVideoForm videoInfo={videoInfo} />;
            case 'addCourse':
                return (
                    <CourseForm
                        course={courseInfo}
                        onSave={handleCourseSave}
                        onChange={handleCourseChange}
                        saving={false}
                    />
                );
            case 'viewCourses':
                return <CoursesPage />;
            case 'viewAnalytics':
                return <AnalyticsPage />;
            case 'manageQuizzes':
                return <QuizManager />;
            case 'AdminEducatorCRUD':
                return <AdminEducatorCRUD />;
            case 'NoticeBoard':
                return <NoticeBoard />;
            default:
                console.log('Default section rendering');
                return null; // Or any default view
        }

        
    };
    

    return (
        <>
            <section className='hero'>
                <div className='container'>
                    <div className='row'>
                        <Heading subtitle='WELCOME TO NEXTSKILL' title='Best Online Education Expertise' />
                        <p>Far far away, behind the word mountains...</p>
                    </div>

                    <button className='primary-btn' onClick={handleViewAnalyticsClick}>
                        View Analytics <i className='fa fa-long-arrow-alt-right'></i>
                    </button>

                </div>
            </section>
            
            <div className="admin-dashboard">
                {renderSidebar()}
                <div className="main-content">
                    <h2>Admin Dashboard</h2>
                    {/* Render forms or pages based on the selected section */}
                    {renderSection()} {/* Render the section */}
                </div>
                <form onSubmit={handleNoticeSubmit} style={{ marginTop: '20px' }}>
                  <h3>Post a New Notice</h3>
                  <textarea 
                      name="notice"
                      value={notice} 
                      onChange={handleNoticeChange} 
                      placeholder="Enter notice here..." 
                  />
                  <select name="targetAudience" value={targetAudience} onChange={handleNoticeChange} required>
                    <option value="">Select Audience</option>
                    <option value="educator">Educator</option>
                    <option value="student">Student</option>
                    <option value="all">All</option>
                  </select>
                  <button type="submit">Post Notice</button>
                </form>
            </div>
        </>
    );
}

export default SuperAdminDashboard;
