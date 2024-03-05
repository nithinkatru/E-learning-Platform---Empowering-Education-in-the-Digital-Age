import React, { useState } from 'react';
import "./Educator.css";

function AddVideoForm() {
    const [videoInfo, setVideoInfo] = useState({
      title: '',
      url: '',
      description: '',
      videoFile: null, // Initial state for the file
    });
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (files) {
        setVideoInfo({ ...videoInfo, videoFile: files[0] }); // Handle file input
      } else {
        setVideoInfo({ ...videoInfo, [name]: value }); // Handle other inputs
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(); // Use FormData to handle file uploads
      formData.append('title', videoInfo.title);
      formData.append('url', videoInfo.url);
      formData.append('description', videoInfo.description);
      if (videoInfo.videoFile) {
        formData.append('videoFile', videoInfo.videoFile); // Append the file
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/videos', {
          method: 'POST',
          body: formData, // Send as FormData
          // Note: Don't set 'Content-Type' header when sending FormData,
          // the browser will set it along with the correct boundary.
        });
        if (response.ok) {
          console.log('Video uploaded successfully');
          setVideoInfo({ title: '', url: '', description: '', videoFile: null }); // Reset form
          alert('Video uploaded successfully');
        } else {
          console.error('Upload failed');
          alert('Upload failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error submitting form');
      }
    };
  return (
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
      <div>
        <label htmlFor="videoFile">Video File:</label>
        <input
          type="file"
          id="videoFile"
          name="videoFile"
          accept="video/*"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Video</button>
    </form>
  );
}

export default AddVideoForm;
