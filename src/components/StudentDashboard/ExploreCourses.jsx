import React, { useEffect, useState, useRef } from 'react';
import './ExploreCourses.css';
import Back from "../common/back/Back"


function ExploreCourses() {
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null); // State for the selected video
  const videoElementsRef = useRef({});

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(data => {
        setCourses([{ _id: 'All', title: 'All Courses' }, ...data]);
      })
      .catch(error => console.error('Error fetching courses:', error));

    fetch('http://localhost:5000/api/videos')
      .then(response => response.json())
      .then(data => {
        setVideos(data);
      })
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  const filteredVideos = selectedCourse === 'All' ? videos : videos.filter(video => video.courseId === selectedCourse);

  // Function to handle video selection
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  // Render the selected video in a larger view
  const renderSelectedVideo = () => (
    <div className="selected-video-container">
      <video
        src={`http://localhost:5000/${selectedVideo.videoFile.replace('\\', '/')}`}
        controls
        autoPlay
        style={{ width: '100%', maxHeight: '80vh' }}
      />
      <h3>{selectedVideo.title}</h3>
      <p>{selectedVideo.description}</p>
      <button onClick={() => setSelectedVideo(null)}>Close</button>
    </div>
  );

  return (
    <>
  
      
  <Back title='Explore Courses' />
      {/* Main Content */}
      <div className="explore-courses-layout">
        <aside className="sidebar">
          <h3>Courses</h3>
          <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
            {courses.map(course => (
              <option key={course._id} value={course._id}>{course.title}</option>
            ))}
          </select>
        </aside>
        <div className="videos-container">
          {selectedVideo ? (
            renderSelectedVideo()
          ) : (
            filteredVideos.length > 0 ? (
              filteredVideos.map(video => (
                <div key={video._id} className="video-preview" onClick={() => handleVideoSelect(video)}>
                  <video
                    ref={el => videoElementsRef.current[video._id] = el}
                    src={`http://localhost:5000/${video.videoFile.replace('\\', '/')}`}
                    muted
                    loop
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div className="video-info">
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No videos available for this course.</p>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default ExploreCourses;
