import React, { useState } from 'react';
import '../Css/Admin.css';



function AdminDashboard() {
  const [videoInfo, setVideoInfo] = useState({
    title: '',
    url: '',
    description: '', // Adding a description property
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission to your backend
    console.log('Submitting video info:', videoInfo);
    // Reset form after submission
    setVideoInfo({ title: '', url: '', description: '' });
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard - Add Video</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Video Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={videoInfo.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="url">Video URL:</label>
          <input
            type="url"
            id="url"
            name="url"
            value={videoInfo.url}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={videoInfo.description}
            onChange={handleChange}
            required
            rows="4"
          ></textarea>
        </div>
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
}

export default AdminDashboard;
