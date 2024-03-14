// A component that provides detailed information about a course, including its syllabus, instructor information, user reviews, and a button for enrollment.

import React from 'react';


function CourseOverview({ course }) {
  return (
    <div className="course-overview">
      <h2>{course.title}</h2>
      <img src={course.instructor.avatar} alt="Instructor" />
      <h3>{course.instructor.name}</h3>
      <p>{course.description}</p>
      <ul>
        {course.syllabus.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button>Enroll Now</button>
    </div>
  );
}

export default CourseOverview;
