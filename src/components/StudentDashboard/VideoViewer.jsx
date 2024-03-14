import React, { useState, useEffect } from 'react';

function VideoViewer({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(videos[0] || null);

  useEffect(() => {
    // This effect updates the selected video if videos array changes and the previously selected video is no longer available.
    if (!videos.find(video => video.id === selectedVideo?.id)) {
      setSelectedVideo(videos[0] || null);
    }
  }, [videos, selectedVideo]);

  if (videos.length === 0) {
    return <div>No videos available for this course.</div>;
  }

  const handleVideoSelection = (videoId) => {
    const video = videos.find(v => v.id === videoId);
    setSelectedVideo(video);
  };

  return (
    <div className="video-viewer">
      <div className="video-list">
        {videos.map(video => (
          <button key={video.id} onClick={() => handleVideoSelection(video.id)} className={selectedVideo.id === video.id ? 'active' : ''}>
            {video.title}
          </button>
        ))}
      </div>
      <div className="video-player">
        {selectedVideo ? (
          <div>
            <h3>{selectedVideo.title}</h3>
            <video controls src={selectedVideo.url} style={{ width: '100%' }}>
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <p>Select a video to watch.</p>
        )}
      </div>
    </div>
  );
}

export default VideoViewer;
