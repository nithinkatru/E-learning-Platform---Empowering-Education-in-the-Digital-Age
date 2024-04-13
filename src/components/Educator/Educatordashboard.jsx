import React, { useState } from 'react';
import "./Educator.css";
import Heading from '../common/heading/Heading';
import AddVideoForm from './AddVideoForm';
import CoursesPage from './CoursesPage';
import AnalyticsPage from './AnalyticsPage';
import CourseForm from './CourseForm';
import QuizManager from './QuizManager'; // Assuming this is your form for adding/editing courses
import { Link } from 'react-router-dom';
import NoticeBoard from'../Superadmin/NoticeBoard';
import EducatorReleaseGrades from './EducatorReleaseGrades';

function AdminDashboard() {
    const [videoInfo, setVideoInfo] = useState({ title: '', url: '', description: '', videoFile: null });
    const [courseInfo, setCourseInfo] = useState({ _id: null, title: '', description: '', url: '' });
    const [showSection, setShowSection] = useState('');

    const handleCourseChange = (name, value) => {
        setCourseInfo(prevCourse => ({
            ...prevCourse,
            [name]: value,
        }));
    };  

    const renderSidebar = () => {
        return (
            <div className="sidebar">
                <button className="sidebar-btn" onClick={() => setShowSection('addCourse')}>Add Course</button>
                <button className="sidebar-btn" onClick={() => setShowSection('addVideo')}>Add Video</button>
                <button className="sidebar-btn" onClick={() => setShowSection('viewCourses')}>View Courses</button>
                <button className="sidebar-btn" onClick={() => setShowSection('viewAnalytics')}>View Analytics</button>
                <button className="sidebar-btn" onClick={() => setShowSection('manageAssignments')}>Manage Assignments</button>
                <button className="sidebar-btn" onClick={() => setShowSection('manageQuizzes')}>Manage Quizzes</button>
                <button className="sidebar-btn" onClick={() => setShowSection('EducatorReleaseGrades')}>EducatorReleaseGrades</button>

            </div>
        );
    };

    const handleCourseSave = async (event) => {
        event.preventDefault();
        console.log('Saving course:', courseInfo);
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

    return (
        <>
            <section className='hero'>
                <div className='container'>
                    <div className='row'>
                        <Heading subtitle='WELCOME TO NEXTSKILL' title='Best Online Education Expertise' />
                        <p>Far far away, behind the word mountains...</p>
                    </div>

                    <button className='primary-btn'>
                SIGN IN <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button className='primary-btn'>
                SIGN IN <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              
                    

                </div>
                
            </section>
            <div className="admin-dashboard">
                {renderSidebar()}
                <div className="main-content">
                    <h2>Educator Dashboard</h2>
                    <div className="notice-sidebar" style={{ width: '70em' }}>
                    <NoticeBoard />
                </div>
                    {/* Render forms or pages based on the selected section */}
                    {showSection === 'addVideo' && <AddVideoForm videoInfo={videoInfo} />}
                    {showSection === 'addCourse' && (
                        <CourseForm 
                            course={courseInfo} 
                            onSave={handleCourseSave} 
                            onChange={handleCourseChange} 
                            saving={false}
                        />
                    )}
                    {showSection === 'viewCourses' && <CoursesPage />}
                    {showSection === 'viewAnalytics' && <AnalyticsPage />}
                    {showSection === 'QuizManager' && <QuizManager />}
                    {showSection === 'EducatorReleaseGrades' && <EducatorReleaseGrades />}
                    
                </div>
            </div>

        </>
    );
}

export default AdminDashboard;
