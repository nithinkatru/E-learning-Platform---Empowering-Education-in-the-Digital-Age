import React, { useState } from 'react';
import "./Educator.css";
import Heading from '../common/heading/Heading';
import AddVideoForm from './AddVideoForm';
import CoursesPage from './CoursesPage';
import AnalyticsPage from './AnalyticsPage';
import CourseForm from './CourseForm'; // Assuming this is your form for adding/editing courses

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
                </div>
            </section>

            <div className="admin-dashboard">
                <h2>Admin Dashboard</h2>
                <button className="dashboard-btn" onClick={() => setShowSection('addCourse')}>Add Course</button>
                <button className="dashboard-btn" onClick={() => setShowSection('addVideo')}>Add Video</button>
                <button className="dashboard-btn" onClick={() => setShowSection('viewCourses')}>View Courses</button>
                <button className="dashboard-btn" onClick={() => setShowSection('viewAnalytics')}>View Analytics</button>

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
            </div>
        </>
    );
}

export default AdminDashboard;
