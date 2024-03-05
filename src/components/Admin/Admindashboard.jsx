import React, { useState } from 'react';
import "./Educator.css";
import Heading from '../common/heading/Heading';
import AddVideoForm from './AddVideoForm'; 
import CoursesPage from './CoursesPage'; 

function AdminDashboard() {
  const [videoInfo, setVideoInfo] = useState({ title: '', url: '', description: '', videoFile: null });
  const [showForm, setShowForm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your existing submit logic
    console.log('Form submitted', videoInfo);
    // Reset form state or handle success
    setVideoInfo({ title: '', url: '', description: '', videoFile: null });
   
  };

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO NEXTSKILL' title='Best Online Education Expertise' />
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
      </section>
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>
        <button className="dashboard-btn" onClick={() => setShowForm('course')}>Add Course</button>
        <button className="dashboard-btn" onClick={() => setShowForm('video')}>Add Video</button>
        {showForm === 'video' && <AddVideoForm videoInfo={videoInfo} setVideoInfo={setVideoInfo} onSubmit={handleSubmit} />}
        {showForm === 'course' && <CoursesPage />}
      </div>
    </>
  );
}

export default AdminDashboard;
