import React, { useState, useEffect } from 'react';
import './NoticeBoard.css';

// Pass a prop to define the audience for this NoticeBoard instance
// For example, for the student dashboard, you might pass audience="student" when using this component
function NoticeBoard({ audience }) {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notices');
        if (response.ok) {
          const allNotices = await response.json();
          // Filter notices based on the audience. Assuming each notice includes a targetAudience field
          const filteredNotices = allNotices.filter(notice => 
            notice.targetAudience === audience || notice.targetAudience === 'all'
          );
          setNotices(filteredNotices);
        } else {
          console.error('Failed to fetch notices');
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, [audience]); // Adding audience as a dependency so the effect reruns if the audience prop changes

  return (
    <div className="notice-board">
      <h2>Notices</h2>
      {notices.length > 0 ? (
        <ul>
          {notices.map((notice, index) => (
            <li key={index}>{notice.message}</li>
          ))}
        </ul>
      ) : (
        <p>No notices to display.</p>
      )}
    </div>
  );
}

export default NoticeBoard;
