// StudentViewGrades.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentViewGrades() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch submissions for the logged-in student
    const fetchSubmissions = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/student-submissions'); // Ensure you have this endpoint
        setSubmissions(data.submissions);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div>
      <h2>Your Grades</h2>
      <ul>
        {submissions.map((submission) => (
          <li key={submission._id}>
            {submission.quizTitle} - Grade: {submission.grade !== null ? submission.grade : 'Not graded yet'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentViewGrades;
