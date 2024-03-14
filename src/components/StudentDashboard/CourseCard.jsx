// A component displaying a brief overview of a course, used in course catalogs or dashboards.
import React from 'react';

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} />
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <button>Enroll</button>
    </div>
  );
}

export default CourseCard;
