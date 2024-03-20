import React, { useState, useEffect } from 'react';
import './FeaturedCourses.css'; // Ensure this path is correct for your CSS

// Assuming Bootstrap is correctly included in your project
function FeaturedCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/courses');
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data);
                } else {
                    console.error('Failed to fetch courses');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="d-flex">
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: "250px"}}>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="#" className="nav-link active d-flex align-items-center">
                            {/* <img src={accountIcon} alt="Account" width="24" height="24" className="me-2" /> */}
                            Account Info
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link d-flex align-items-center">
                            {/* <img src={gradesIcon} alt="Grades" width="24" height="24" className="me-2" /> */}
                            Grades
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link d-flex align-items-center">
                            {/* <img src={assignmentsIcon} alt="Assignments" width="24" height="24" className="me-2" /> */}
                            Assignments
                        </a>
                    </li>
                </ul>
            </div>
            <div className="main-content flex-grow-1 p-3">
                <h2>Featured Courses</h2>
                <div className="courses-container d-flex flex-wrap">
                    {courses.map(course => (
                        <div key={course._id} className="course-card m-2 p-3 border">
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <a href={course.url} target="_blank" rel="noopener noreferrer">Learn More</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeaturedCourses;
