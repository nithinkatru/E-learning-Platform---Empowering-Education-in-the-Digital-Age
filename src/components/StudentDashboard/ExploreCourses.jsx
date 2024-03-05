import React, { useEffect, useState } from 'react';

function ExploreCourses() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Ensure the URL matches your server configuration
    fetch('http://localhost:5000/api/videos')
      .then(response => {
        // Check for a successful response
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched Videos:', data); // Debugging line to see fetched data
        setVideos(data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div>
      <h2>Explore Courses</h2>
      {videos.length > 0 ? (
        videos.map(video => (
          <div key={video._id}> {/* Ensure your documents have _id field */}
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            {/* Display video URL or embedded player */}
            <a href={video.url} target="_blank" rel="noopener noreferrer">Watch Video</a>
          </div>
        ))
      ) : (
        <p>No videos available.</p>
      )}
    </div>
  );
}

export default ExploreCourses;
