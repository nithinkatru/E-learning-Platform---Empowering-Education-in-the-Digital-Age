  import React, { useState } from 'react';
  import CourseForm from "./CourseForm";
  import "./CoursesPage.css";

  function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState({ id: null, title: "", description: "", url: "" });
    const [editing, setEditing] = useState(false);

    const handleChange = (event) => {
      const { name, value } = event.target;
      setCourse(prevCourse => ({
        ...prevCourse,
        [name]: value,
      }));
    };

    const handleSave = (event) => {
      event.preventDefault();
      fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: course.title,
          description: course.description,
          url: course.url,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Course added:', data);
        setCourses([...courses, data]); // Assuming the backend returns the newly added course
        setCourse({ id: null, title: "", description: "", url: "" }); // Reset form to be ready for the next input
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };

    const handleEdit = (course) => {
      setCourse(course);
      setEditing(true);
    };

    const handleDelete = (courseId) => {
      // Here you would also add logic to delete the course from the backend
      const updatedCourses = courses.filter(course => course.id !== courseId);
      setCourses(updatedCourses);
    };

    return (
      <div>
        <h2>Courses</h2>
        <CourseForm course={course} onSave={handleSave} onChange={handleChange} saving={false} />
        {courses.map((course, index) => (
          <div key={index}>
            <span>{course.title}</span>
            <button onClick={() => handleEdit(course)}>Edit</button>
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }

  export default CoursesPage;
