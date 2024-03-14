// Integrates video conferencing or live streaming capabilities for real-time lectures, workshops, or Q&A sessions with instructors.
import React from 'react';

function LiveLecture({ lectureDetails, onJoin }) {
  return (
    <div className="live-lecture">
      <h2>{lectureDetails.title}</h2>
      <p>{lectureDetails.description}</p>
      <button onClick={() => onJoin(lectureDetails.id)}>Join Live Lecture</button>
    </div>
  );
}

export default LiveLecture;
