// Displays notifications for new assignments, upcoming deadlines, forum replies, and personalized messages or reminders.
import React from 'react';

function Notification({ notifications }) {
  if (notifications.length === 0) {
    return <p>No new notifications.</p>;
  }

  return (
    <div className="notification-list">
      {notifications.map((notification, index) => (
        <div key={index} className="notification-item">
          <h4>{notification.title}</h4>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Notification;
