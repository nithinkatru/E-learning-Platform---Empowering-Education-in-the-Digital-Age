import React, { useEffect, useState } from 'react';

function ExploreCourses() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/videos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setVideos(data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  return (
    <div>
      <h2>Explore Courses</h2>
      {videos.length > 0 ? (
        videos.map(video => (
          <div key={video._id} style={{ marginBottom: '20px' }}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            {/* Optional: Check if you have a video file URL and display a video player */}
            {video.videoFile && (
              <video controls src={`http://localhost:5000/uploads/${video.videoFile}`} style={{ width: '100%', maxHeight: '400px' }}>
                Your browser does not support the video tag.
              </video>
            )}
            {/* If you also have an external video URL, you can include a link to it */}
            {video.url && (
              <div>
                <a href={video.url} target="_blank" rel="noopener noreferrer">Watch Video</a>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No videos available.</p>
      )}
    </div>
  );
}

export default ExploreCourses;
