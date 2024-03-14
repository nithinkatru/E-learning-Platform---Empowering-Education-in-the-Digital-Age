// Generates a customized learning path for students based on their interests, goals, and past learning behaviors.

import React from 'react';

function LearningPath({ pathDetails }) {
  return (
    <div className="learning-path">
      <h2>Your Personalized Learning Path</h2>
      <ol>
        {pathDetails.courses.map((course, index) => (
          <li key={index}>
            {course.title} - {course.estimatedTime}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default LearningPath;
